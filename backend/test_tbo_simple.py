import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

print("Testing TBO Destination Search...")
url = f"{BASE_URL}/DestinationSearchStaticData"

try:
    response = requests.post(url, auth=HTTPBasicAuth(USERNAME, PASSWORD), json={}, timeout=30)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Response Status: {data.get('Status')}")
        
        destinations = data.get("DestinationSearchStaticDataResult", [])
        print(f"Total destinations: {len(destinations)}")
        
        # Find Dubai
        for dest in destinations[:10]:  # Print first 10
            print(f"  - {dest.get('Name')} (ID: {dest.get('Id')}, Country: {dest.get('CountryCode')})")
            
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
