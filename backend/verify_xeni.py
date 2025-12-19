
from xeni_client import xeni_client, BASE_URL
import os
from dotenv import load_dotenv

load_dotenv()

print(f"Testing Xeni API against: {BASE_URL}")
print(f"API Key Present: {bool(os.getenv('XENI_API_KEY'))}")
print(f"Secret Key Present: {bool(os.getenv('XENI_SECRET_KEY'))}")

print("\n1. Testing Authentication...")
success = xeni_client.authenticate()
if success:
    print("✅ Authentication Successful!")
    print(f"Signature: {xeni_client.session_signature[:10]}...")
    
    print("\n2. Testing Hotel Search (Lat/Lng for Mumbai)...")
    # Mumbai: 19.0760, 72.8777
    try:
        from datetime import datetime, timedelta
        check_in = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
        check_out = (datetime.now() + timedelta(days=32)).strftime("%Y-%m-%d")
        
        results = xeni_client.search_hotels(19.0760, 72.8777, check_in, check_out)
        if results:
            print(f"✅ Search Successful! Response keys: {results.keys()}")
            data = results.get('data', {})
            # Handle different response structures
            if isinstance(data, list):
                props = data
            else:
                props = data.get('properties', [])
                
            print(f"Found {len(props)} properties.")
            if props:
                print(f"First Hotel: {props[0].get('name')}")
        else:
            print("❌ Search returned no data (or failed).")
    except Exception as e:
        print(f"❌ Search Exception: {e}")

else:
    print("❌ Authentication Failed.")
