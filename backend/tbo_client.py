import requests
import json
from requests.auth import HTTPBasicAuth
from datetime import datetime

BASE_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI"
USERNAME = "Gmhtest"
PASSWORD = "Gmh@68037072"

def get_auth():
    """Return HTTPBasicAuth object for TBO API"""
    return HTTPBasicAuth(USERNAME, PASSWORD)

def get_city_code(location, country_code="US"):
    """
    Get City Code from TBO API
    """
    url = f"{BASE_URL}/CityList"
    
    # Infer CountryCode from location string
    req_country_code = country_code # default "US"
    loc_lower = location.lower()
    if "united arab emirates" in loc_lower or "dubai" in loc_lower:
        req_country_code = "AE"
    elif "united kingdom" in loc_lower or "uk" in loc_lower:
        req_country_code = "GB"
    
    try:
        print(f"DEBUG: Requesting CityList for CountryCode: {req_country_code}")
        response = requests.post(url, auth=get_auth(), json={"CountryCode": req_country_code}, timeout=30)
        if response.status_code == 200:
            data = response.json()
            cities = data.get("CityList", [])
            
            location_lower = location.lower()
            # Search for matching city
            location_lower = location.lower()
            
            # Clean up location string to handle "County" or "Region" (e.g. "Westchester County, NY" -> "Westchester")
            search_terms = [location_lower]
            
            # Extract expected state if present (e.g. "NY" from "..., NY")
            expected_state = None
            if "," in location_lower:
                parts = location_lower.split(",")
                if len(parts) > 1:
                    expected_state = parts[-1].strip().lower()
                    # simplistic check: 2 letter code or full name
            
            if "county" in location_lower:
                clean_loc = location_lower.replace("county", "").replace("  ", " ").strip()
                search_terms.append(clean_loc)
                if "," in clean_loc:
                     search_terms.append(clean_loc.split(",")[0].strip())
                elif "-" in clean_loc:
                     search_terms.append(clean_loc.split("-")[0].strip())
            
            # Also handle hyphenated city-country formats even if "county" isn't present
            if "-" in location_lower and "county" not in location_lower:
                 search_terms.append(location_lower.split("-")[0].strip())

            print(f"DEBUG: Searching CityList for terms: {search_terms}, Expected State: {expected_state}")
            print(f"DEBUG: First 5 cities in list: {[c.get('Name') for c in cities[:5]]}")

            
            for term in search_terms:
                # Priority 1: Exact match of full string WITH Valid State
                for city in cities:
                    city_name_lower = city.get("Name", "").lower()
                    
                    # If we expected a state, force it to match
                    if expected_state and expected_state not in city_name_lower:
                        continue
                        
                    if term == city_name_lower:
                        print(f"DEBUG: Found match (Exact Full + State): {city.get('Name')}")
                        return city.get("Code")

                # Priority 2: Extract city part and try exact match WITH Valid State
                if "," in term:
                    city_only = term.split(",")[0].strip()
                    for city in cities:
                        city_name_lower = city.get("Name", "").lower()
                        if expected_state and expected_state not in city_name_lower:
                            continue

                        api_city_part = city_name_lower.split(",")[0].strip()
                        if city_only == api_city_part:
                            print(f"DEBUG: Found match (Exact City Part + State): {city.get('Name')}")
                            return city.get("Code")

                # Priority 3: Fallback to containment WITH Valid State
                for city in cities:
                    city_name_lower = city.get("Name", "").lower()
                    if expected_state and expected_state not in city_name_lower:
                        continue
                        
                    if term in city_name_lower:
                        print(f"DEBUG: Found match (Partial + State): {city.get('Name')}")
                        return city.get("Code")
            
            # If still not found, try without state strictness (optional, but risky)
            print(f"DEBUG: No match found for {location} with state filter.")
            
            print(f"DEBUG: No match found for {location}")
    except Exception as e:
        print(f"City Search Error: {e}")
    return None

def get_hotel_codes(city_code):
    """
    Get all Hotel Codes for a City Code
    """
    url = f"{BASE_URL}/TBOHotelCodeList"
    try:
        print(f"DEBUG: Getting Hotel Codes for CityCode: {city_code}")
        response = requests.post(url, auth=get_auth(), json={"CityCode": city_code, "IsDetailedResponse": "false"}, timeout=30)
        if response.status_code == 200:
            data = response.json()
            hotels = data.get("Hotels", [])
            print(f"DEBUG: Found {len(hotels)} hotels for CityCode {city_code}")
            # Return comma-separated string of all hotel codes (API limit usually allows many)
            # Taking top 50 to be safe and fast for now
            return ",".join([str(h.get("HotelCode")) for h in hotels[:50]])
    except Exception as e:
        print(f"Hotel Code List Error: {e}")
    return None

def search_hotels(location, check_in, check_out, guests):
    """
    Search hotels using TBO API verified flow
    """
    # 1. Get City Code (Defaulting to US for now, could expand logic)
    city_code = get_city_code(location, "US")
    if not city_code:
        # Fallback to AE for testing if US fails
        city_code = get_city_code(location, "AE")
        
    if not city_code:
        print(f"Could not find city code for: {location}")
        return None
        
    # 2. Get Hotel Codes
    hotel_codes = get_hotel_codes(city_code)
    if not hotel_codes:
        print(f"Could not find hotels for city code: {city_code}")
        return None

    # 3. Search Hotels
    url = f"{BASE_URL}/search"
    
    # Needs YYYY-MM-DD for this endpoint (based on Postman)
    # Incoming check_in might be DD/MM/YYYY from main.py, let's ensure compliance
    try:
        # If input is DD/MM/YYYY, convert to YYYY-MM-DD
        if "/" in check_in:
             dt_in = datetime.strptime(check_in, "%d/%m/%Y")
             check_in_fmt = dt_in.strftime("%Y-%m-%d")
             dt_out = datetime.strptime(check_out, "%d/%m/%Y")
             check_out_fmt = dt_out.strftime("%Y-%m-%d")
        else:
             check_in_fmt = check_in
             check_out_fmt = check_out
    except:
        check_in_fmt = check_in
        check_out_fmt = check_out

    payload = {
        "CheckIn": check_in_fmt,
        "CheckOut": check_out_fmt,
        "HotelCodes": hotel_codes,
        "GuestNationality": "US",
        "PaxRooms": [
            {
                "Adults": guests,
                "Children": 0,
                "ChildrenAges": []
            }
        ],
        "ResponseTime": 20,
        "IsDetailedResponse": True
    }
    
    print(f"DEBUG: Search Payload: {json.dumps(payload)}", flush=True)

    try:
        response = requests.post(url, auth=get_auth(), json=payload, timeout=60)
        result = response.json()
        return result
    except Exception as e:
        print(f"Search Error: {e}")
        return None

def pre_book(booking_code):
    """
    Pre-Book check
    """
    url = f"{BASE_URL}/PreBook"
    payload = {
        "BookingCode": booking_code,
        "PaymentMode": "Limit"
    }
    try:
        response = requests.post(url, auth=get_auth(), json=payload, timeout=30)
        return response.json()
    except Exception as e:
        print(f"PreBook Error: {e}")
        return None

def book_hotel(booking_code, guest_details):
    """
    Final Booking
    """
    url = f"{BASE_URL}/Book"
    # Simplified payload structure - would need full mapping in production
    payload = {
        "BookingCode": booking_code,
        "CustomerDetails": [
            {
                "CustomerNames": guest_details # Expecting list of dicts with Title, FirstName, LastName, Type
            }
        ],
        "ClientReferenceId": "Ref-" + str(int(datetime.now().timestamp())),
        "BookingReferenceId": "Bk-" + str(int(datetime.now().timestamp())),
        "BookingType": "Voucher",
        "PaymentMode": "Limit"
    }
    try:
        response = requests.post(url, auth=get_auth(), json=payload, timeout=60)
        return response.json()
    except Exception as e:
        print(f"Book Error: {e}")
        return None

# Test function
if __name__ == "__main__":
    print("Testing TBO Client...")
    # Use dynamic dates for robust testing
    from datetime import datetime, timedelta
    today = datetime.now()
    check_in = (today + timedelta(days=2)).strftime("%Y-%m-%d")
    check_out = (today + timedelta(days=3)).strftime("%Y-%m-%d")
    
    # Test with Yonkers, NY
    res = search_hotels("Yonkers, NY", check_in, check_out, 1)
    
    if res and res.get("Status", {}).get("Code") == 200:
        print(f"Success! Found {len(res.get('HotelResult', []))} hotels in Yonkers.")
    else:
        print("Search failed.")
