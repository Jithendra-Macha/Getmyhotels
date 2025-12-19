@echo off
echo ==========================================
echo   GetMyHotels Backend Launcher
echo ==========================================

echo [1/2] Installing requirements...
"C:\Users\front desk 2\AppData\Local\Microsoft\WindowsApps\python.exe" -m pip install -r requirements.txt

echo.
echo [2/2] Starting Backend Server...
echo (Press Ctrl+C to stop)
echo.
"C:\Users\front desk 2\AppData\Local\Microsoft\WindowsApps\python.exe" -m uvicorn main:app --reload

pause
