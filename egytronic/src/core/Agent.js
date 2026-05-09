/**
 * Egytronic AI Agent Framework - Core Agent
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

import { EventEmitter } from 'events';
import { createRequire } from 'module';

const require = createRequire(import.meta.url || `file://${import.meta.url}`);

/**
 * Core Agent Class
 * Handles AI interactions, tool execution, and agent state
 */
export class EgytronicAgent extends EventEmitter {
  constructor(config = {}) {
    super();
    
    this.config = {
      masterModel: config.masterModel || 'Egytronic_1.0',
      provider: config.provider || 'cloudflare',
      model: config.model || '@cf/meta/llama-3-8b-instruct',
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 4096,
      systemPrompt: config.systemPrompt || 
        'You are Egytronic, a powerful AI coding agent. Be helpful, concise, and technical.'
    };
    
    this.providers = new Map();
    this.tools = new Map();
    this.conversation = [];
    this.isRunning = false;
    this.stats = {
      requests: 0,
      tokens: 0,
      errors: 0
    };
    
    this.initializeTools();
    this.initializeDefaultProviders();
  }
  
  /**
   * Initialize built-in tools
   */
  initializeTools() {
    // Browser Tool
    this.tools.set('browser', {
      name: 'browser',
      description: 'Web browser automation',
      enabled: true,
      methods: ['navigate', 'click', 'type', 'screenshot', 'extract']
    });
    
    // FileSystem Tool
    this.tools.set('filesystem', {
      name: 'filesystem',
      description: 'File system operations',
      enabled: true,
      methods: ['read', 'write', 'delete', 'list', 'stat']
    });
    
    // Terminal Tool
    this.tools.set('terminal', {
      name: 'terminal',
      description: 'Shell command execution',
      enabled: true,
      methods: ['exec', 'spawn', 'background']
    });
    
    // VM Tool
    this.tools.set('vm', {
      name: 'vm',
      description: 'Virtual machine operations',
      enabled: true,
      methods: ['run', 'create', 'snapshot', 'restore']
    });
    
    // MCP Tool
    this.tools.set('mcp', {
      name: 'mcp',
      description: 'Model Context Protocol',
      enabled: true,
      methods: ['connect', 'request', 'stream']
    });
    
    // GitHub Tool
    this.tools.set('github', {
      name: 'github',
      description: 'GitHub API integration',
      enabled: true,
      methods: ['createIssue', 'createPR', 'merge', 'comment']
    });
  }
  
  /**
   * Initialize default AI providers
   */
  initializeDefaultProviders() {
    // Cloudflare
    this.providers.set('cloudflare', {
      name: 'Cloudflare Workers AI',
      type: 'cf',
      baseUrl: 'https://api.cloudflare.com/client/v4/accounts',
      accountId: '',
      apiToken: '',
      models: [
        '@cf/meta/llama-3-8b-instruct',
        '@cf/meta/llama-3.1-8b-instruct',
        '@cf/google/gemma-2-2b-it',
        '@cf/deepseek-ai/deepseek-coder-33b-instruct'
      ],
      call: async (messages, model, options) => {
        const url = `${this.providers.get('cloudflare').baseUrl}/${this.providers.get('cloudflare').accountId}/ai/run/${model}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.providers.get('cloudflare').apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ messages, ...options })
        });
        return response.json();
      }
    });
    
    // Gemini
    this.providers.set('gemini', {
      name: 'Google Gemini',
      type: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
      apiKey: '',
      models: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
      call: async (messages, model, options) => {
        const url = `${this.providers.get('gemini').baseUrl}/${model}:generateContent?key=${this.providers.get('gemini').apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages.map(m => ({ parts: [{ text: m.content }] })),
            ...options
          })
        });
        return response.json();
      }
    });
    
    // Groq
    this.providers.set('groq', {
      name: 'Groq',
      type: 'openai',
      baseUrl: 'https://api.groq.com/openai/v1',
      apiKey: '',
      models: ['llama-3-70b-8192', 'llama-3-8b-8192', 'mixtral-8x7b-32768'],
      call: async (messages, model, options) => {
        const url = `${this.providers.get('groq').baseUrl}/chat/completions`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.providers.get('groq').apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ model, messages, ...options })
        });
        return response.json();
      }
    });
    
    // Anthropic
    this.providers.set('anthropic', {
      name: 'Anthropic Claude',
      type: 'anthropic',
      baseUrl: 'https://api.anthropic.com/v1',
      apiKey: '',
      models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
      call: async (messages, model, options) => {
        const url = `${this.providers.get('anthropic').baseUrl}/messages`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'x-api-key': this.providers.get('anthropic').apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ model, messages, ...options })
        });
        return response.json();
      }
    });
  }
  
  /**
   * Configure a provider
   */
  setProviderConfig(name, config) {
    const provider = this.providers.get(name);
    if (provider) {
      Object.assign(provider, config);
      this.emit('provider:configured', { name, config });
    }
  }
  
  /**
   * Add a custom model to a provider
   */
  addModel(providerName, modelConfig) {
    const provider = this.providers.get(providerName);
    if (provider) {
      provider.models.push(modelConfig.name);
      this.emit('model:added', { provider: providerName, model: modelConfig });
    }
  }
  
  /**
   * Set the master model
   */
  setMasterModel(modelName) {
    this.config.masterModel = modelName;
    this.emit('masterModel:changed', { model: modelName });
  }
  
  /**
   * Send a message to the agent
   */
  async sendMessage(message, options = {}) {
    if (this.isRunning) {
      throw new Error('Agent is already processing a request');
    }
    
    this.isRunning = true;
    this.stats.requests++;
    
    try {
      // Build conversation
      const messages = [
        { role: 'system', content: this.config.systemPrompt },
        ...this.conversation,
        { role: 'user', content: message }
      ];
      
      // Call provider
      const provider = this.providers.get(this.config.provider);
      if (!provider) {
        throw new Error(`Provider not configured: ${this.config.provider}`);
      }
      
      const model = options.model || this.config.model;
      const opts = {
        temperature: options.temperature || this.config.temperature,
        max_tokens: options.maxTokens || this.config.maxTokens
      };
      
      const result = await provider.call(messages, model, opts);
      
      // Extract response
      const response = this.extractResponse(result, provider.type);
      
      // Update conversation
      this.conversation.push({ role: 'user', content: message });
      this.conversation.push({ role: 'assistant', content: response });
      
      // Keep conversation manageable
      if (this.conversation.length > 20) {
        this.conversation = this.conversation.slice(-10);
      }
      
      this.emit('message:response', { message, response });
      return response;
      
    } catch (error) {
      this.stats.errors++;
      this.emit('error', error);
      throw error;
    } finally {
      this.isRunning = false;
    }
  }
  
  /**
   * Extract response based on provider type
   */
  extractResponse(result, type) {
    switch (type) {
      case 'cf':
        return result.result?.response || '';
      case 'gemini':
        return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
      case 'openai':
      case 'anthropic':
        return result.choices?.[0]?.message?.content || '';
      default:
        return JSON.stringify(result);
    }
  }
  
  /**
   * Clear conversation history
   */
  clearConversation() {
    this.conversation = [];
    this.emit('conversation:cleared');
  }
  
  /**
   * Get agent status
   */
  getStatus() {
    return {
      masterModel: this.config.masterModel,
      provider: this.config.provider,
      model: this.config.model,
      isRunning: this.isRunning,
      stats: this.stats,
      tools: Array.from(this.tools.keys()),
      providers: Array.from(this.providers.keys()),
      conversationLength: this.conversation.length
    };
  }
  
  /**
   * Enable/disable a tool
   */
  setToolEnabled(toolName, enabled) {
    const tool = this.tools.get(toolName);
    if (tool) {
      tool.enabled = enabled;
      this.emit('tool:changed', { tool: toolName, enabled });
    }
  }
  
  /**
   * Execute a tool
   */
  async executeTool(toolName, method, args = {}) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    if (!tool.enabled) {
      throw new Error(`Tool disabled: ${toolName}`);
    }
    if (!tool.methods.includes(method)) {
      throw new Error(`Method not available: ${method}`);
    }
    
    this.emit('tool:execute', { tool: toolName, method, args });
    // Tool execution would be implemented here
    return { success: true, tool: toolName, method };
  }
}

export default EgytronicAgent;