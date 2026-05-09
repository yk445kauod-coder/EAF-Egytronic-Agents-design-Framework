# ⚡ Egytronic AI Agent Framework

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge">
  <img src="https://img.shields.io/badge/Made-In-Egypt-FF6B35?style=for-the-badge&logoColor=fff">
  <img src="https://img.shields.io/badge/AI-Agents-00F5D4?style=for-the-badge">
</p>

<p align="center">
  <strong>🦙 Egypt's First AI Coding Agent Framework</strong><br>
  Build intelligent agents with multi-provider support — powered by Egytronic_1.0
</p>

---

## ✨ Features

### 🤖 Multi-Provider AI Support

| Provider | Icon | Status |
|---------|------|--------|
| 🦙 **Egytronic 16-bit** | 🦙 | ✅ Egypt's first fine-tuned Arabic LLM |
| ☁️ Cloudflare AI | ☁️ | ✅ Fast edge-deployed LLMs |
| 💻 Ollama (Local) | 💻 | ✅ GGUF models (Llama3, Mistral, CodeLlama) |
| 🌐 Google Gemini | 🌐 | ✅ Gemini Pro, Flash |
| ⚡ Groq | ⚡ | ✅ Ultra-fast inference |
| 🧠 Anthropic Claude | 🧠 | ✅ Claude 3.5, Claude 3 |
| 🤖 OpenAI | 🤖 | ✅ GPT-4o, GPT-4 Turbo |
| 🇨🇳 Zhipu GLM | 🇨🇳 | ✅ GLM-4, GLM-4-Flash |

### 🔧 Agent Tools

- 🌐 **Browser** — Headless automation (Playwright)
- 💻 **Terminal** — Shell command execution
- 📁 **FileSystem** — file_editor/Read files
- 🔗 **MCP** — Model Context Protocol
- 🐙 **GitHub** — Repository automation
- 🎭 **Playwright** — Web automation
- 💬 **WhatsApp/Telegram** — Messaging APIs
- 🖥️ **VM Access** — Virtual machine control

### ⚡ Automation System

- Cron-based task scheduling
- Webhook triggers
- Agent dispatching
- Custom workflows

### 🖥️ Interfaces

- **Web Dashboard** — Full-featured UI
- **CLI** — Beautiful ASCII art interface
- **API** — Programmatic access

---

## 🚀 Quick Start

### Windows

```cmd
git clone https://github.com/egytronic/agent-framework.git
cd agent-framework\egytronic
npm install
Start-Egytronic.bat
```

### Linux/Mac

```bash
git clone https://github.com/egytronic/agent-framework.git
cd agent-framework/egytronic
npm install
node cli/index.js setup
node cli/index.js test
```

---

## 📦 Installation

```bash
npm install @egytronic/agent-framework
```

---

## 💻 CLI Commands

```bash
node cli/index.js setup     # One-line setup
node cli/index.js test    # Test providers
node cli/index.js run "Hello"  # Run agent
node cli/index.js status # Status
node cli/index.js help   # Help
```

---

## 🖥️ Web Dashboard

Open `gui/dashboard.html` for the full GUI:

- Real-time chat
- Provider switching
- Code editor
- Terminal
- Automation scheduler
- Statistics

---

## 📁 Directory Structure

```
egytronic/
├── cli/              # CLI tool
├── gui/              # Web dashboards
├── src/              # Core framework
│   ├── core/       # Agent
│   ├── providers/  # AI providers
│   ├── tools/     # Tool manager
│   └── automation/ # Automation
├── config/          # Configuration
├── docs/            # Docs
└── package.json
```

---

## ⚙️ Configuration

```json
{
  "providers": {
    "cloudflare": { "enabled": true },
    "ollama": { "enabled": true, "baseUrl": "http://localhost:11434" }
  },
  "tools": {
    "browser": true,
    "terminal": true,
    "filesystem": true
  }
}
```

---

## 🔌 API Usage

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "provider": "cloudflare"}'
```

---

## 📜 License

MIT - Egytronic 2026

---

<p align="center">
  Built with 🤖 and 🧠 in Egypt 🇪🇬<br>
  © 2025 Egytronic
</p>