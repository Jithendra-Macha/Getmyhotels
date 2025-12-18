import requests
import json
from requests.auth import HTTPBasicAuth

# TBO Credentials
URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI/Search"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

print("=" * 60)
print("TBO Hotel API - Testing /Search Endpoint")
print("=" * 60)
print(f"URL: {URL}")
print(f"Username: {USERNAME}")
print(f"Method: POST with Basic Authentication")
print("-" * 60)

# Test 1: Empty POST request
print("\nTest 1: POST with empty JSON body")
try:
    response = requests.post(
        URL,
        auth=HTTPBasicAuth(USERNAME, PASSWORD),
        json={},
        headers={'Content-Type': 'application/json'},
        timeout=30
    )
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        print("[SUCCESS] Request successful!")
        data = response.json()
        print("\n--- API RESPONSE ---")
        print(json.dumps(data, indent=2)[:1000])
    else:
        print(f"[INFO] Response: {response.text[:500]}")
        
except Exception as e:
    print(f"[ERROR] {e}")

# Test 2: POST with search parameters
print("\n" + "=" * 60)
print("Test 2: POST with hotel search parameters")
print("-" * 60)

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

print(f"Payload: {json.dumps(search_payload, indent=2)}")

try:
    response = requests.post(
        URL,
        auth=HTTPBasicAuth(USERNAME, PASSWORD),
        json=search_payload,
        headers={'Content-Type': 'application/json'},
        timeout=60
    )
    
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        print("[SUCCESS] Search successful!")
        data = response.json()
        print("\n--- API RESPONSE ---")
        print(json.dumps(data, indent=2)[:1500])
        
        # Check for hotel results
        if "HotelResult" in data:
            print(f"\n[SUCCESS] Found {len(data['HotelResult'])} hotels")
        elif "Status" in data:
            print(f"\n[INFO] Status: {data['Status']}")
    else:
        print(f"[INFO] Response: {response.text[:500]}")
        
except Exception as e:
    print(f"[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
