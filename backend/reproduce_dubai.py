
import tbo_client
import sys

# Force stdout flush
sys.stdout.reconfigure(line_buffering=True)

location_input = "Dubai - United Arab Emirates"
print(f"--- Testing Location: '{location_input}' ---")

try:
    code = tbo_client.get_city_code(location_input)
    print(f"Resulting City Code: {code}")

    
    if code:
        print("Success: City found.")
    else:
        print("Failure: City NOT found.")

    # Also test date formatting if needed, but location is the likely culprit
    # Check-in: 12/12/2025 (MM/DD/YYYY) vs 2025-12-12 (YYYY-MM-DD)
    # tbo_client.search_hotels has some date parsing logic, let's test that too if needed.

except Exception as e:
    print(f"Error: {e}")
