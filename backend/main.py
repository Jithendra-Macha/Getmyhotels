from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
import models, schemas, auth
from database import engine, get_db
from openai import OpenAI
import os
from http import HTTPStatus
from dotenv import load_dotenv

load_dotenv()


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/signup", response_model=schemas.Token)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user and not user.is_guest:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if phone number exists
    if user.phone_number:
        db_phone = db.query(models.User).filter(models.User.phone_number == user.phone_number).first()
        if db_phone and not user.is_guest:
            raise HTTPException(status_code=400, detail="Phone number already registered")
    
    hashed_password = auth.get_password_hash(user.password) if user.password else None
    
    new_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        provider=user.provider,
        is_guest=user.is_guest
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": new_user.email if new_user.email else f"guest_{new_user.id}"},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Allow login by Email OR Phone Number
    user = db.query(models.User).filter(
        (models.User.email == form_data.username) | 
        (models.User.phone_number == form_data.username)
    ).first()
    
    if not user or not user.hashed_password or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/guest-login", response_model=schemas.Token)
def guest_login(db: Session = Depends(get_db)):
    # Create a temporary guest user
    new_user = models.User(
        is_guest=True,
        provider="guest"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": f"guest_{new_user.id}"},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/hotels", response_model=list[schemas.Hotel])
def search_hotels_endpoint(
    location: str = None,
    check_in: str = None,
    check_out: str = None,
    guests: int = 1,
    lat: float = None,
    lng: float = None,
    db: Session = Depends(get_db)
):
    # 1. Try Xeni Search (if Lat/Lng provided or resolved)
    if lat and lng and check_in and check_out:
        try:
            from xeni_client import xeni_client
            # Ensure dates are YYYY-MM-DD
            # (Assuming frontend sends ISO or similar, client handles conversion if needed)
            
            print(f"DEBUG: Searching Xeni for {lat}, {lng}", flush=True)
            xeni_result = xeni_client.search_hotels(lat, lng, check_in.split('T')[0], check_out.split('T')[0], guests)
            
            if xeni_result and xeni_result.get('data'):
                hotels = []
                # Xeni structure: data -> properties -> [...]
                # Need to inspect actual response structure, typically 'data' contains the list or 'data.properties'
                properties = xeni_result.get('data', {}).get('properties', []) or xeni_result.get('data', [])
                
                for prop in properties[:30]:
                    hotels.append(schemas.Hotel(
                        id=prop.get('id', 0), # Using Xeni ID
                        name=prop.get('name', 'Unknown Hotel'),
                        location=prop.get('address', {}).get('address_line_1', 'Unknown Address'),
                        description=prop.get('overview', {}).get('description', 'No description'),
                        rating=float(prop.get('rating', 0)),
                        # Handling images - Xeni usually returns list of images
                        image_url=prop.get('images', [{}])[0].get('url', "https://via.placeholder.com/400x300"),
                        price_per_night=float(prop.get('min_rate', {}).get('price', prop.get('rate', {}).get('price', 0)))
                    ))
                
                if hotels:
                     return hotels
                     
        except Exception as e:
            print(f"Xeni Search Error: {e}", flush=True)
            # Fall through to TBO/Local
            pass

    # 2. Use TBO API for search (Legacy/Backup)
    if location and check_in and check_out and not (lat and lng):
        try:
            import tbo_client
            # tbo_client.search_hotels now handles YYYY-MM-DD or DD/MM/YYYY
            tbo_result = tbo_client.search_hotels(location, check_in, check_out, guests)
            
            if tbo_result and tbo_result.get("Status", {}).get("Code") == 200:
                # Map TBO response to our schema
                hotels = []
                hotel_results = tbo_result.get("HotelResult", [])
                
                for hotel in hotel_results[:20]:  # Limit results
                    # Extract price - structure often: Price: { PublishedPrice: 123 }
                    price = 0
                    if "Price" in hotel:
                         price = float(hotel["Price"].get("PublishedPrice", 0))
                    
                    hotels.append(schemas.Hotel(
                        id=hotel.get("HotelCode", 0),
                        name=hotel.get("HotelName", "Unknown Hotel"),
                        location=hotel.get("Address", "") or hotel.get("HotelAddress", ""),
                        description=hotel.get("Description", "") or hotel.get("HotelDescription", "No description available"),
                        rating=float(hotel.get("StarRating", 0)),
                        image_url=hotel.get("HotelPicture", "") or hotel.get("HotelCoverImage", "https://via.placeholder.com/400x300"),
                        price_per_night=price
                    ))
                
                if hotels:
                    return hotels
                    
                # If TBO returns 0 hotels, fall back to local DB
                print("DEBUG: TBO returned 0 hotels, falling back to local DB", flush=True)

        except Exception as e:
            print(f"TBO Search Error: {e}")
            # Fall back to local database
            pass
    
    # Fallback: Use local database
    print(f"DEBUG: Falling back to local DB using location: '{location}'", flush=True)
    query = db.query(models.Hotel)
    if location:
        query = query.filter(models.Hotel.location.ilike(f"%{location}%"))
    
    results = query.all()
    print(f"DEBUG: Found {len(results)} local hotels.", flush=True)
    return results

@app.get("/hotels/{hotel_id}", response_model=schemas.HotelDetail)
def get_hotel_details(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel

@app.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # Verify room availability (simplified)
    room = db.query(models.Room).filter(models.Room.id == booking.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Calculate total price (simplified: price * 1 night)
    # In a real app, calculate based on dates
    total_price = room.price 

    db_booking = models.Booking(
        **booking.dict(),
        total_price=total_price
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@app.get("/destinations")
def get_destinations():
    return [
        { "name": "Orlando", "properties": "5k+ stays", "image": "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { "name": "Las Vegas", "properties": "1.7k+ stays", "image": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { "name": "New York", "properties": "3k+ stays", "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { "name": "Atlanta", "properties": "2k+ stays", "image": "https://images.unsplash.com/photo-1594902194883-9b9aa5ee5d92?auto=format&fit=crop&w=600&q=80" },
        { "name": "Myrtle Beach", "properties": "6k+ stays", "image": "https://images.unsplash.com/photo-1579782540608-aa866f81df68?auto=format&fit=crop&w=600&q=80" },
        { "name": "Los Angeles", "properties": "4k+ stays", "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
        { "name": "Chicago", "properties": "2.5k+ stays", "image": "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { "name": "San Francisco", "properties": "1.8k+ stays", "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
    ]

@app.get("/my-bookings", response_model=list[schemas.Booking])
def get_my_bookings(current_user: schemas.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    bookings = db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()
    
    # Populate helper fields for frontend display
    result = []
    for b in bookings:
        # Pydantic model will ignore extra fields unless configured, but we added them to the schema
        # We need to manually fetch hotel details via relation
        if b.room and b.room.hotel:
            b.hotel_name = b.room.hotel.name
            b.hotel_location = b.room.hotel.location
            b.hotel_image = b.room.hotel.image_url
        result.append(b)
        
    return result

@app.put("/bookings/{booking_id}/cancel", response_model=schemas.Booking)
def cancel_booking(booking_id: int, current_user: schemas.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this booking")
        
    booking.status = "cancelled"
    db.commit()
    db.refresh(booking)
    
    # Populate helpers
    if booking.room and booking.room.hotel:
        booking.hotel_name = booking.room.hotel.name
        booking.hotel_location = booking.room.hotel.location
        booking.hotel_image = booking.room.hotel.image_url
        
    return booking

@app.post("/ai-plan")
async def generate_ai_plan(request: schemas.AIPlanRequest):
    api_key = os.getenv("DASHSCOPE_API_KEY")
    # For testing without key, return mock
    if not api_key:
        print("WARNING: DASHSCOPE_API_KEY not set", flush=True)
        return {
            "plan": f"**Simulated AI Plan for: {request.prompt}**\n\nSince no API Key was found, here is a demo plan:\n\n1. **Day 1**: Arrive and check into a luxury hotel. Explore the local markets.\n2. **Day 2**: Visit usage specific landmarks based on '{request.prompt}'.\n3. **Day 3**: Relax at the spa and enjoy a sunset dinner.\n\n*(To enable real Qwen LM Max, please set DASHSCOPE_API_KEY in backend/.env)*"
        }
    
    try:
        # Use OpenAI Compatible Client for DashScope International
        client = OpenAI(
            api_key=api_key,
            base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
        )
        
        # Call Qwen-Max (or qwen-plus per verification succcess)
        response = client.chat.completions.create(
            model='qwen-plus', # Using qwen-plus as verified by user snippet
            messages=[{'role': 'user', 'content': request.prompt}]
        )
        
        return {"plan": response.choices[0].message.content}


    except Exception as e:
        print(f"AI Plan Error: {e}", flush=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recent-searches", response_model=schemas.SearchHistory)
def create_recent_search(search: schemas.SearchHistoryCreate, current_user: schemas.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    from datetime import datetime
    
    # Check if duplicates exist recently? For now, just append.
    db_search = models.SearchHistory(
        **search.dict(),
        user_id=current_user.id,
        created_at=datetime.utcnow().isoformat()
    )
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

@app.get("/recent-searches", response_model=list[schemas.SearchHistory])
def get_recent_searches(current_user: schemas.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    # Get last 5 searches, ordered by newest first
    # Note: DB might not guarantee order without explicit order_by if ID isn't sequential, but ID usually is.
    # Ideally should order by created_at desc.
    searches = db.query(models.SearchHistory).filter(
        models.SearchHistory.user_id == current_user.id
    ).order_by(models.SearchHistory.id.desc()).limit(5).all()
    return searches
