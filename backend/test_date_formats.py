import requests
import json
from requests.auth import HTTPBasicAuth
from datetime import datetime, timedelta

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
print("TBO Hotel API - Testing Different Date Formats")
print("=" * 70)

end_user_ip = get_public_ip()

# Try different date formats
date_formats = [
    ("DD/MM/YYYY", "15/12/2025", "17/12/2025"),
    ("YYYY-MM-DD", "2025-12-15", "2025-12-17"),
    ("MM/DD/YYYY", "12/15/2025", "12/17/2025"),
    ("DD-MM-YYYY", "15-12-2025", "17-12-2025"),
]

for format_name, check_in, check_out in date_formats:
    print(f"\nTesting format: {format_name}")
    print(f"Check-in: {check_in}, Check-out: {check_out}")
    print("-" * 70)
    
    search_payload = {
        "UserName": USERNAME,
        "Password": PASSWORD,
        "EndUserIp": end_user_ip,
        "HotelCodes": "1247101,1120548,1005512",
        "CheckInDate": check_in,
        "CheckOutDate": check_out,
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
    
    try:
        response = requests.post(
            f"{BASE_URL}/Search",
            auth=HTTPBasicAuth(USERNAME, PASSWORD),
            json=search_payload,
            headers={'Content-Type': 'application/json'},
            timeout=60
        )
        
        data = response.json()
        status = data.get("Status", {})
        
        print(f"Status Code: {status.get('Code')} - {status.get('Description')}")
        
        if status.get('Code') == 200:
            print("[SUCCESS] This format works!")
            hotel_results = data.get("HotelResult", [])
            print(f"Found {len(hotel_results)} hotels")
            
            if hotel_results:
                for hotel in hotel_results[:2]:
                    print(f"  - {hotel.get('HotelName', 'N/A')}")
            
            print("\n--- FULL RESPONSE ---")
            print(json.dumps(data, indent=2))
            break
        else:
            print(f"[FAILED] {status.get('Description')}")
            
    except Exception as e:
        print(f"[ERROR] {e}")

print("\n" + "=" * 70)
