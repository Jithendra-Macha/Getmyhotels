import tbo_client
import json
import requests

def test_hotel_search_variations():
    print("Testing HotelSearch Variations...")
    url = f"{tbo_client.BASE_URL}/HotelSearch"
    
    base_payload = {
        "CheckInDate": "25/12/2025",
        "CheckOutDate": "26/12/2025",
        "GuestNationality": "US",
        "NoOfRooms": 1,
        "RoomGuests": [{"NoOfAdults": 1, "NoOfChild": 0, "ChildAge": None}],
        "ResultCount": 5
    }

    variations = [
        {
            "name": "Brooklyn CityId",
            "payload": {**base_payload, "CityId": "144396", "IsNearBySearchAllowed": False}
        },
        {
            "name": "Brooklyn CityId + Currency",
            "payload": {**base_payload, "CityId": "144396", "PreferredCurrency": "USD", "IsNearBySearchAllowed": False}
        },
        {
            "name": "Brooklyn CityId + HotelCodes None",
            "payload": {**base_payload, "CityId": "144396", "HotelCodes": None, "IsNearBySearchAllowed": False}
        },
        {
            "name": "New York CityId (100232)", # Acra, NY? No, let's try New York City if found. 
            # From previous output: 100232 is Acra. 
            # I need to find NYC.
            "payload": {**base_payload, "CityId": "144396", "IsNearBySearchAllowed": True}
        }
    ]
    
    for v in variations:
        print(f"\nTesting {v['name']}...")
        try:
            response = requests.post(url, auth=tbo_client.get_auth(), json=v['payload'], timeout=30)
            data = response.json()
            if data.get("Status", {}).get("Code") == 200:
                print("SUCCESS!")
                print(f"Found {len(data.get('HotelResult', []))} hotels.")
            else:
                print(f"FAILED: {data.get('Status', {}).get('Description')}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    test_hotel_search_variations()
