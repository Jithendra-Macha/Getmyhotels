import requests
import json
from requests.auth import HTTPBasicAuth

# Exact payload from user
payload = {
    "UserName": "Gmhtest",
    "Password": "Gmh@68037072",
    "EndUserIp": "96.56.97.4",
    "TokenId": "",
    "HotelCodes": "1247101,1120548,1005512",
    "CheckIn": "2025-12-21",
    "CheckOut": "2025-12-22",
    "GuestNationality": "US",
    "NoOfRooms": 1,
    "RoomGuests": [
        {
            "NoOfAdults": 2,
            "NoOfChild": 0,
            "ChildAge": []
        }
    ]
}

url = "http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch"

print("=" * 70)
print("TBO Hotel API - Testing with User's Exact Payload")
print("=" * 70)
print(f"URL: {url}")
print(f"\nPayload:")
print(json.dumps(payload, indent=2))
print("-" * 70)

try:
    response = requests.post(
        url,
        auth=HTTPBasicAuth("Gmhtest", "Gmh@68037072"),
        json=payload,
        headers={'Content-Type': 'application/json'},
        timeout=60
    )
    
    print(f"\nHTTP Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    try:
        data = response.json()
        print(f"\n--- API RESPONSE ---")
        print(json.dumps(data, indent=2))
        
        status = data.get("Status", {})
        if status.get('Code') == 200:
            print("\n[SUCCESS] Hotel search successful!")
            hotel_results = data.get("HotelResult", [])
            print(f"Found {len(hotel_results)} hotels")
        else:
            print(f"\n[ERROR] API Status: {status.get('Code')} - {status.get('Description')}")
    except json.JSONDecodeError:
        print(f"\n[ERROR] Could not parse JSON response")
        print(f"Raw response: {response.text}")
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
