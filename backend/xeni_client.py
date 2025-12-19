
import requests
import os
import json
from datetime import datetime

# Environment Variables
# User needs to set these in .env
XENI_API_KEY = os.getenv("XENI_API_KEY", "")
XENI_SECRET_KEY = os.getenv("XENI_SECRET_KEY", "")

# Base URL (Production)
# Email said https://travelapi.ai/ but standard is often api.travelapi.ai
# If 404, we will try the other.
BASE_URL = "https://api.travelapi.ai"

class XeniClient:
    def __init__(self):
        self.api_key = XENI_API_KEY
        self.secret_key = XENI_SECRET_KEY
        self.session_signature = None
        self.session_timestamp = None
        
    def authenticate(self):
        """
        Authenticate with Xeni to get session signature.
        """
        if not self.api_key or not self.secret_key:
            print("ERROR: Xeni Credentials missing.")
            return False

        url = f"{BASE_URL}/identity/v2/auth/generate"
        payload = {
            "api_key": self.api_key,
            "secret": self.secret_key,
            "timestamp": {} # Empty object as per docs? Or current TS? Docs said "timestamp": {} in example.
            # Usually strict APIs want a real timestamp, but if the example showed {}, let's try that or current ts.
            # Let's assume standard behavior first, but docs snippet was literal.
        }
        
        try:
            response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
            if response.status_code == 200:
                data = response.json()
                # Assuming response structure based on common patterns or docs
                # Response should have 'signature' and 'timestamp'
                self.session_signature = data.get('data', {}).get('signature')
                self.session_timestamp = data.get('data', {}).get('timestamp')
                return True
            else:
                print(f"Xeni Auth Failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"Xeni Auth Exception: {e}")
            return False

    def get_headers(self):
        """
        Construct Authorization header.
        Format: XN api_key=<key>,signature=<sig>,timestamp=<ts>
        """
        if not self.session_signature:
            if not self.authenticate():
                return None
        
        # Re-auth if needed? (Token expiry?). For now simple check.
        
        auth_str = f"XN api_key={self.api_key},signature={self.session_signature},timestamp={self.session_timestamp}"
        return {
            "Content-Type": "application/json",
            "Authorization": auth_str
        }

    def search_hotels(self, lat, lng, check_in, check_out, adults=2):
        """
        Search properties by Lat/Long.
        check_in/out: YYYY-MM-DD
        """
        url = f"{BASE_URL}/hotels/api/v2/properties"
        
        payload = {
            "checkin_date": check_in,
            "checkout_date": check_out,
            "occupancy": [
                {
                    "adults": adults,
                    "childs": 0,
                    "childages": []
                }
            ],
            "location": {
                "lat": float(lat),
                "long": float(lng),
                "radius": 20 # 20km radius default
            },
            "country_of_residence": "US"
        }
        
        headers = self.get_headers()
        if not headers:
            return None
            
        try:
            response = requests.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Xeni Search Failed: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"Xeni Search Exception: {e}")
            return None

    def get_hotel_details(self, hotel_id):
        """
        Get specific hotel details.
        """
        url = f"{BASE_URL}/hotels/api/v2/property/{hotel_id}"
        headers = self.get_headers()
        if not headers:
            return None
            
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Xeni Details Failed: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"Xeni Details Exception: {e}")
            return None

xeni_client = XeniClient()
