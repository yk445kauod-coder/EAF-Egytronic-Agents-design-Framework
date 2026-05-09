# ⚡ Egytronic AI Agent Framework

Build intelligent AI agents with multi-provider support.

## Installation

```bash
npm install @egytronic/agent-framework
# or
npx @egytronic/agent-framework
```

## Quick Start

```bash
# One-line setup
node cli/index.js setup

# Test
node cli/index.js test

# Run agent
node cli/index.js run "Hello!"

# Start dashboard
open gui/dashboard.html
```

## Directory Structure

```
egytronic/
├── cli/           # Command-line interface
├── gui/            # Web dashboards
├── src/            # Core framework
│   ├── core/       # Agent core
│   ├── providers/  # AI providers
│   ├── tools/      # Agent tools
│   └── automation/ # Automation engine
├── config/        # Configuration files
└── docs/           # Documentation
```

## Features

- Multi-provider AI (Cloudflare, Gemini, Groq, Anthropic)
- Agent tools (browser, filesystem, terminal)
- Automation scheduler
- Web dashboard
- CLI with ASCII art

## License

MIT - Egytronic 2026
