
import tbo_client
import sys

# Force stdout flush
sys.stdout.reconfigure(line_buffering=True)

def test_search(location):
    print(f"\n--- Testing Search for: '{location}' ---")
    try:
        # 1. Test CityList Search
        city_code = tbo_client.get_city_code(location)
        print(f"City Code Result: {city_code}")
        
        if city_code:
            # 2. Test Search (Lightweight)
            print("Running hotel search (IsDetailedResponse=False)...")
            # Just check if no error raises
            # (We won't actually call search_hotels fully to save time/quota, just verifying mapping)
            # Actually, let's call get_hotel_codes to see if we get inventory
            hotel_codes = tbo_client.get_hotel_codes(city_code)
            print(f"Hotel Codes Found: {len(hotel_codes.split(',')) if hotel_codes else 0}")
        else:
            print("No City Code found.")
            
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Test cases for counties/regions
    test_search("Westchester County, NY")
    test_search("Miami-Dade County, FL")
    test_search("Orange County, CA")
