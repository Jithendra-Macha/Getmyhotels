from database import SessionLocal
import models

db = SessionLocal()
hotels = db.query(models.Hotel).all()
print(f"Found {len(hotels)} hotels.")
for hotel in hotels:
    print(f"- {hotel.name}")
db.close()
