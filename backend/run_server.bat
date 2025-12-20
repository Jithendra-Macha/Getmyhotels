@echo off
echo ==========================================
echo   GetMyHotels Backend Launcher
echo ==========================================

echo [1/2] Installing requirements...
cd /d "%~dp0"
python -m pip install -r requirements.txt

echo.
echo [2/2] Starting Backend Server...
echo (Press Ctrl+C to stop)
echo.
python -m uvicorn main:app --reload

pause
