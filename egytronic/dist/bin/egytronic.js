#!/usr/bin/env node

/**
 * Egytronic AI Agent Framework ⚡
 * Build Agents. Empower Intelligence.
 * 
 * One-line setup: npx egytronic-setup
 */

import chalk from 'chalk';
import Conf from 'conf';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url || `file://${import.meta.url}`);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const store = new Conf({ projectName: 'egytronic', defaults: { masterModel: 'Egytronic_1.0', providers: {} } });

// Custom colors
const orange = (t) => chalk.hex('#FF6B35')(t);
const gold = (t) => chalk.hex('#FFD700')(t);

// ============================================
// 🎨 EGYTRONIC ASCII LOGO
// ============================================

const LOGO = `
        ${orange('███████╗ ██████╗██╗   ██╗████████╗██████╗  ██████╗ ███╗   ██╗██╗ ██████╗')}
        ${orange('██╔════╝██╔════╝╚██╗ ██╔╝╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║██║██╔════╝')}
        ${orange('█████╗  ██║  ███╗╚████╔╝    ██║   ██████╔╝██║   ██║██╔██╗ ██║██║██║')}
        ${orange('██╔══╝  ██║   ██║ ╚██╔╝     ██║   ██╔══██╗██║   ██║██║╚██╗██║██║██║')}
        ${orange('███████╗╚██████╔╝  ██║      ██║   ██║  ██║╚██████╔╝██║ ╚████║██║╚██████╗')}
        ${orange('╚══════╝ ╚═════╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚═════╝')}
        
        ${orange('██████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗')}
        ${orange('██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝')}
        ${orange('██████╔╝██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗')}
        ${orange('██╔══██╗██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║')}
        ${orange('██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║')}
        ${orange('╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝')}
`;

const BANNER = `${chalk.cyan('╔═══════════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')} ${LOGO}${chalk.cyan('║')}
${chalk.cyan('╚═══════════════════════════════════════════════════════════════╝')}`;

const FOOTER = `${chalk.gray('━'.repeat(62))}
${chalk.gray('⚡')} ${chalk.white('Egytronic AI Agent Framework')} ${chalk.gray('|')} ${chalk.green('Build Agents. Empower Intelligence.')}
${chalk.gray('⚡')} ${chalk.gray('Version:')} ${chalk.white('1.0.0')} ${chalk.gray('|')} ${chalk.gray('Master:')} ${gold('Egytronic_1.0')}
${chalk.gray('━'.repeat(62))}`;

// API Keys - Set these as environment variables or update with your own
const CF_TOKEN = process.env.CF_TOKEN || '';
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID || '';
const GEMINI_KEY = process.env.GEMINI_KEY || '';

// Providers
const PROVIDERS = {
  cloudflare: { name: 'Cloudflare AI', models: ['@cf/meta/llama-3-8b-instruct'] },
  gemini: { name: 'Google Gemini', models: ['gemini-1.5-flash'] },
  groq: { name: 'Groq', models: ['llama-3-70b-8192'] },
  anthropic: { name: 'Anthropic', models: ['claude-3-opus'] },
  openai: { name: 'OpenAI', models: ['gpt-4o'] }
};

// Styles
const $ = { ok: (t) => chalk.green('✓')+' '+t, err: (t) => chalk.red('✗')+' '+t };

async function show() { console.clear(); console.log(chalk.bgBlack(BANNER + '\n' + FOOTER + '\n')); }

// ============================================
// ⚡ ONE-LINE SETUP COMMAND
// ============================================

async function cmdSetup() {
  await show();
  console.log(chalk.cyan('⚡ One-Line Setup\n'));
  
  // Initialize config
  store.set('initialized', true);
  store.set('masterModel', 'Egytronic_1.0');
  
  // Add providers with embedded keys
  const p = store.get('providers') || {};
  
  p['cloudflare'] = { 
    name: 'Cloudflare AI', 
    accountId: CF_ACCOUNT_ID, 
    apiToken: CF_TOKEN, 
    enabled: true, 
    models: PROVIDERS.cloudflare.models 
  };
  
  p['gemini'] = { 
    name: 'Google Gemini', 
    apiKey: GEMINI_KEY, 
    enabled: false 
  };
  
  store.set('providers', p);
  
  console.log($.ok(chalk.green('✓ Setup complete!')));
  console.log(chalk.gray('\nYour Cloudflare AI is ready!'));
  console.log(chalk.gray('\nCommands:'));
  console.log('  ' + chalk.white('egytronic test'));
  console.log('  ' + chalk.white('egytronic run "Hello!"'));
  console.log('  ' + chalk.white('egytronic gui\n'));
}

// ============================================
// ⚡ COMMANDS
// ============================================

async function cmdList() {
  await show();
  console.log(chalk.cyan('━━━ Providers ━━━\n'));
  const ps = store.get('providers') || {};
  if(!Object.keys(ps).length) console.log($.err('Run: egytronic setup'));
  else for(const [k,v] of Object.entries(ps)) console.log('  ' + (v.enabled?chalk.green('●'):chalk.red('●')) + ' ' + chalk.bold(k) + ' - ' + chalk.gray(v.name));
  console.log(chalk.gray('\n  Master: ') + gold(store.get('masterModel')));
}

async function cmdTest() {
  await show();
  console.log(chalk.cyan('━━━ Testing ━━━\n'));
  
  console.log(orange('☁')+' Cloudflare...');
  try {
    const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`, {
      method: 'POST', headers: {'Authorization':`Bearer ${CF_TOKEN}`,'Content-Type':'application/json'},
      body: JSON.stringify({messages:[{role:'system',content:'You are helpful.'},{role:'user',content:'Say "Hello from Egytronic!"'}]})
    });
    const d = await r.json();
    console.log($.ok(d.result?.response?.slice(0,40)||'OK'));
  } catch(e) { console.log($.err(e.message)); }
  
  console.log($.ok('Done'));
}

async function cmdRun() {
  const a = process.argv.slice(2);
  const p = a.indexOf('run');
  const prompt = a[p+1];
  if(!prompt) return console.log($.err('Usage: egytronic run "prompt"'));
  
  await show();
  console.log(chalk.cyan('🤖 Running...\n'));
  console.log(chalk.gray('Query: ')+chalk.white(prompt)+'\n');
  
  try {
    const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`, {
      method:'POST', headers:{'Authorization':`Bearer ${CF_TOKEN}`,'Content-Type':'application/json'},
      body:JSON.stringify({messages:[{role:'system',content:'You are Egytronic, a helpful AI coding agent.'},{role:'user',content:prompt}]})
    });
    const d = await r.json();
    if(d.success) { console.log(chalk.cyan('━━━ Response ━━━')); console.log(chalk.white('\n'+d.result.response)+'\n'); }
  } catch(e) { console.log($.err(e.message)); }
}

async function cmdStatus() {
  await show();
  console.log(chalk.cyan('━━━ Status ━━━'));
  console.log(chalk.gray('  Master: ')+gold(store.get('masterModel')));
  console.log(chalk.gray('  Init:   ')+(store.get('initialized')?chalk.green('Yes'):chalk.red('No')));
  const ps = store.get('providers')||{};
  console.log(chalk.gray('  Cloudflare: ')+(ps.cloudflare?.enabled?chalk.green('✓'):chalk.red('✗')));
}

async function cmdHelp() {
  await show();
  console.log(chalk.cyan('━━━ Commands ━━━\n'));
  console.log('  '+chalk.cyan('setup')+'......... One-line setup (recommended!)');
  console.log('  '+chalk.cyan('test')+'........... Test Cloudflare AI');
  console.log('  '+chalk.cyan('run "msg"')+'..... Run agent');
  console.log('  '+chalk.cyan('status')+'......... Status');
  console.log('  '+chalk.cyan('gui')+'............ Start GUI');
  console.log('  '+chalk.cyan('help')+'............ Help');
  console.log(chalk.gray('\nQuick: egytronic setup && egytronic test'));
}

async function cmdGui() {
  await show();
  console.log($.info('Starting GUI...\n'));
  const express = (await import('express')).default;
  const http = await import('http');
  const app = express();
  const server = http.createServer(app);
  app.use(express.json());
  app.use(express.static(join(__dirname,'gui')));
  const PORT = 3847;
  server.listen(PORT, () => console.log($.ok(`http://localhost:${PORT}`)));
  process.on('SIGINT', () => { server.close(); process.exit(0); });
}

// ============================================
// 🎯 MAIN
// ============================================

async function main() {
  const cmd = process.argv[2];
  switch(cmd) {
    case 'setup': case 'init': await cmdSetup(); break;
    case 'list': case 'providers': await cmdList(); break;
    case 'test': await cmdTest(); break;
    case 'run': await cmdRun(); break;
    case 'gui': await cmdGui(); break;
    case 'status': await cmdStatus(); break;
    case 'help': case '-h': await cmdHelp(); break;
    default: await show();
      if(cmd) console.log($.err('Unknown: '+cmd));
      await cmdStatus();
  }
}

main().catch(console.error);