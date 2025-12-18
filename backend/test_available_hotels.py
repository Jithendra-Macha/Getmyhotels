import requests
import json
from requests.auth import HTTPBasicAuth

# TBO Credentials
BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

def get_public_ip():
    try:
        response = requests.get('https://api.ipify.org?format=json', timeout=5)
        return response.json().get('ip', '127.0.0.1')
    except:
        return '127.0.0.1'

print("=" * 70)
print("TBO Hotel API - Testing AvailableHotels Request Type")
print("=" * 70)

# New format with RequestType
payload = {
    "RequestType": "AvailableHotels",
    "SessionId": "50c8976b-3d60-4e35-9003-f112674e25a2",
    "CheckInDate": "20/12/2025",
    "CheckOutDate": "22/12/2025",
    "CountryCode": "US",
    "CityId": "115936",  # Dubai
    "GuestNationality": "US",
    "StarRating": "All",
    "NoOfRooms": 1,
    "RoomGuests": [
        {
            "NoOfAdults": 2,
            "NoOfChild": 0,
            "ChildAges": []
        }
    ]
}

# Test with different endpoints
endpoints = [
    "/HotelSearch",
    "/Search",
    "/AvailableHotels",
    ""  # Base URL
]

for endpoint in endpoints:
    url = f"{BASE_URL}{endpoint}"
    print(f"\nTesting: {url}")
    print("-" * 70)
    
    try:
        response = requests.post(
            url,
            auth=HTTPBasicAuth(USERNAME, PASSWORD),
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=60
        )
        
        print(f"HTTP Status: {response.status_code}")
        
        try:
            data = response.json()
            status = data.get("Status", {})
            print(f"API Status: {status.get('Code')} - {status.get('Description')}")
            
            if status.get('Code') == 200:
                print("\n[SUCCESS] This endpoint works!")
                print(json.dumps(data, indent=2)[:1000])
                break
            else:
                print(f"Response: {json.dumps(data, indent=2)[:300]}")
        except:
            print(f"Response: {response.text[:200]}")
            
    except Exception as e:
        print(f"Error: {e}")

print("\n" + "=" * 70)
