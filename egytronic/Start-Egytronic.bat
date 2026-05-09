@echo off
REM ==========================================
REM Egytronic AI Agent Framework
REM Portable Edition for Windows 7
REM ==========================================

setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

echo.
echo  ******************************************
echo  *                                        *
echo  *    Egytronic AI Agent Framework         *
echo  *    Version 1.0.0                      *
echo  *    Windows 7/8/10/11                 *
echo  *                                        *
echo  ******************************************
echo.

REM Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from:
    echo   https://nodejs.org/dist/v16.20.4/node-v16.20.4-x64.msi
    echo.
    echo For Windows 7, use Node.js v16.x
    echo.
    pause
    exit /b 1
)

REM Show Node version
for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo [INFO] Node.js version: %NODE_VER%

REM Check Node version
for /f "tokens=1 delims=." %%a in ("%NODE_VER%") do set MAJOR=%%a
if %MAJOR% LSS 16 (
    echo [WARNING] Node.js version %NODE_VER% may not work on Windows 7
    echo [INFO] Recommended: Node.js v16.x
)

REM Change to script directory
cd /d "%SCRIPT_DIR%"

REM Run the main CLI
echo.
echo [INFO] Starting Egytronic...
echo.

if "%~1"=="" (
    node cli\index.js status
) else (
    node cli\index.js %*
)

echo.
pause