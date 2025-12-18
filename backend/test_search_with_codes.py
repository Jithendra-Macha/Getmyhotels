import requests
import json
from requests.auth import HTTPBasicAuth

# TBO Credentials
BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

def get_public_ip():
    """Get public IP address"""
    try:
        response = requests.get('https://api.ipify.org?format=json', timeout=5)
        return response.json().get('ip', '127.0.0.1')
    except:
        return '127.0.0.1'

print("=" * 70)
print("TBO Hotel API - Testing /Search with Hotel Codes")
print("=" * 70)

end_user_ip = get_public_ip()
print(f"End User IP: {end_user_ip}")

# Search payload with specific hotel codes
search_payload = {
    "UserName": USERNAME,
    "Password": PASSWORD,
    "EndUserIp": end_user_ip,
    "HotelCodes": "1247101,1120548,1005512",
    "CheckInDate": "15/12/2025",
    "CheckOutDate": "17/12/2025",
    "GuestNationality": "AE",
    "NoOfRooms": 1,
    "RoomGuests": [
        {
            "NoOfAdults": 2,
            "NoOfChild": 0,
            "ChildAge": []
        }
    ]
}

url = f"{BASE_URL}/Search"
print(f"URL: {url}")
print(f"\nPayload:")
print(json.dumps(search_payload, indent=2))
print("-" * 70)

try:
    response = requests.post(
        url,
        auth=HTTPBasicAuth(USERNAME, PASSWORD),
        json=search_payload,
        headers={'Content-Type': 'application/json'},
        timeout=60
    )
    
    print(f"\nHTTP Status Code: {response.status_code}")
    
    data = response.json()
    status = data.get("Status", {})
    
    print(f"API Status Code: {status.get('Code')}")
    print(f"API Status Description: {status.get('Description')}")
    
    if status.get('Code') == 200:
        print("\n[SUCCESS] Hotel search successful!")
        
        hotel_results = data.get("HotelResult", [])
        print(f"[SUCCESS] Found {len(hotel_results)} hotels")
        
        if hotel_results:
            print("\n--- HOTEL DETAILS ---")
            for i, hotel in enumerate(hotel_results, 1):
                print(f"\n{i}. {hotel.get('HotelName', 'N/A')}")
                print(f"   Code: {hotel.get('HotelCode', 'N/A')}")
                print(f"   Rating: {hotel.get('StarRating', 'N/A')} stars")
                print(f"   Address: {hotel.get('HotelAddress', 'N/A')}")
                price = hotel.get('Price', {})
                print(f"   Price: {price.get('PublishedPrice', 'N/A')} {price.get('CurrencyCode', 'AED')}")
                
                # Show room options
                rooms = hotel.get('RoomOptions', [])
                if rooms:
                    print(f"   Rooms available: {len(rooms)}")
    else:
        print(f"\n[ERROR] {status.get('Description')}")
    
    print("\n--- FULL RESPONSE ---")
    print(json.dumps(data, indent=2))
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
