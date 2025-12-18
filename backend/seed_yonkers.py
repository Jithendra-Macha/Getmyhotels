
from database import SessionLocal, engine
import models

# Add tables if not exist (should be handled by main, but safe to repeat)
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

yonkers_hotels = [
    models.Hotel(
        name="Royal Regency Hotel",
        location="Yonkers, NY",
        description="A premium hotel in the heart of Yonkers.",
        rating=4.0,
        image_url="https://via.placeholder.com/400x300?text=Royal+Regency",
        price_per_night=150.0
    ),
    models.Hotel(
        name="Hampton Inn & Suites Yonkers",
        location="Yonkers, NY",
        description="Comfortable stay with free breakfast.",
        rating=4.5,
        image_url="https://via.placeholder.com/400x300?text=Hampton+Inn",
        price_per_night=180.0
    ),
    models.Hotel(
        name="Courtyard by Marriott Yonkers",
        location="Yonkers, NY",
        description="Modern amenities and great service.",
        rating=4.2,
        image_url="https://via.placeholder.com/400x300?text=Courtyard",
        price_per_night=165.0
    )
]

print("Seeding Yonkers hotels...")
for h in yonkers_hotels:
    # Check if exists
    exists = db.query(models.Hotel).filter(models.Hotel.name == h.name).first()
    if not exists:
        db.add(h)
        print(f"Added {h.name}")
    else:
        print(f"Skipped {h.name} (exists)")

db.commit()
db.close()
print("Done.")
