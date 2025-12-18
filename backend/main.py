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
    db: Session = Depends(get_db)
):
    # Use TBO API for search
    if location and check_in and check_out:
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
