/**
 * Egytronic AI Agent Framework - Provider Integrations
 * Build Agents. Empower Intelligence.
 * 
 * @author Egytronic
 * @version 1.0.0
 */

/**
 * Provider configurations and templates
 */
export const PROVIDERS = {
  cloudflare: {
    name: 'Cloudflare Workers AI',
    type: 'cf',
    baseUrl: 'https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/run',
    authType: 'bearer',
    requires: ['accountId', 'apiToken'],
    models: [
      { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 8B' },
      { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B' },
      { id: '@cf/google/gemma-2-2b-it', name: 'Gemma 2 2B' },
      { id: '@cf/deepseek-ai/deepseek-coder-33b-instruct', name: 'DeepSeek Coder 33B' },
      { id: '@cf/meta/llama-3-70b-instruct', name: 'Llama 3 70B' }
    ]
  },
  gemini: {
    name: 'Google Gemini',
    type: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
    authType: 'query',
    requires: ['apiKey'],
    models: [
      { id: 'gemini-pro', name: 'Gemini Pro' },
      { id: 'gemini-pro-vision', name: 'Gemini Pro Vision' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B' }
    ]
  },
  groq: {
    name: 'Groq',
    type: 'openai',
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    authType: 'bearer',
    requires: ['apiKey'],
    models: [
      { id: 'llama-3-70b-8192', name: 'Llama 3 70B' },
      { id: 'llama-3-8b-8192', name: 'Llama 3 8B' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
      { id: 'llama-3-8b-instruct-evals', name: 'Llama 3 8B Instruct' }
    ]
  },
  anthropic: {
    name: 'Anthropic Claude',
    type: 'anthropic',
    baseUrl: 'https://api.anthropic.com/v1/messages',
    authType: 'api-key',
    requires: ['apiKey'],
    models: [
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
      { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' }
    ]
  },
  openai: {
    name: 'OpenAI',
    type: 'openai',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    authType: 'bearer',
    requires: ['apiKey'],
    models: [
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
      { id: 'gpt-4o', name: 'GPT-4O' },
      { id: 'gpt-4o-mini', name: 'GPT-4O Mini' }
    ]
  },
  'z.ai': {
    name: 'Z.ai',
    type: 'openai',
    baseUrl: 'https://api.z-ai.com/v1/chat/completions',
    authType: 'bearer',
    requires: ['apiKey'],
    models: [
      { id: 'z-chat', name: 'Z Chat' }
    ]
  },
  glm: {
    name: 'GLM (Zhipu AI)',
    type: 'openai',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    authType: 'bearer',
    requires: ['apiKey'],
    models: [
      { id: 'glm-4', name: 'GLM-4' },
      { id: 'glm-4-flash', name: 'GLM-4 Flash' },
      { id: 'glm-4-plus', name: 'GLM-4 Plus' },
      { id: 'glm-4-vision', name: 'GLM-4 Vision' }
    ]
  },
  ollama: {
    name: 'Ollama (Local)',
    type: 'ollama',
    baseUrl: 'http://localhost:11434/api/chat',
    authType: 'none',
    requires: [],
    models: [
      { id: 'llama2', name: 'Llama 2' },
      { id: 'mistral', name: 'Mistral' },
      { id: 'codellama', name: 'CodeLlama' },
      { id: 'orca-mini', name: 'Orca Mini' }
    ]
  }
};

/**
 * Create a provider instance
 */
export function createProvider(name, config) {
  const template = PROVIDERS[name];
  if (!template) {
    throw new Error(`Unknown provider: ${name}`);
  }
  
  return {
    ...template,
    config: {
      accountId: config.accountId,
      apiToken: config.apiToken,
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || template.baseUrl
    },
    enabled: true
  };
}

/**
 * Call a provider API
 */
export async function callProvider(provider, messages, options = {}) {
  const { model, temperature = 0.7, maxTokens = 4096 } = options;
  
  let url, headers, body;
  
  switch (provider.type) {
    case 'cf':
      url = provider.config.baseUrl.replace('{accountId}', provider.config.accountId);
      url = `${url}/${model}`;
      headers = {
        'Authorization': `Bearer ${provider.config.apiToken}`,
        'Content-Type': 'application/json'
      };
      body = JSON.stringify({ messages, temperature, max_tokens: maxTokens });
      break;
      
    case 'gemini':
      url = provider.config.baseUrl.replace('{model}', model) + `?key=${provider.config.apiKey}`;
      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify({
        contents: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        generationConfig: { temperature, maxOutputTokens: maxTokens }
      });
      break;
      
    case 'openai':
    case 'anthropic':
      url = provider.config.baseUrl;
      headers = {
        'Authorization': `Bearer ${provider.config.apiKey}`,
        'Content-Type': 'application/json'
      };
      if (provider.type === 'anthropic') {
        headers['anthropic-version'] = '2023-06-01';
      }
      body = JSON.stringify({ model, messages, temperature, max_tokens: maxTokens });
      break;
      
    case 'ollama':
      url = provider.config.baseUrl;
      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify({
        model: model || provider.models[0]?.id,
        messages,
        stream: false
      });
      break;
      
    default:
      throw new Error(`Unsupported provider type: ${provider.type}`);
  }
  
  const response = await fetch(url, { method: 'POST', headers, body });
  return response.json();
}

/**
 * Extract response from provider result
 */
export function extractResponse(result, providerType) {
  switch (providerType) {
    case 'cf':
      return result.result?.response || '';
    case 'gemini':
      return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    case 'openai':
      return result.choices?.[0]?.message?.content || '';
    case 'anthropic':
      return result.content?.[0]?.text || '';
    case 'ollama':
      return result.message?.content || '';
    default:
      return JSON.stringify(result);
  }
}

/**
 * Get available models for all providers
 */
export function getAllModels() {
  const models = [];
  for (const [name, provider] of Object.entries(PROVIDERS)) {
    provider.models.forEach(m => {
      models.push({ provider: name, ...m });
    });
  }
  return models;
}

/**
 * Validate provider configuration
 */
export function validateProviderConfig(name, config) {
  const template = PROVIDERS[name];
  if (!template) {
    return { valid: false, error: `Unknown provider: ${name}` };
  }
  
  const missing = template.requires.filter(field => !config[field]);
  if (missing.length > 0) {
    return { valid: false, error: `Missing required fields: ${missing.join(', ')}` };
  }
  
  return { valid: true };
}

export default {
  PROVIDERS,
  createProvider,
  callProvider,
  extractResponse,
  getAllModels,
  validateProviderConfig
};