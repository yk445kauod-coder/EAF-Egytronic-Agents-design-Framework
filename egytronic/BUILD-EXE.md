# Egytronic AI Agent Framework - Build EXE

This guide explains how to create a standalone `.exe` for Windows.

## Option 1: Use the Batch File (Recommended)

The framework includes `Start-Egytronic.bat` which works as a portable launcher.

### To distribute as a folder:
1. Copy the entire `egytronic` folder
2. Run `Start-Egytronic.bat`

## Option 2: Create EXE with Enigma Virtual Box

### Steps:
1. Download Enigma Virtual Box: https://www.enigmaprotector.com/
2. Create a folder with:
   - `Start-Egytronic.bat`
   - `cli\index.js`
   - `src\` folder
   - `node_modules\` folder
3. Open Enigma Virtual Box
4. Select "Files" → Add all files
5. Select "Options" → Check "Compress files"
6. Click "Protect" → Save as `Egytronic.exe`

## Option 3: Create EXE with Bat To Exe

### Steps:
1. Download Bat To Exe: https://github.com/99natmar/Bat-To-Exe-Converter
2. Select `Start-Egytronic.bat` as input
3. Set output: `Egytronic.exe`
4. Check "x64" for 64-bit Windows
5. Check "Administrator" if needed
6. Click "Convert"

## Option 4: Use Node.js PKG

### Steps:
```cmd
npm install -g pkg
pkg cli/index.js --targets node18-win-x64 --output Egytronic.exe
```

## Option 5: Use Node.js Compiler (NEXE)

```cmd
npm install -g nexe
nexe cli/index.js -o Egytronic.exe --target win32-x64
```

## Recommended Distribution Method

For Windows 7, the **batch file method** is most reliable:

```
egytronic/
├── Start-Egytronic.bat    <- Run this!
├── cli/
│   └── index.js
├── src/
├── config/
├── package.json
└── node_modules/
```

Users just double-click `Start-Egytronic.bat` and it works!

## System Requirements
- Windows 7 SP1 or higher
- 64-bit or 32-bit
- Node.js v16+ (or use portable version)