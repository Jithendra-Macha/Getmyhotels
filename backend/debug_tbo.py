
import tbo_client
import sys

# Force stdout flush
sys.stdout.reconfigure(line_buffering=True)

print("--- Starting Debug Script ---")
try:
    result = tbo_client.search_hotels(
        location="Dubai",
        check_in="2025-12-12",
        check_out="2025-12-13",
        guests=1
    )
    print(f"--- Search Result Type: {type(result)} ---")
    if result:
        print(f"Status Code: {result.get('Status', {}).get('Code')}")
        print(f"Message: {result.get('Status', {}).get('Description')}")
        print(f"Hotel Count: {len(result.get('HotelResult', []))}")
        
        # Test Mapping
        try:
            import schemas
            hotel_results = result.get("HotelResult", [])
            print(f"--- Testing Mapping for {len(hotel_results)} hotels ---")
            mapped_count = 0
            for hotel in hotel_results:
                # print(f"Raw Hotel Data: {hotel}") # Uncomment if needed
                price = 0
                if "Price" in hotel:
                        price = float(hotel["Price"].get("PublishedPrice", 0))
                
                # Main.py logic
                h = schemas.Hotel(
                    id=hotel.get("HotelCode", 0),
                    name=hotel.get("HotelName", "Unknown Hotel"),
                    location=hotel.get("Address", "") or hotel.get("HotelAddress", ""),
                    description=hotel.get("Description", "") or hotel.get("HotelDescription", "No description available"),
                    rating=float(hotel.get("StarRating", 0)),
                    image_url=hotel.get("HotelPicture", "") or hotel.get("HotelCoverImage", "https://via.placeholder.com/400x300"),
                    price_per_night=price
                )
                mapped_count += 1
            print(f"--- Successfully mapped {mapped_count} hotels ---")
        except Exception as e:
            print(f"!!! MAPPING ERROR: {e} !!!")
            import traceback
            traceback.print_exc()
    else:
        print("Result is None")
except Exception as e:
    print(f"Exception happened: {e}")
print("--- End Debug Script ---")
