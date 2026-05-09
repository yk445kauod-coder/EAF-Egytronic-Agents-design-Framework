# ⚡ Egytronic AI Agent Framework

<p align="center">
  <img src="https://img.shields.io/badge/Windows-7%2F8%2F10%2F11-0078D6?style=for-the-badge&logo=windows">
  <img src="https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/CPU-x64%2Fx86-FF6B35?style=for-the-badge">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge">
</p>

<p align="center">
  <strong>Build intelligent AI agents with multi-provider support.</strong><br>
  Works on Windows 7, 8, 10, 11 (64-bit and 32-bit)
</p>

---

## 🚀 Quick Start (Windows)

### Option 1: Run Directly
```cmd
double-click: egytronic.bat
```

### Option 2: Command Line
```cmd
egytronic.bat setup
egytronic.bat test
egytronic.bat run "Hello!"
```

---

## 📥 Installation

### Prerequisites
1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/dist/v18.20.4/node-v18.20.4-x64.msi
   - For Windows 7: Use Node.js v16.x (last supported version)

2. **Git** (optional, for cloning)
   - Download: https://github.com/git-for-windows/git/releases

### Steps
```cmd
# Clone or download the framework
git clone https://github.com/egytronic/agent-framework.git
cd agent-framework

# Install dependencies
npm install

# Run setup
node cli/index.js setup

# Test
node cli/index.js test
```

---

## 💻 Windows 7 Specific Notes

### System Requirements
- **OS:** Windows 7 SP1 or higher
- **Architecture:** 64-bit (x64) or 32-bit (x86)
- **RAM:** 4GB minimum, 8GB recommended
- **Disk:** 500MB free space
- **Node.js:** v16.x (v18+ requires Windows 8.1+)

### Installation Issues?

#### Problem: "Node.js not found"
```cmd
# Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs
```

#### Problem: "Windows 7 not supported" (for newer Node.js)
Download Node.js v16.20.4:
```
https://nodejs.org/dist/v16.20.4/node-v16.20.4-x64.msi
```

#### Problem: SSL certificates error
```cmd
npm config set strict-ssl false
```

---

## 🎯 Usage

### CLI Commands
```cmd
# Setup (first time)
node cli\index.js setup

# Test AI connection
node cli\index.js test

# Run agent
node cli\index.js run "Write a Python hello world"

# Check status
node cli\index.js status

# Help
node cli\index.js help
```

### Or use the batch file
```cmd
egytronic.bat setup
egytronic.bat test
egytronic.bat run "Hello from Egytronic!"
```

---

## 🌐 Supported AI Providers

| Provider | Windows Support | Notes |
|----------|-----------------|-------|
| ☁️ Cloudflare AI | ✅ Full | Fast, free tier available |
| 💻 Ollama | ✅ Full | Local models (LLama3, Mistral) |
| 🌐 Google Gemini | ✅ Full | Requires API key |
| ⚡ Groq | ✅ Full | Fast inference |
| 🧠 Anthropic | ✅ Full | Requires API key |
| 🤖 OpenAI | ✅ Full | Requires API key |
| 🇨🇳 Zhipu GLM | ✅ Full | Chinese LLM |

---

## ⚙️ Configuration

Edit `config/default.config.json`:

```json
{
  "providers": {
    "cloudflare": {
      "enabled": true,
      "accountId": "YOUR-ACCOUNT-ID",
      "apiToken": "YOUR-TOKEN"
    },
    "ollama": {
      "enabled": true,
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

Or use environment variables:
```cmd
set CF_TOKEN=your-cloudflare-token
set CF_ACCOUNT_ID=your-account-id
set GEMINI_KEY=your-gemini-key
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Error: Cannot find module 'chalk'**
   ```cmd
   npm install chalk conf
   ```

2. **Error: Node.js version too old**
   - Download Node.js v16.20.4 from https://nodejs.org/dist/v16.20.4/

3. **API connection errors**
   - Check internet connection
   - Verify API keys are correct
   - Try different provider

4. **Windows Firewall blocking**
   - Allow Node.js through firewall
   - Or run as administrator

---

## 📁 Project Structure

```
egytronic/
├── cli/
│   └── index.js          # Command-line interface
├── src/
│   ├── core/             # Agent core
│   ├── providers/        # AI providers
│   ├── tools/           # Tool manager
│   └── automation/      # Automation engine
├── config/
│   └── default.config.json
├── docs/
├── gui/
│   └── dashboard.html   # Web dashboard
├── package.json
└── egytronic.bat       # Windows launcher
```

---

## 🔌 API Usage

### Start the dashboard
```cmd
npm run dev
```
Then open: http://localhost:3000

### Chat API
```cmd
curl -X POST http://localhost:3000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Hello\",\"provider\":\"cloudflare\"}"
```

---

## 📜 License

MIT License - Egytronic 2026

---

<p align="center">
  Built with ❤️ by <a href="https://egytronic.ai">Egytronic</a><br>
  Master Model: Egytronic_1.0
</p>