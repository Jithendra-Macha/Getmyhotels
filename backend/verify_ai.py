import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("DASHSCOPE_API_KEY")
print(f"Loaded API Key: {api_key[:5]}...{api_key[-4:]}")

try:
    client = OpenAI(
        api_key=api_key, 
        base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
    )

    print("Sending request to Qwen-Plus via OpenAI Compat Mode (Intl Endpoint)...")
    completion = client.chat.completions.create(
        model="qwen-plus",
        messages=[{"role": "user", "content": "Say hello!"}]
    )
    print("SUCCESS!")
    print(completion.choices[0].message.content)
except Exception as e:
    print(f"FAILED: {e}")
