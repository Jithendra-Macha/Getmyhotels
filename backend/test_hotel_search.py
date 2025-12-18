import requests
import json
from requests.auth import HTTPBasicAuth

# TBO Credentials
BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

print("=" * 60)
print("TBO Hotel API - Testing /HotelSearch Endpoint")
print("=" * 60)

# Hotel Search Payload
search_payload = {
    "CheckInDate": "15/12/2025",
    "CheckOutDate": "17/12/2025",
    "CityId": "115936",  # Dubai
    "GuestNationality": "AE",
    "NoOfRooms": 1,
    "RoomGuests": [
        {
            "NoOfAdults": 2,
            "NoOfChild": 0,
            "ChildAge": None
        }
    ],
    "ResultCount": 5,
    "IsNearBySearchAllowed": False
}

url = f"{BASE_URL}/HotelSearch"
print(f"URL: {url}")
print(f"Username: {USERNAME}")
print(f"\nSearch Payload:")
print(json.dumps(search_payload, indent=2))
print("-" * 60)

try:
    response = requests.post(
        url,
        auth=HTTPBasicAuth(USERNAME, PASSWORD),
        json=search_payload,
        headers={'Content-Type': 'application/json'},
        timeout=60
    )
    
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        
        # Check status
        status = data.get("Status", {})
        print(f"API Status Code: {status.get('Code')}")
        print(f"API Status Description: {status.get('Description')}")
        
        if status.get('Code') == 200:
            print("\n[SUCCESS] Hotel search successful!")
            
            # Show hotel results
            hotel_results = data.get("HotelResult", [])
            print(f"\n[SUCCESS] Found {len(hotel_results)} hotels")
            
            if hotel_results:
                print("\n--- SAMPLE HOTELS ---")
                for i, hotel in enumerate(hotel_results[:3], 1):
                    print(f"\n{i}. {hotel.get('HotelName', 'N/A')}")
                    print(f"   Code: {hotel.get('HotelCode', 'N/A')}")
                    print(f"   Rating: {hotel.get('StarRating', 'N/A')} stars")
                    print(f"   Address: {hotel.get('HotelAddress', 'N/A')[:60]}...")
                    
                    price = hotel.get('Price', {})
                    print(f"   Price: {price.get('CurrencyCode', 'AED')} {price.get('PublishedPrice', 'N/A')}")
            
            # Show full response (truncated)
            print("\n--- FULL API RESPONSE (first 2000 chars) ---")
            print(json.dumps(data, indent=2)[:2000])
        else:
            print(f"\n[ERROR] API returned error: {status.get('Description')}")
            print("\nFull response:")
            print(json.dumps(data, indent=2))
    else:
        print(f"[ERROR] HTTP Error: {response.text[:500]}")
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
