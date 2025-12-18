import requests
import json
from requests.auth import HTTPBasicAuth
from datetime import datetime, timedelta

# Calculate dates (7 days from now for 2 nights)
today = datetime.now()
check_in = (today + timedelta(days=7)).strftime("%Y-%m-%d")
check_out = (today + timedelta(days=9)).strftime("%Y-%m-%d")

# Simplified payload - single hotel
payload = {
    "UserName": "Gmhtest",
    "Password": "Gmh@68037072",
    "EndUserIp": "96.56.97.4",
    "TokenId": "",
    "HotelCodes": "1247101",  # Just one hotel
    "CheckIn": check_in,
    "CheckOut": check_out,
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
print("TBO Hotel API - Simplified Test (Single Hotel, Near Dates)")
print("=" * 70)
print(f"Check-in: {check_in}")
print(f"Check-out: {check_out}")
print(f"Hotel Code: 1247101")
print("-" * 70)

try:
    response = requests.post(
        url,
        auth=HTTPBasicAuth("Gmhtest", "Gmh@68037072"),
        json=payload,
        headers={'Content-Type': 'application/json'},
        timeout=60
    )
    
    print(f"\nHTTP Status: {response.status_code}")
    
    data = response.json()
    print(f"\n--- API RESPONSE ---")
    print(json.dumps(data, indent=2))
    
    status = data.get("Status", {})
    if status.get('Code') == 200:
        print("\n[SUCCESS] Request successful!")
    else:
        print(f"\n[INFO] Status: {status.get('Code')} - {status.get('Description')}")
        
except Exception as e:
    print(f"\n[ERROR] {e}")

print("\n" + "=" * 70)
