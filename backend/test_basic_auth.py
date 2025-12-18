import requests
import json
from requests.auth import HTTPBasicAuth

# TBO Credentials
BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

print("=" * 60)
print("TBO Hotel API - Authentication Test (Basic Auth)")
print("=" * 60)

# Test with CountryList endpoint using Basic Auth (GET)
url = f"{BASE_URL}/CountryList"
print(f"\nEndpoint: {url}")
print(f"Method: GET with Basic Authentication")
print(f"Username: {USERNAME}")
print("-" * 60)

try:
    response = requests.get(
        url,
        auth=HTTPBasicAuth(USERNAME, PASSWORD),
        timeout=30
    )
    
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        print("[SUCCESS] Authentication SUCCESSFUL!")
        data = response.json()
        print("\n--- API RESPONSE ---")
        print(json.dumps(data, indent=2)[:800])  # First 800 chars
        
        if "CountryList" in data:
            print(f"\n[SUCCESS] Total Countries: {len(data['CountryList'])}")
            
    else:
        print("[FAILED] Authentication FAILED!")
        print(f"Response: {response.text[:500]}")
        
except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
