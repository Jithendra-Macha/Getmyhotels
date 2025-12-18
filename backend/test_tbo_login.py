import requests
import json
import os

# --- TBO Credentials Provided by User ---
# NOTE: In a real application, these should be loaded from .env or a secure vault.
# For this test, we hardcode them as provided.
TBO_URL = "http://api.tbotechnology.in/TBOHolidays_HotelAPI/CountryList"
TBO_USERNAME = "Gmhtest"
TBO_PASSWORD = "Gmh@68037072"

def get_public_ip():
    """Fetches the machine's public IP address."""
    try:
        # Using a reliable service to get the external IP
        ip_response = requests.get('https://api.ipify.org?format=json', timeout=5)
        ip_response.raise_for_status() 
        return ip_response.json().get('ip')
    except requests.exceptions.RequestException as e:
        print(f"Error fetching public IP: {e}")
        return "127.0.0.1" # Fallback, though likely to fail authentication

def perform_tbo_login():
    """Constructs and sends the TBO Login request."""
    end_user_ip = get_public_ip()
    
    # 1. Construct the Login Request Body
    # TBO APIs often use a generic request structure that includes authentication details
    # plus a basic, non-destructive request type for the first call (like a search)
    # or the Authentication request itself. We will use the common structure.
    login_payload = {
        # Authentication details common to all TBO requests
        "UserName": TBO_USERNAME,
        "Password": TBO_PASSWORD,
        "EndUserIp": end_user_ip,
        "TokenId": "",  # TokenId is empty for the first Login request
        
        # This part often defines the initial request type
        "RequestType": "GetCountryList", 
        
        # General parameters (adjust as needed based on the full spec)
        "ResponseTime": 30,
        "IsDetailedResponse": False,
        
        # The actual request data (e.g., GetCountryList requires no data)
        "CountryName": "",
        "CountryCode": ""
    }

    # Set headers
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    print(f"Attempting to connect to TBO API at {TBO_URL}...")
    print(f"Using EndUserIp: {end_user_ip}")

    try:
        # 2. Send the POST Request
        response = requests.post(
            TBO_URL, 
            json=login_payload, 
            headers=headers,
            timeout=60 # Use a generous timeout
        )
        
        # 3. Check for HTTP errors (4xx or 5xx)
        response.raise_for_status() 
        
        # 4. Print the raw JSON response
        print("\n--- RAW API RESPONSE (Login Attempt) ---")
        
        try:
            # Pretty print the JSON for easy reading
            response_json = response.json()
            print(json.dumps(response_json, indent=4))
        except json.JSONDecodeError:
            print("ERROR: Response was not valid JSON.")
            print("Raw Content:", response.text)

    except requests.exceptions.RequestException as e:
        print("\n--- CRITICAL REQUEST ERROR ---")
        print(f"An error occurred during the API request: {e}")
        print("This could be due to an incorrect URL, network failure, or a firewall issue.")
        if 'response' in locals() and response.text:
            print("Server Response (if available):", response.text)

if __name__ == "__main__":
    perform_tbo_login()
