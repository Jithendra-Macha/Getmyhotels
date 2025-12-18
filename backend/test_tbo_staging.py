
import requests
from requests.auth import HTTPBasicAuth
import json
import time

BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

def get_auth():
    return HTTPBasicAuth(USERNAME, PASSWORD)

def test_flow():
    print("1. Testing CityList (Get Country & City Code)...")
    url = f"{BASE_URL}/CityList"
    try:
        # First getting cities in US
        response = requests.post(url, auth=get_auth(), json={"CountryCode": "US"}, timeout=30)
        if response.status_code == 200:
            data = response.json()
            cities = data.get("CityList", [])
            print(f"   Found {len(cities)} cities in US.")
            
            # Find Brooklyn or New York
            target_city = None
            for city in cities:
                if "New York" in city.get("Name", ""):
                    target_city = city
                    break
            
            if target_city:
                print(f"   Target City Found: {target_city.get('Name')} (Code: {target_city.get('Code')})")
                city_code = target_city.get('Code')
                
                # 2. Get Hotel Codes
                print("\n2. Testing TBOHotelCodeList...")
                url_code = f"{BASE_URL}/TBOHotelCodeList"
                resp_code = requests.post(url_code, auth=get_auth(), json={"CityCode": city_code, "IsDetailedResponse": "false"}, timeout=30)
                
                if resp_code.status_code == 200:
                    data_code = resp_code.json()
                    hotels = data_code.get("Hotels", [])
                    print(f"   Found {len(hotels)} hotels in {target_city.get('Name')}.")
                    
                    if hotels:
                        # Take top 5 hotel codes
                        hotel_codes = ",".join([h.get("HotelCode") for h in hotels[:5]])
                        print(f"   Testing Search with Hotel Codes: {hotel_codes}")
                        
                        # 3. Test Search
                        print("\n3. Testing /search endpoint...")
                        url_search = f"{BASE_URL}/search" # Note: Postman calls it /search, NOT /HotelSearch
                        payload = {
                            "CheckIn": "2025-05-20", # Future date
                            "CheckOut": "2025-05-21",
                            "HotelCodes": hotel_codes,
                            "GuestNationality": "US",
                            "PaxRooms": [
                                {
                                    "Adults": 1,
                                    "Children": 0,
                                    "ChildrenAges": []
                                }
                            ],
                            "ResponseTime": 20,
                            "IsDetailedResponse": True
                        }
                        
                        resp_search = requests.post(url_search, auth=get_auth(), json=payload, timeout=60)
                        print(f"   Search Status: {resp_search.status_code}")
                        if resp_search.status_code == 200:
                            search_res = resp_search.json()
                            print(f"   Search Response Status: {search_res.get('Status', {}).get('Code')}")
                            # print(json.dumps(search_res, indent=2))
                            if search_res.get("Status", {}).get("Code") == 200:
                                print(f"   [OK] Search Successful! Found {len(search_res.get('HotelResult', []))} results.")
                            else:
                                print(f"   [FAIL] Search Logic Failed: {search_res.get('Status', {}).get('Description')}")
                        else:
                            print(f"   [FAIL] Search HTTP Failed: {resp_search.text}")
                            
                else:
                    print(f"   [FAIL] TBOHotelCodeList Failed: {resp_code.text}")
            else:
                print("   [FAIL] Could not find New York/Brooklyn in CityList")
        else:
            print(f"   [FAIL] CityList Failed: {response.status_code}")
            
    except Exception as e:
        print(f"   [FAIL] Exception: {e}")

if __name__ == "__main__":
    test_flow()
