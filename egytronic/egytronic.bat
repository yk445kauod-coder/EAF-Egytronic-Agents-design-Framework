@echo off
REM ==========================================
REM Egytronic AI Agent Framework Launcher
REM Windows 7/8/10/11 Compatible
REM ==========================================

echo.
echo  ========================================
echo  ^< Egytronic AI Agent Framework ^>
echo  ========================================
echo.

REM Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org
    echo Recommended: Node.js 18.x LTS for Windows 7+
    pause
    exit /b 1
)

REM Get Node version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [INFO] Node.js version: %NODE_VERSION%

REM Run the CLI
echo.
node cli\index.js %*

pause