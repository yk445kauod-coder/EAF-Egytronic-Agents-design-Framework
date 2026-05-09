/**
 * Egytronic AI Agent Framework - Tools
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

import { createRequire } from 'module';

const require = createRequire(import.meta.url || `file://${import.meta.url}`);

/**
 * Tool Manager
 * Manages all agent tools and their configurations
 */
export class ToolManager {
  constructor() {
    this.tools = new Map();
    this.initializeTools();
  }
  
  /**
   * Initialize built-in tools
   */
  initializeTools() {
    // Browser Tool (Playwright/Puppeteer)
    this.register('browser', {
      name: 'Browser',
      description: 'Headless browser automation using Playwright',
      enabled: true,
      methods: {
        navigate: 'Navigate to a URL',
        click: 'Click an element',
        type: 'Type text into an input',
        screenshot: 'Take a screenshot',
        evaluate: 'Execute JavaScript',
        extract: 'Extract data from page',
        waitFor: 'Wait for selector'
      }
    });
    
    // FileSystem Tool
    this.register('filesystem', {
      name: 'FileSystem',
      description: 'File system operations',
      enabled: true,
      methods: {
        read: 'Read a file',
        write: 'Write to a file',
        delete: 'Delete a file',
        list: 'List directory contents',
        stat: 'Get file stats',
        mkdir: 'Create directory',
        copy: 'Copy file',
        move: 'Move file'
      }
    });
    
    // Terminal Tool
    this.register('terminal', {
      name: 'Terminal',
      description: 'Shell command execution',
      enabled: true,
      methods: {
        exec: 'Execute a command',
        spawn: 'Spawn a process',
        background: 'Run in background',
        pipInstall: 'Install Python package',
        npmInstall: 'Install Node package'
      }
    });
    
    // VM Tool
    this.register('vm', {
      name: 'VirtualMachine',
      description: 'Virtual machine operations',
      enabled: true,
      methods: {
        create: 'Create VM',
        start: 'Start VM',
        stop: 'Stop VM',
        snapshot: 'Create snapshot',
        restore: 'Restore snapshot',
        run: 'Run code in VM'
      }
    });
    
    // MCP Tool
    this.register('mcp', {
      name: 'MCP',
      description: 'Model Context Protocol integration',
      enabled: true,
      methods: {
        connect: 'Connect to MCP server',
        request: 'Make MCP request',
        stream: 'Stream from MCP',
        list: 'List available tools'
      }
    });
    
    // GitHub Tool
    this.register('github', {
      name: 'GitHub',
      description: 'GitHub API integration',
      enabled: true,
      methods: {
        createIssue: 'Create an issue',
        createPR: 'Create a pull request',
        merge: 'Merge PR',
        comment: 'Add comment',
        listIssues: 'List issues',
        getRepo: 'Get repository info'
      }
    });
    
    // Playwright Tool
    this.register('playwright', {
      name: 'Playwright',
      description: 'Advanced web automation with Playwright',
      enabled: true,
      methods: {
        newContext: 'Create browser context',
        newPage: 'Create new page',
        screenshot: 'Take screenshot',
        pdf: 'Generate PDF',
        trace: 'Record trace'
      }
    });
    
    // WhatsApp Tool
    this.register('whatsapp', {
      name: 'WhatsApp',
      description: 'WhatsApp Web integration',
      enabled: false,  // Disabled by default
      methods: {
        login: 'Scan QR code',
        sendMessage: 'Send a message',
        getContacts: 'Get contacts',
        getChats: 'Get chats'
      }
    });
    
    // Telegram Tool
    this.register('telegram', {
      name: 'Telegram',
      description: 'Telegram Bot integration',
      enabled: false,  // Disabled by default
      methods: {
        sendMessage: 'Send message',
        sendPhoto: 'Send photo',
        getUpdates: 'Get updates',
        setWebhook: 'Set webhook'
      }
    });
  }
  
  /**
   * Register a new tool
   */
  register(name, config) {
    this.tools.set(name, {
      name: config.name || name,
      description: config.description || '',
      enabled: config.enabled !== false,
      methods: config.methods || {},
      config: config.config || {}
    });
  }
  
  /**
   * Get tool info
   */
  get(name) {
    return this.tools.get(name);
  }
  
  /**
   * List all tools
   */
  list() {
    return Array.from(this.tools.values()).map(t => ({
      name: t.name,
      description: t.description,
      enabled: t.enabled,
      methods: Object.keys(t.methods)
    }));
  }
  
  /**
   * Enable/disable a tool
   */
  setEnabled(name, enabled) {
    const tool = this.tools.get(name);
    if (tool) {
      tool.enabled = enabled;
    }
  }
  
  /**
   * Check if tool is available
   */
  isEnabled(name) {
    return this.tools.get(name)?.enabled || false;
  }
  
  /**
   * Get tool methods
   */
  getMethods(name) {
    return this.tools.get(name)?.methods || {};
  }
  
  /**
   * Configure a tool
   */
  configure(name, config) {
    const tool = this.tools.get(name);
    if (tool) {
      tool.config = { ...tool.config, ...config };
    }
  }
}

/**
 * Browser Tool Implementation
 */
export class BrowserTool {
  constructor(options = {}) {
    this.options = {
      headless: options.headless !== false,
      viewport: options.viewport || { width: 1920, height: 1080 },
      userAgent: options.userAgent,
      ...options
    };
    this.browser = null;
    this.context = null;
    this.page = null;
  }
  
  async launch() {
    try {
      // Try Playwright first, then Puppeteer
      try {
        const { chromium } = await import('playwright');
        this.browser = await chromium.launch({
          headless: this.options.headless
        });
        this.context = await this.browser.newContext({
          viewport: this.options.viewport,
          userAgent: this.options.userAgent
        });
        this.page = await this.context.newPage();
      } catch {
        // Fallback to puppeteer
        const puppeteer = await import('puppeteer');
        this.browser = await puppeteer.launch({
          headless: this.options.headless
        });
        this.page = await this.browser.newPage();
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async navigate(url) {
    if (!this.page) {
      return { success: false, error: 'Browser not launched' };
    }
    await this.page.goto(url, { waitUntil: 'networkidle' });
    return { success: true, url };
  }
  
  async screenshot(path) {
    if (!this.page) {
      return { success: false, error: 'Browser not launched' };
    }
    const buffer = await this.page.screenshot();
    if (path) {
      const fs = await import('fs/promises');
      await fs.writeFile(path, buffer);
    }
    return { success: true, buffer: buffer.toString('base64') };
  }
  
  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

/**
 * FileSystem Tool Implementation
 */
export class FileSystemTool {
  async read(path) {
    const fs = await import('fs/promises');
    const content = await fs.readFile(path, 'utf-8');
    return { success: true, content };
  }
  
  async write(path, content) {
    const fs = await import('fs/promises');
    await fs.writeFile(path, content, 'utf-8');
    return { success: true, path };
  }
  
  async delete(path) {
    const fs = await import('fs/promises');
    await fs.unlink(path);
    return { success: true, path };
  }
  
  async list(path) {
    const fs = await import('fs/promises');
    const files = await fs.readdir(path);
    return { success: true, files };
  }
  
  async stat(path) {
    const fs = await import('fs/promises');
    const stats = await fs.stat(path);
    return { success: true, stats };
  }
  
  async mkdir(path) {
    const fs = await import('fs/promises');
    await fs.mkdir(path, { recursive: true });
    return { success: true, path };
  }
}

/**
 * Terminal Tool Implementation
 */
export class TerminalTool {
  async exec(command, options = {}) {
    const { exec: execAsync } = await import('child_process');
    
    return new Promise((resolve) => {
      execAsync(command, options, (error, stdout, stderr) => {
        if (error) {
          resolve({ success: false, error: error.message, stderr });
        } else {
          resolve({ success: true, stdout, stderr });
        }
      });
    });
  }
  
  async spawn(command, args, options = {}) {
    const { spawn: spawnAsync } = await import('child_process');
    
    return new Promise((resolve) => {
      const child = spawnAsync(command, args, options);
      let stdout = '';
      let stderr = '';
      
      child.stdout.on('data', (data) => { stdout += data; });
      child.stderr.on('data', (data) => { stderr += data; });
      child.on('close', (code) => {
        resolve({ success: code === 0, code, stdout, stderr });
      });
    });
  }
}

export default {
  ToolManager,
  BrowserTool,
  FileSystemTool,
  TerminalTool
};