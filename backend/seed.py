from database import SessionLocal, engine
import models
from passlib.context import CryptContext

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed_data():
    # Check if data exists
    if db.query(models.Hotel).first():
        print("Data already seeded.")
        return

    # Create dummy hotels
    hotels = [
        models.Hotel(
            name="Grand Plaza Hotel",
            location="New York",
            description="Luxury hotel in the heart of Manhattan.",
            rating=4.8,
            image_url="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            price_per_night=250.0
        ),
        models.Hotel(
            name="Ocean View Resort",
            location="Miami",
            description="Beautiful resort with ocean views and private beach.",
            rating=4.5,
            image_url="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            price_per_night=180.0
        ),
        models.Hotel(
            name="Mountain Retreat",
            location="Denver",
            description="Cozy cabin style hotel in the mountains.",
            rating=4.7,
            image_url="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
            price_per_night=150.0
        ),
         models.Hotel(
            name="City Center Inn",
            location="Chicago",
            description="Conveniently located near all major attractions.",
            rating=4.2,
            image_url="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            price_per_night=120.0
        ),
        models.Hotel(
            name="Sunset Boulevard Hotel",
            location="Los Angeles",
            description="Iconic hotel on Sunset Boulevard.",
            rating=4.6,
            image_url="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1049&q=80",
            price_per_night=300.0
        )
    ]

    db.add_all(hotels)
    db.commit()

    # Add rooms to hotels
    for hotel in hotels:
        rooms = [
            models.Room(hotel_id=hotel.id, name="Standard Room", capacity=2, price=hotel.price_per_night),
            models.Room(hotel_id=hotel.id, name="Deluxe Room", capacity=2, price=hotel.price_per_night * 1.5),
            models.Room(hotel_id=hotel.id, name="Family Suite", capacity=4, price=hotel.price_per_night * 2.0),
        ]
        db.add_all(rooms)
    
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
    db.close()
