/**
 * Egytronic AI Agent Framework - Skill System
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

import { EventEmitter } from 'events';

/**
 * Skill Manager
 * Manages skills, MCP servers, and extensions
 */
export class SkillManager extends EventEmitter {
  constructor() {
    super();
    this.skills = new Map();
    this.mcpServers = new Map();
    this.hooks = [];
    this.initializeBuiltInSkills();
  }
  
  /**
   * Initialize built-in skills
   */
  initializeBuiltInSkills() {
    // GitHub skill
    this.register('github', {
      name: 'GitHub',
      description: 'Interact with GitHub repositories via API',
      version: '1.0.0',
      methods: {
        createIssue: 'Create a new issue',
        createPR: 'Create a pull request',
        mergePR: 'Merge a pull request',
        addComment: 'Add comment to issue/PR',
        listIssues: 'List repository issues',
        listPRs: 'List pull requests',
        getRepo: 'Get repository information'
      },
      requires: ['token']
    });
    
    // GitLab skill
    this.register('gitlab', {
      name: 'GitLab',
      description: 'Interact with GitLab repositories via API',
      version: '1.0.0',
      methods: {
        createIssue: 'Create issue',
        createMR: 'Create merge request',
        merge: 'Merge MR',
        listIssues: 'List issues'
      },
      requires: ['token']
    });
    
    // Browser Automation skill
    this.register('browser', {
      name: 'Browser Automation',
      description: 'Headless browser automation with Playwright/Puppeteer',
      version: '1.0.0',
      methods: {
        navigate: 'Navigate to URL',
        click: 'Click element',
        type: 'Type text',
        screenshot: 'Take screenshot',
        evaluate: 'Execute JavaScript',
        extract: 'Extract page data',
        fill: 'Fill form field'
      }
    });
    
    // Code Review skill
    this.register('code-review', {
      name: 'Code Review',
      description: 'Automated code review for quality and security',
      version: '1.0.0',
      methods: {
        review: 'Review code changes',
        checkSecurity: 'Check for security issues',
        suggestFixes: 'Suggest improvements'
      }
    });
    
    // Security skill
    this.register('security', {
      name: 'Security',
      description: 'Security analysis and vulnerability detection',
      version: '1.0.0',
      methods: {
        scan: 'Scan for vulnerabilities',
        check: 'Check security configuration',
        audit: 'Audit code for security issues'
      }
    });
    
    // Container (Docker) skill
    this.register('docker', {
      name: 'Docker',
      description: 'Docker container management',
      version: '1.0.0',
      methods: {
        run: 'Run container',
        build: 'Build image',
        start: 'Start container',
        stop: 'Stop container',
        ps: 'List containers'
      }
    });
    
    // Kubernetes skill
    this.register('kubernetes', {
      name: 'Kubernetes',
      description: 'Kubernetes cluster management',
      version: '1.0.0',
      methods: {
        apply: 'Apply manifest',
        getPods: 'List pods',
        getServices: 'List services',
        scale: 'Scale deployment'
      }
    });
    
    // Linear (project management) skill
    this.register('linear', {
      name: 'Linear',
      description: 'Linear issue tracking integration',
      version: '1.0.0',
      methods: {
        createIssue: 'Create issue',
        updateIssue: 'Update issue',
        comment: 'Add comment'
      },
      requires: ['apiKey']
    });
    
    // Discord skill
    this.register('discord', {
      name: 'Discord',
      description: 'Discord bot and webhook integration',
      version: '1.0.0',
      methods: {
        sendMessage: 'Send message to channel',
        sendWebhook: 'Send webhook message',
        createChannel: 'Create channel'
      },
      requires: ['token']
    });
    
    // Datadog skill
    this.register('datadog', {
      name: 'Datadog',
      description: 'Datadog monitoring and logging',
      version: '1.0.0',
      methods: {
        queryMetrics: 'Query metrics',
        getLogs: 'Get logs',
        getTraces: 'Get traces'
      },
      requires: ['apiKey']
    });
  }
  
  /**
   * Register a skill
   */
  register(name, config) {
    const skill = {
      name: config.name || name,
      description: config.description || '',
      version: config.version || '1.0.0',
      methods: config.methods || {},
      requires: config.requires || [],
      enabled: config.enabled !== false,
      config: config.config || {}
    };
    
    this.skills.set(name, skill);
    this.emit('skill:registered', skill);
    
    return skill;
  }
  
  /**
   * Get skill
   */
  get(name) {
    return this.skills.get(name);
  }
  
  /**
   * List all skills
   */
  list() {
    return Array.from(this.skills.values()).map(s => ({
      name: s.name,
      description: s.description,
      version: s.version,
      enabled: s.enabled,
      methodCount: Object.keys(s.methods).length
    }));
  }
  
  /**
   * List available methods
   */
  getMethods(name) {
    return this.skills.get(name)?.methods || {};
  }
  
  /**
   * Enable/disable skill
   */
  setEnabled(name, enabled) {
    const skill = this.skills.get(name);
    if (skill) {
      skill.enabled = enabled;
      this.emit('skill:toggled', { name, enabled });
    }
  }
  
  /**
   * Configure skill
   */
  configure(name, config) {
    const skill = this.skills.get(name);
    if (skill) {
      skill.config = { ...skill.config, ...config };
      this.emit('skill:configured', { name, config });
    }
  }
  
  /**
   * Load skill from repository
   */
  async loadFromRepo(repoUrl, options = {}) {
    // Clone and load skill from GitHub repo
    const skillConfig = {
      name: options.name,
      description: options.description || 'Loaded from external repository',
      version: options.version || '1.0.0',
      methods: options.methods || {},
      source: repoUrl
    };
    
    return this.register(options.name, skillConfig);
  }
  
  /**
   * MCP Server management
   */
  registerMcpServer(name, config) {
    const server = {
      name: config.name || name,
      url: config.url,
      token: config.token,
      enabled: config.enabled !== false,
      tools: config.tools || []
    };
    
    this.mcpServers.set(name, server);
    this.emit('mcp:registered', server);
    
    return server;
  }
  
  /**
   * Connect to MCP server
   */
  async connectMcp(name) {
    const server = this.mcpServers.get(name);
    if (!server || !server.url) {
      return { success: false, error: 'MCP server not found' };
    }
    
    try {
      const response = await fetch(server.url + '/tools', {
        headers: server.token ? {
          'Authorization': `Bearer ${server.token}`
        } : {}
      });
      
      const tools = await response.json();
      server.tools = tools;
      this.emit('mcp:connected', server);
      
      return { success: true, tools };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Call MCP tool
   */
  async callMcpTool(serverName, toolName, args = {}) {
    const server = this.mcpServers.get(serverName);
    if (!server) {
      return { success: false, error: 'MCP server not found' };
    }
    
    try {
      const response = await fetch(server.url + '/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(server.token ? { 'Authorization': `Bearer ${server.token}` } : {})
        },
        body: JSON.stringify({
          tool: toolName,
          args
        })
      });
      
      const result = await response.json();
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Register lifecycle hook
   */
  registerHook(hookType, fn) {
    this.hooks.push({ type: hookType, fn });
  }
  
  /**
   * Execute hooks
   */
  async executeHooks(hookType, data) {
    const hooks = this.hooks.filter(h => h.type === hookType);
    for (const hook of hooks) {
      await hook.fn(data);
    }
  }
}

export default {
  SkillManager
};