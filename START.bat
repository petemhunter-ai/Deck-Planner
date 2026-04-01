@echo off
title Deck & Patio Planner
color 0A

echo.
echo  ========================================
echo   Deck ^& Patio Planner  v2.0  (PWA)
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js is not installed. Run INSTALL.bat first.
    pause & exit /b 1
)

if not exist "node_modules" (
    echo  [*] Installing dependencies...
    call npm install --production 2>nul
    echo  [OK] Done!
    echo.
)

if not exist "sqlite.db" (
    echo  [*] Creating database...
    node -e "const db=require('better-sqlite3')('sqlite.db');db.exec('CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,data TEXT NOT NULL,created_at TEXT NOT NULL)');db.exec('CREATE TABLE IF NOT EXISTS furniture_items(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,width_inches REAL NOT NULL,depth_inches REAL NOT NULL,source_url TEXT,image_url TEXT,color TEXT)');db.close();console.log('[OK] Database ready');"
    echo.
)

echo  [*] Finding your local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do set "RAW_IP=%%a" & goto :gotip
:gotip
set "LOCAL_IP=%RAW_IP: =%"

echo.
echo  ============================================
echo.
echo   On THIS computer, open:
echo   ^> http://localhost:5000
echo.
echo   On iPad / iPhone (same WiFi network):
echo   ^> http://%LOCAL_IP%:5000
echo.
echo   To install on iPad as an app:
echo   1. Open the URL above in Safari
echo   2. Tap the Share button (square + arrow)
echo   3. Scroll down and tap "Add to Home Screen"
echo   4. Tap "Add" top right - done!
echo.
echo  ============================================
echo.
echo  Keep this window open. Press Ctrl+C to stop.
echo.

set NODE_ENV=production
node server.cjs
