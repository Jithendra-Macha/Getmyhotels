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
print("TBO Hotel API - Comprehensive /HotelSearch Test")
print("=" * 70)

end_user_ip = get_public_ip()
print(f"End User IP: {end_user_ip}")

# Comprehensive search payload with ALL possible required fields
search_payload = {
    # Authentication (might be required in body too)
    "UserName": USERNAME,
    "Password": PASSWORD,
    "EndUserIp": end_user_ip,
    
    # Search parameters
    "CheckInDate": "15/12/2025",
    "CheckOutDate": "17/12/2025",
    "CityId": "115936",  # Dubai
    "CountryCode": "AE",
    "GuestNationality": "AE",
    "NoOfRooms": 1,
    "RoomGuests": [
        {
            "NoOfAdults": 2,
            "NoOfChild": 0,
            "ChildAge": []
        }
    ],
    "ResultCount": 5,
    "IsNearBySearchAllowed": False,
    "PreferredCurrency": "AED",
    "MaxRating": 5,
    "MinRating": 0,
    "ReviewScore": None,
    "IsRefundable": False,
    "MealType": None
}

url = f"{BASE_URL}/HotelSearch"
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
            print("\n--- SAMPLE HOTELS ---")
            for i, hotel in enumerate(hotel_results[:3], 1):
                print(f"\n{i}. {hotel.get('HotelName', 'N/A')}")
                print(f"   Code: {hotel.get('HotelCode', 'N/A')}")
                print(f"   Rating: {hotel.get('StarRating', 'N/A')} stars")
                price = hotel.get('Price', {})
                print(f"   Price: {price.get('PublishedPrice', 'N/A')} {price.get('CurrencyCode', 'AED')}")
    else:
        print(f"\n[ERROR] {status.get('Description')}")
    
    print("\n--- FULL RESPONSE (first 2000 chars) ---")
    print(json.dumps(data, indent=2)[:2000])
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
