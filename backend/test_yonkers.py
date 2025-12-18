
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime, timedelta

BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

def get_auth():
    return HTTPBasicAuth(USERNAME, PASSWORD)

def test_yonkers():
    print("Testing TBO Search for 'Yonkers, NY'...")
    
    # 1. CityList Search
    print("\n1. Searching CityList for 'Yonkers'...")
    url = f"{BASE_URL}/CityList"
    try:
        response = requests.post(url, auth=get_auth(), json={"CountryCode": "US"}, timeout=30)
        if response.status_code == 200:
            data = response.json()
            cities = data.get("CityList", [])
            print(f"   Found {len(cities)} cities in US.")
            
            # Search for Yonkers
            found_city = None
            for city in cities:
                if "yonkers" in city.get("Name", "").lower():
                    print(f"   MATCH: {city.get('Name')} (Code: {city.get('Code')})")
                    found_city = city
                    break # Take first match
            
            if found_city:
                city_code = found_city.get('Code')
                print(f"   Using CityCode: {city_code}")
                
                # 2. HotelCodeList
                print("\n2. Getting Hotel Codes...")
                url_code = f"{BASE_URL}/TBOHotelCodeList"
                resp_code = requests.post(url_code, auth=get_auth(), json={"CityCode": city_code, "IsDetailedResponse": "false"}, timeout=30)
                
                if resp_code.status_code == 200:
                    data_code = resp_code.json()
                    hotels = data_code.get("Hotels", [])
                    print(f"   Found {len(hotels)} hotels in Yonkers.")
                    
                    if hotels:
                        hotel_codes = ",".join([str(h.get("HotelCode")) for h in hotels[:10]])
                        print(f"   Using HotelCodes: {hotel_codes}")
                        
                        # 3. Search
                        print("\n3. Searching Availability (2025-12-12)...")
                        url_search = f"{BASE_URL}/search"
                        payload = {
                            "CheckIn": "2025-12-12",
                            "CheckOut": "2025-12-13",
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
                        print(f"   Search HTTP Status: {resp_search.status_code}")
                        if resp_search.status_code == 200:
                            res = resp_search.json()
                            print(f"   TBO Status Code: {res.get('Status', {}).get('Code')}")
                            print(f"   TBO Message: {res.get('Status', {}).get('Description')}")
                            print(f"   Results Count: {len(res.get('HotelResult', []))}")
                        else:
                            print(f"   Search Failed: {resp_search.text}")
                    else:
                        print("   No hotels found in HotelCodeList.")
                else:
                    print(f"   HotelCodeList Failed: {resp_code.text}")
            else:
                print("   'Yonkers' NOT FOUND in CityList.")
        else:
            print(f"   CityList HTTP Failed: {response.status_code}")

    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_yonkers()
