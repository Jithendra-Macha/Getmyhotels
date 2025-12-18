
from database import SessionLocal
from models import Hotel

db = SessionLocal()
location = "Yonkers, NY"

print(f"Searching for location: '{location}'")
hotels = db.query(Hotel).filter(Hotel.location.ilike(f"%{location}%")).all()
print(f"Found {len(hotels)} hotels with ilike.")

# Try standard like
hotels_like = db.query(Hotel).filter(Hotel.location.like(f"%{location}%")).all()
print(f"Found {len(hotels_like)} hotels with like.")

# List all locations
all_hotels = db.query(Hotel).all()
print("All Hotel Locations:")
for h in all_hotels:
    print(f" - '{h.location}'")

db.close()
