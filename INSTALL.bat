@echo off
title Deck & Patio Planner - Setup
color 0B

echo.
echo  ========================================
echo   Deck ^& Patio Planner - One-Time Setup
echo  ========================================
echo.

:: Check if Node.js is already installed
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo  [OK] Node.js is already installed!
    for /f "tokens=*" %%i in ('node --version') do echo       Version: %%i
    echo.
    goto :install_deps
)

echo  [*] Node.js is not installed. Downloading...
echo.

:: Download Node.js installer
set NODE_URL=https://nodejs.org/dist/v22.16.0/node-v22.16.0-x64.msi
set NODE_FILE=%TEMP%\node-installer.msi

echo  Downloading Node.js LTS from nodejs.org...
powershell -Command "Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%NODE_FILE%'" 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [!] Download failed. Please install Node.js manually:
    echo      https://nodejs.org/en/download
    echo.
    echo  After installing, run START.bat
    pause
    exit /b 1
)

echo  [*] Running Node.js installer...
echo  Follow the installer prompts (just click Next).
echo.
msiexec /i "%NODE_FILE%"

:: Check if it installed successfully
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [!] Node.js installation may require you to restart this window.
    echo  Please close this window and double-click START.bat
    pause
    exit /b 0
)

:install_deps
echo  [*] Installing app dependencies...
call npm install --production
echo.

:: Create database
echo  [*] Creating database...
node -e "const Database = require('better-sqlite3'); const db = new Database('sqlite.db'); db.exec('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)'); db.exec('CREATE TABLE IF NOT EXISTS furniture_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, width_inches REAL NOT NULL, depth_inches REAL NOT NULL, source_url TEXT, image_url TEXT, color TEXT)'); db.close(); console.log('  [OK] Database created!');"

echo.
echo  ========================================
echo   Setup complete!
echo.
echo   Double-click START.bat to run the app.
echo  ========================================
echo.
pause
