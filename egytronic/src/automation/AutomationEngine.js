/**
 * Egytronic AI Agent Framework - Automation System
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

import { EventEmitter } from 'events';

/**
 * Automation System
 * Manages scheduled and event-driven automations
 */
export class AutomationSystem extends EventEmitter {
  constructor() {
    super();
    this.automations = new Map();
    this.schedules = new Map();
    this.webhooks = new Map();
    this.isRunning = false;
  }
  
  /**
   * Create a new automation
   */
  create(config) {
    const automation = {
      id: config.id || this.generateId(),
      name: config.name,
      prompt: config.prompt,
      trigger: config.trigger || { type: 'manual' },
      enabled: config.enabled !== false,
      timeout: config.timeout || 300,
      createdAt: new Date().toISOString(),
      lastRun: null,
      runs: 0,
      status: 'idle'
    };
    
    this.automations.set(automation.id, automation);
    this.emit('automation:created', automation);
    
    return automation;
  }
  
  /**
   * Create cron-based automation
   */
  createCron(name, prompt, schedule, options = {}) {
    return this.create({
      name,
      prompt,
      trigger: {
        type: 'cron',
        schedule,
        timezone: options.timezone || 'UTC'
      },
      ...options
    });
  }
  
  /**
   * Create event-based automation
   */
  createEvent(name, prompt, eventConfig, options = {}) {
    return this.create({
      name,
      prompt,
      trigger: {
        type: 'event',
        source: eventConfig.source,
        on: eventConfig.on,
        filter: eventConfig.filter
      },
      ...options
    });
  }
  
  /**
   * Start automation system
   */
  start() {
    this.isRunning = true;
    
    // Start cron schedulers
    for (const [id, automation] of this.automations) {
      if (automation.trigger.type === 'cron' && automation.enabled) {
        this.scheduleAutomation(id, automation);
      }
    }
    
    this.emit('system:started');
  }
  
  /**
   * Schedule an automation
   */
  scheduleAutomation(id, automation) {
    const cron = automation.trigger.schedule;
    // Simple cron implementation - in production use node-cron
    const interval = this.parseCronInterval(cron);
    if (interval) {
      this.schedules.set(id, setInterval(() => {
        this.run(id);
      }, interval));
    }
  }
  
  /**
   * Parse cron expression to milliseconds
   */
  parseCronInterval(cron) {
    // Very basic implementation
    // In production, use a proper cron parser
    const parts = cron.split(' ');
    if (parts.length !== 5) return null;
    
    // Default to 1 minute for demo
    return 60000;
  }
  
  /**
   * Run an automation
   */
  async run(id) {
    const automation = this.automations.get(id);
    if (!automation || !automation.enabled) {
      return { success: false, error: 'Automation not found or disabled' };
    }
    
    automation.status = 'running';
    automation.runs++;
    this.emit('automation:started', automation);
    
    try {
      // Execute automation prompt
      // This would connect to the agent
      const result = {
        success: true,
        output: automation.prompt,
        timestamp: new Date().toISOString()
      };
      
      automation.lastRun = new Date().toISOString();
      automation.status = 'completed';
      
      this.emit('automation:completed', { automation, result });
      return result;
      
    } catch (error) {
      automation.status = 'failed';
      this.emit('automation:failed', { automation, error });
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Enable/disable automation
   */
  setEnabled(id, enabled) {
    const automation = this.automations.get(id);
    if (automation) {
      automation.enabled = enabled;
      this.emit('automation:toggled', automation);
    }
  }
  
  /**
   * Register webhook
   */
  registerWebhook(config) {
    const webhook = {
      id: config.id || this.generateId(),
      name: config.name,
      source: config.source,
      url: config.url,
      secret: config.secret,
      enabled: config.enabled !== false
    };
    
    this.webhooks.set(webhook.id, webhook);
    this.emit('webhook:registered', webhook);
    
    return webhook;
  }
  
  /**
   * Trigger webhook
   */
  async triggerWebhook(id, payload) {
    const webhook = this.webhooks.get(id);
    if (!webhook || !webhook.enabled) {
      return { success: false, error: 'Webhook not found or disabled' };
    }
    
    // Find automations with matching trigger
    for (const [aId, automation] of this.automations) {
      if (automation.trigger.type === 'event' &&
          automation.trigger.source === webhook.source) {
        await this.run(aId);
      }
    }
    
    return { success: true };
  }
  
  /**
   * List automations
   */
  list() {
    return Array.from(this.automations.values());
  }
  
  /**
   * Delete automation
   */
  delete(id) {
    const automation = this.automations.get(id);
    if (automation) {
      // Clear schedule if exists
      const schedule = this.schedules.get(id);
      if (schedule) {
        clearInterval(schedule);
        this.schedules.delete(id);
      }
      this.automations.delete(id);
      this.emit('automation:deleted', automation);
    }
  }
  
  /**
   * Stop system
   */
  stop() {
    for (const [id, interval] of this.schedules) {
      clearInterval(interval);
    }
    this.schedules.clear();
    this.isRunning = false;
    this.emit('system:stopped');
  }
  
  /**
   * Generate unique ID
   */
  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

/**
 * Headless Browser Automation
 */
export class HeadlessBrowser {
  constructor(options = {}) {
    this.options = {
      headless: options.headless !== false,
      viewport: options.viewport || { width: 1920, height: 1080 },
      userAgent: options.userAgent || 'Mozilla/5.0',
      ...options
    };
    this.browser = null;
    this.context = null;
    this.pages = [];
  }
  
  /**
   * Launch browser
   */
  async launch() {
    try {
      // Prefer Playwright
      try {
        const { chromium } = await import('playwright');
        this.browser = await chromium.launch({
          headless: this.options.headless,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.context = await this.browser.newContext({
          viewport: this.options.viewport,
          userAgent: this.options.userAgent
        });
        return { success: true, type: 'playwright' };
      } catch {
        // Fallback to Puppeteer for screenshots/scraping
        const puppeteer = await import('puppeteer');
        this.browser = await puppeteer.launch({
          headless: this.options.headless,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        return { success: true, type: 'puppeteer' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Create new page
   */
  async newPage() {
    if (!this.context && this.browser) {
      this.context = await this.browser.newContext({
        viewport: this.options.viewport,
        userAgent: this.options.userAgent
      });
    }
    const page = await this.context.newPage();
    this.pages.push(page);
    return page;
  }
  
  /**
   * Navigate to URL
   */
  async navigate(url, options = {}) {
    if (this.pages.length === 0) {
      await this.newPage();
    }
    const page = this.pages[this.pages.length - 1];
    await page.goto(url, {
      waitUntil: options.waitUntil || 'networkidle',
      timeout: options.timeout || 30000
    });
    return { success: true, url };
  }
  
  /**
   * Click element
   */
  async click(selector) {
    if (this.pages.length === 0) {
      return { success: false, error: 'No page available' };
    }
    const page = this.pages[this.pages.length - 1];
    await page.click(selector);
    return { success: true, selector };
  }
  
  /**
   * Type into input
   */
  async type(selector, text, options = {}) {
    if (this.pages.length === 0) {
      return { success: false, error: 'No page available' };
    }
    const page = this.pages[this.pages.length - 1];
    await page.type(selector, text, options);
    return { success: true, selector, text };
  }
  
  /**
   * Get HTML content
   */
  async content() {
    if (this.pages.length === 0) {
      return { success: false, error: 'No page available' };
    }
    const page = this.pages[this.pages.length - 1];
    const content = await page.content();
    return { success: true, content };
  }
  
  /**
   * Evaluate JavaScript
   */
  async evaluate(fn) {
    if (this.pages.length === 0) {
      return { success: false, error: 'No page available' };
    }
    const page = this.pages[this.pages.length - 1];
    const result = await page.evaluate(fn);
    return { success: true, result };
  }
  
  /**
   * Take screenshot
   */
  async screenshot(options = {}) {
    if (this.pages.length === 0) {
      return { success: false, error: 'No page available' };
    }
    const page = this.pages[this.pages.length - 1];
    const buffer = await page.screenshot({
      type: options.type || 'png',
      fullPage: options.fullPage || false
    });
    return { 
      success: true, 
      data: buffer.toString('base64'),
      type: options.type || 'png'
    };
  }
  
  /**
   * Close browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.pages = [];
      return { success: true };
    }
    return { success: false, error: 'Browser not launched' };
  }
}

/**
 * Virtual Machine System
 */
export class VirtualMachine {
  constructor(options = {}) {
    this.options = {
      image: options.image || 'ubuntu:22.04',
      memory: options.memory || '512m',
      cpu: options.cpu || 1,
      ...options
    };
    this.id = this.generateId();
    this.status = 'stopped';
    this.snapshots = [];
  }
  
  /**
   * Create VM
   */
  async create() {
    this.status = 'created';
    return { 
      success: true, 
      id: this.id,
      image: this.options.image
    };
  }
  
  /**
   * Start VM
   */
  async start() {
    if (this.status === 'created' || this.status === 'stopped') {
      this.status = 'running';
      return { success: true, id: this.id };
    }
    return { success: false, error: 'Cannot start VM' };
  }
  
  /**
   * Stop VM
   */
  async stop() {
    this.status = 'stopped';
    return { success: true, id: this.id };
  }
  
  /**
   * Take snapshot
   */
  async snapshot(name) {
    const snapshot = {
      id: this.generateId(),
      name,
      timestamp: new Date().toISOString()
    };
    this.snapshots.push(snapshot);
    return { success: true, snapshot };
  }
  
  /**
   * Restore snapshot
   */
  async restore(snapshotId) {
    const snapshot = this.snapshots.find(s => s.id === snapshotId);
    if (!snapshot) {
      return { success: false, error: 'Snapshot not found' };
    }
    return { success: true, snapshot };
  }
  
  /**
   * Execute command
   */
  async exec(command) {
    // Simple execution (in production would use Docker API)
    return {
      success: true,
      output: `Executed: ${command}`,
      exitCode: 0
    };
  }
  
  /**
   * Generate ID
   */
  generateId() {
    return 'vm-' + Math.random().toString(36).substring(2, 10);
  }
}

export default {
  AutomationSystem,
  HeadlessBrowser,
  VirtualMachine
};