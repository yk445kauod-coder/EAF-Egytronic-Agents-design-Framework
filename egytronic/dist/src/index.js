/**
 * Egytronic AI Agent Framework - Main Entry
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

// Core exports
export { EgytronicAgent } from './core/agent.js';
export { SkillManager } from './core/skills.js';
export { PROVIDERS, createProvider, callProvider, extractResponse } from './providers/index.js';
export { ToolManager, BrowserTool, FileSystemTool, TerminalTool } from './tools/index.js';
export { AutomationSystem, HeadlessBrowser, VirtualMachine } from './automation/index.js';

import chalk from 'chalk';

// Display banner
export function displayBanner() {
  console.log(chalk.cyan(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ███████╗ █████╗ ██╗██╗     ███████╗███████╗██╗     ║
║   ██╔════╝██╔══██╗██║██║     ██╔════╝██╔════╝██║     ║
║   █████╗  ███████║██║██║     █████╗  ███████╗██║     ║
║   ██╔══╝  ██╔══██║██║██║     ██╔══╝  ╚════██║██║     ║
║   ██║     ██║  ██║██║███████╗███████╗███████║███████║
║   ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚══════╝
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║  ⚡ AI Agent Framework | Build Agents. Empower Intelligence.   ║
║  ⚡ Version: 1.0.0 | Master Model: Egytronic_1.0              ║
╚═══════════════════════════════════════════════════════════════╝
  `));
}

export default {
  EgytronicAgent,
  SkillManager,
  PROVIDERS,
  ToolManager,
  AutomationSystem,
  HeadlessBrowser,
  VirtualMachine,
  displayBanner
};