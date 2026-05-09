# Egytronic AI Agent Framework

<p align="center">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMDBGNUQ0IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNCI+PHBhdGggZD0iTTQ4MCAyNTZoLTdoMjU2YzI4LjEzNCAwIDUwIDEyLjEzNiA1MCA0OHMtMjEuODY2IDQ4LTUwIDQ4SDQ4MHYtMzMyYy0yOC4xMzQgMC01MCAxMi4xMzYtNTAgNDhzMjEuODY2IDQ4IDUwIDQ4aDMzMnYtMjU2Yy0yOC4xMzQgMC01MCAxMi4xMzYtNTAgNDhzMjEuODY2IDQ4IDUwIDQ4em0tOTYtMzkyaC0xMzJ2MTEyaDMyVjE4NGg4MHYtMjU2YzAtMjguMTM0LTIxLjg2Ni00OC01MC00OHMtLTUwIDEyLjEzNi01MCA0OHYzNTJjMjguMTM0IDAgNTAgMTIuMTM2IDUwIDQ4djM1MnptLTEzMi0xMzJ2LTI1NmMtMjguMTM0IDAtNTAgMTIuMTM2LTUwIDQ4cy0yMS44NjYgNDgtNTAgNDhoLTEzMnYyNTZzMjEuODY2LTQ4IDUwLTQ4em0tMjU2LTU5MmMtMjguMTM0IDAtNTAgMTIuMTM2LTUwIDQ4czIwLjEzNiAzNSA1MCA0OHY1MDBjMjguMTM0IDAgNTAgMTIuMTM2IDUwIDQ4czIxLjg2Ni00OCA1MC00OHpNNDAwIDY0YzI4LjEzNCAwIDUwIDEyLjEzNiA1MCA0OHMtMjEuODY2IDQ4LTUwIDQ4SDQ4MHYtMjU2YzAtMjguMTM0LTIxLjg2Ni00OC01MC00OHMtLTUwIDEyLjEzNi01MCA0OHYzNTJ6Ii8+PC9zdmc+" width="128" alt="Egytronic" />
</p>

<h1 align="center">⚡ Egytronic AI Agent Framework</h1>
<p align="center"><strong>Build Agents. Empower Intelligence.</strong></p>

---

## Overview

Egytronic is a powerful AI coding agent framework that transforms any LLM (local or API) into a general-purpose AI agent with tools, automation, and advanced control capabilities.

### Features

- 🚀 **Multi-Provider Support** - Cloudflare AI, Google Gemini, Groq, Anthropic, OpenAI, and more
- 🔧 **Advanced Tools** - Browser automation, file system, terminal, VM, MCP integration
- 🤖 **Automation System** - Cron-based and event-driven automations
- 🎨 **Beautiful CLI** - ASCII art styling with colors
- 🌐 **GUI Dashboard** - Modern web-based interface
- 📦 **Skill System** - Extendable with skills from GitHub repos

---

## Installation

```bash
# Clone or extract the framework
cd egytronic

# Install dependencies
npm install

# Make CLI executable
chmod +x bin/egytronic.js

# Link globally (optional)
npm link
```

---

## Quick Start

### Initialize

```bash
node bin/egytronic.js init
```

### Add a Provider

```bash
# Cloudflare Workers AI
node bin/egytronic.js add-provider --name cloudflare --token <your-token> --account-id <your-account-id>

# Google Gemini
node bin/egytronic.js add-provider --name gemini --api-key <your-api-key>

# Groq
node bin/egytronic.js add-provider --name groq --api-key <your-api-key>

# Anthropic
node bin/egytronic.js add-provider --name anthropic --api-key <your-api-key>
```

### Run the Agent

```bash
# Interactive mode
node bin/egytronic.js run --prompt "Your task here"

# Test providers
node bin/egytronic.js test

# View providers
node bin/egytronic.js providers

# Launch GUI
node bin/egytronic.js gui
```

---

## Configuration

### Command Reference

| Command | Description |
|---------|-------------|
| `init` | Initialize framework |
| `add-provider` | Add AI provider |
| `add-model` | Add custom model |
| `set-master` | Set master model |
| `providers` | List providers |
| `test` | Test providers |
| `run` | Run agent |
| `gui` | Launch GUI |
| `config` | Configure tools |
| `help` | Show help |

### Supported Providers

- **Cloudflare Workers AI** - `@cf/meta/llama-3-8b-instruct`, `@cf/google/gemma-2-2b-it`
- **Google Gemini** - `gemini-1.5-pro`, `gemini-1.5-flash`
- **Groq** - `llama-3-70b-8192`, `mixtral-8x7b-32768`
- **Anthropic** - `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku`
- **OpenAI** - `gpt-4-turbo`, `gpt-4o`
- **Z.ai** - Custom provider
- **GLM** - Zhipu AI models
- **Ollama** - Local models

---

## Tools

### Available Tools

- **Browser** - Headless browser automation with Playwright/Puppeteer
- **FileSystem** - Read, write, delete, list files
- **Terminal** - Execute shell commands
- **VM** - Virtual machine operations
- **MCP** - Model Context Protocol servers
- **GitHub** - Repository and PR management
- **Playwright** - Advanced web automation
- **WhatsApp** - WhatsApp Web integration (optional)
- **Telegram** - Telegram Bot integration (optional)

---

## GUI Dashboard

Launch the web-based GUI:

```bash
node bin/egytronic.js gui
```

The GUI provides:
- Real-time status monitoring
- Provider management
- Tool configuration
- Interactive terminal
- Automation management
- Settings panel

---

## API Usage

### Programmatic Usage

```javascript
import { EgytronicAgent } from './src/index.js';

const agent = new EgytronicAgent({
  masterModel: 'Egytronic_1.0',
  provider: 'cloudflare',
  model: '@cf/meta/llama-3-8b-instruct'
});

// Configure provider
agent.setProviderConfig('cloudflare', {
  accountId: 'your-account-id',
  apiToken: 'your-api-token'
});

// Send a message
const response = await agent.sendMessage('Hello, how are you?');
console.log(response);
```

---

## Automation

### Create Cron-based Automation

```javascript
import { AutomationSystem } from './src/automation/index.js';

const automation = new AutomationSystem();
automation.createCron(
  'daily-report',
  'Generate daily status report',
  '0 9 * * *' // Daily at 9 AM
);
automation.start();
```

### Headless Browser

```javascript
import { HeadlessBrowser } from './src/automation/index.js';

const browser = new HeadlessBrowser();
await browser.launch();
await browser.navigate('https://example.com');
await browser.screenshot('page.png');
await browser.close();
```

---

## Configuration File

The framework uses `egytronic.config.json`:

```json
{
  "name": "egytronic",
  "version": "1.0.0",
  "masterModel": "Egytronic_1.0",
  "providers": {
    "cloudflare": {
      "accountId": "your-id",
      "apiToken": "your-token",
      "enabled": true
    }
  },
  "tools": {
    "browser": true,
    "filesystem": true,
    "terminal": true
  }
}
```

---

## Version

- **Current Version**: 1.0.0
- **Master Model**: Egytronic_1.0
- **Author**: Egytronic

---

## License

MIT License - Egytronic

---

<p align="center">
  <sub>Built with ❤️ by Egytronic</sub>
</p>