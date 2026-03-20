#!/usr/bin/env node

/**
 * Confluence Sync CLI
 *
 * Unified command-line interface for syncing markdown files with Confluence.
 * This wraps the confluence-sync.js helper functions and MCP calls into single commands.
 *
 * Usage:
 *   node cli.js create <file-path>              - Create new Confluence page (Live Doc by default)
 *   node cli.js create <file-path> --classic    - Create classic Confluence page
 *   node cli.js push <file-path>                - Push local changes to Confluence
 *   node cli.js push <file-path> --force        - Push without conflict check
 *   node cli.js pull <file-path>                - Pull Confluence changes to local
 *   node cli.js init <file-path> <page-id>      - Link file to existing page
 */

const sync = require('./confluence-sync.cjs');
const { execSync } = require('child_process');
const fs = require('fs');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ Error: ${message}`, 'red');
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Call an MCP tool via Claude Code CLI
 * This requires Claude Code to be installed and authenticated
 */
function callMcpTool(toolName, params) {
  info(`Calling MCP tool: ${toolName}`);

  // Save params to temp file
  const paramsFile = '/tmp/mcp_params.json';
  fs.writeFileSync(paramsFile, JSON.stringify(params, null, 2));

  try {
    // Call the MCP tool via Claude Code CLI
    // Note: This is a placeholder - actual MCP tool calling would need to be implemented
    // For now, we'll return instructions for Claude to execute
    return {
      needsManualExecution: true,
      tool: toolName,
      params: params
    };
  } catch (err) {
    error(`Failed to call MCP tool: ${err.message}`);
  }
}

/**
 * CREATE command
 */
function createCommand(filePath, options = {}) {
  info(`Creating Confluence page from: ${filePath}`);

  try {
    // Prepare the create operation
    const prepareOptions = {};
    if (options.classic) {
      prepareOptions.subtype = 'page';
      info('Creating classic Confluence page (not Live Doc)');
    } else {
      info('Creating Live Doc (modern Confluence format)');
    }

    const prepared = sync.prepareCreate(filePath, prepareOptions);

    log('\n📋 Prepared MCP call:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall, null, 2));

    log('\n⚠️  Manual step required:', 'yellow');
    log('Claude needs to execute the following MCP tool call:', 'yellow');
    log(`\nTool: ${prepared.mcpCall.tool}`, 'cyan');
    log('Params:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall.params, null, 2));

    // Save the prepared data for completion
    const stateFile = '/tmp/confluence_create_state.json';
    fs.writeFileSync(stateFile, JSON.stringify({ filePath, prepared }, null, 2));

    log(`\n💾 State saved to: ${stateFile}`, 'cyan');
    log('\nAfter executing the MCP call, run:', 'yellow');
    log(`  node cli.js complete-create <mcp-response.json>`, 'cyan');

    return prepared;
  } catch (err) {
    error(err.message);
  }
}

/**
 * COMPLETE-CREATE command
 */
function completeCreateCommand(responseFile) {
  try {
    // Load the saved state
    const stateFile = '/tmp/confluence_create_state.json';
    if (!fs.existsSync(stateFile)) {
      error('No saved state found. Run "create" command first.');
    }

    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    const mcpResponse = JSON.parse(fs.readFileSync(responseFile, 'utf8'));

    info(`Completing create operation for: ${state.filePath}`);

    const result = sync.completeCreate(state.filePath, mcpResponse);

    if (result.success) {
      success('Confluence page created successfully!');
      log(`\n📄 Page ID: ${result.pageId}`, 'cyan');
      log(`🔗 URL: ${result.url}`, 'cyan');
      log(`📝 Version: ${result.version}`, 'cyan');

      // Clean up state file
      fs.unlinkSync(stateFile);
    } else {
      error('Failed to complete create operation');
    }

    return result;
  } catch (err) {
    error(err.message);
  }
}

/**
 * PUSH command
 */
function pushCommand(filePath, options = {}) {
  info(`Pushing changes to Confluence: ${filePath}`);

  try {
    const prepared = sync.preparePush(filePath, options.force);

    log('\n📋 Prepared MCP calls:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCalls, null, 2));

    log('\n⚠️  Manual steps required:', 'yellow');
    log('Claude needs to execute the following MCP tool calls in order:', 'yellow');

    prepared.mcpCalls.forEach((call, i) => {
      log(`\n${i + 1}. ${call.purpose || 'execute'}:`, 'cyan');
      log(`   Tool: ${call.tool}`, 'cyan');
      log('   Params:', 'cyan');
      console.log('   ' + JSON.stringify(call.params, null, 2).split('\n').join('\n   '));
    });

    // Save the prepared data for completion
    const stateFile = '/tmp/confluence_push_state.json';
    fs.writeFileSync(stateFile, JSON.stringify({ filePath, prepared }, null, 2));

    log(`\n💾 State saved to: ${stateFile}`, 'cyan');
    log('\nAfter executing the MCP calls, run:', 'yellow');
    log(`  node cli.js complete-push <conflict-check-response.json> <update-response.json>`, 'cyan');

    return prepared;
  } catch (err) {
    error(err.message);
  }
}

/**
 * COMPLETE-PUSH command
 */
function completePushCommand(conflictResponseFile, updateResponseFile) {
  try {
    const stateFile = '/tmp/confluence_push_state.json';
    if (!fs.existsSync(stateFile)) {
      error('No saved state found. Run "push" command first.');
    }

    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

    let conflictCheck = null;
    let updateResponse = null;

    // If only one file provided, it's the update response (no conflict check)
    if (!updateResponseFile) {
      updateResponse = JSON.parse(fs.readFileSync(conflictResponseFile, 'utf8'));
    } else {
      conflictCheck = JSON.parse(fs.readFileSync(conflictResponseFile, 'utf8'));
      updateResponse = JSON.parse(fs.readFileSync(updateResponseFile, 'utf8'));
    }

    info(`Completing push operation for: ${state.filePath}`);

    const result = sync.completePush(state.filePath, updateResponse, conflictCheck);

    if (result.success) {
      success('Changes pushed to Confluence successfully!');
      log(`\n📄 Page ID: ${result.pageId}`, 'cyan');
      log(`🔗 URL: ${result.url}`, 'cyan');
      log(`📝 Version: ${result.version}`, 'cyan');

      // Clean up state file
      fs.unlinkSync(stateFile);
    } else if (result.conflict) {
      log(`\n⚠️  ${result.message}`, 'yellow');
      log('\nRun "pull" first to get remote changes, then push again.', 'yellow');
    } else {
      error('Failed to complete push operation');
    }

    return result;
  } catch (err) {
    error(err.message);
  }
}

/**
 * PULL command
 */
function pullCommand(filePath) {
  info(`Pulling changes from Confluence: ${filePath}`);

  try {
    const prepared = sync.preparePull(filePath);

    log('\n📋 Prepared MCP call:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall, null, 2));

    log('\n⚠️  Manual step required:', 'yellow');
    log('Claude needs to execute the following MCP tool call:', 'yellow');
    log(`\nTool: ${prepared.mcpCall.tool}`, 'cyan');
    log('Params:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall.params, null, 2));

    // Save the prepared data for completion
    const stateFile = '/tmp/confluence_pull_state.json';
    fs.writeFileSync(stateFile, JSON.stringify({ filePath, prepared }, null, 2));

    log(`\n💾 State saved to: ${stateFile}`, 'cyan');
    log('\nAfter executing the MCP call, run:', 'yellow');
    log(`  node cli.js complete-pull <mcp-response.json>`, 'cyan');

    return prepared;
  } catch (err) {
    error(err.message);
  }
}

/**
 * COMPLETE-PULL command
 */
function completePullCommand(responseFile) {
  try {
    const stateFile = '/tmp/confluence_pull_state.json';
    if (!fs.existsSync(stateFile)) {
      error('No saved state found. Run "pull" command first.');
    }

    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    const mcpResponse = JSON.parse(fs.readFileSync(responseFile, 'utf8'));

    info(`Completing pull operation for: ${state.filePath}`);

    const result = sync.completePull(state.filePath, mcpResponse);

    if (result.success) {
      success('Changes pulled from Confluence successfully!');
      log(`\n📄 Page ID: ${result.pageId}`, 'cyan');
      log(`🔗 URL: ${result.url}`, 'cyan');
      log(`📝 Title: ${result.title}`, 'cyan');

      // Clean up state file
      fs.unlinkSync(stateFile);
    } else {
      error('Failed to complete pull operation');
    }

    return result;
  } catch (err) {
    error(err.message);
  }
}

/**
 * INIT command
 */
function initCommand(filePath, pageId) {
  info(`Linking file to Confluence page: ${filePath} → ${pageId}`);

  try {
    const prepared = sync.prepareInit(filePath, pageId);

    log('\n📋 Prepared MCP call:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall, null, 2));

    log('\n⚠️  Manual step required:', 'yellow');
    log('Claude needs to execute the following MCP tool call:', 'yellow');
    log(`\nTool: ${prepared.mcpCall.tool}`, 'cyan');
    log('Params:', 'cyan');
    console.log(JSON.stringify(prepared.mcpCall.params, null, 2));

    // Save the prepared data for completion
    const stateFile = '/tmp/confluence_init_state.json';
    fs.writeFileSync(stateFile, JSON.stringify({ filePath, prepared }, null, 2));

    log(`\n💾 State saved to: ${stateFile}`, 'cyan');
    log('\nAfter executing the MCP call, run:', 'yellow');
    log(`  node cli.js complete-init <mcp-response.json>`, 'cyan');

    return prepared;
  } catch (err) {
    error(err.message);
  }
}

/**
 * COMPLETE-INIT command
 */
function completeInitCommand(responseFile) {
  try {
    const stateFile = '/tmp/confluence_init_state.json';
    if (!fs.existsSync(stateFile)) {
      error('No saved state found. Run "init" command first.');
    }

    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    const mcpResponse = JSON.parse(fs.readFileSync(responseFile, 'utf8'));

    info(`Completing init operation for: ${state.filePath}`);

    const result = sync.completeInit(state.filePath, mcpResponse);

    if (result.success) {
      success('File linked to Confluence page successfully!');
      log(`\n📄 Page ID: ${result.pageId}`, 'cyan');
      log(`🔗 URL: ${result.url}`, 'cyan');
      log(`📝 Title: ${result.title}`, 'cyan');

      // Clean up state file
      fs.unlinkSync(stateFile);
    } else {
      error('Failed to complete init operation');
    }

    return result;
  } catch (err) {
    error(err.message);
  }
}

/**
 * Main CLI router
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Confluence Sync CLI

Usage:
  node cli.js create <file-path> [--classic]     Create new Confluence page (Live Doc by default)
  node cli.js complete-create <response.json>    Complete create after MCP call

  node cli.js push <file-path> [--force]         Push local changes to Confluence
  node cli.js complete-push <update-response.json> [<conflict-response.json>]

  node cli.js pull <file-path>                   Pull Confluence changes to local
  node cli.js complete-pull <response.json>      Complete pull after MCP call

  node cli.js init <file-path> <page-id>         Link file to existing Confluence page
  node cli.js complete-init <response.json>      Complete init after MCP call

Examples:
  node cli.js create Projects/Voice/gtm.md
  node cli.js push Projects/Voice/gtm.md
  node cli.js pull Projects/Voice/gtm.md
  node cli.js init BACKLOG.md 5921931465
    `);
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case 'create':
      if (args.length < 2) error('Usage: create <file-path> [--classic]');
      createCommand(args[1], { classic: args.includes('--classic') });
      break;

    case 'complete-create':
      if (args.length < 2) error('Usage: complete-create <response.json>');
      completeCreateCommand(args[1]);
      break;

    case 'push':
      if (args.length < 2) error('Usage: push <file-path> [--force]');
      pushCommand(args[1], { force: args.includes('--force') });
      break;

    case 'complete-push':
      if (args.length < 2) error('Usage: complete-push <update-response.json> [<conflict-response.json>]');
      completePushCommand(args[1], args[2]);
      break;

    case 'pull':
      if (args.length < 2) error('Usage: pull <file-path>');
      pullCommand(args[1]);
      break;

    case 'complete-pull':
      if (args.length < 2) error('Usage: complete-pull <response.json>');
      completePullCommand(args[1]);
      break;

    case 'init':
      if (args.length < 3) error('Usage: init <file-path> <page-id>');
      initCommand(args[1], args[2]);
      break;

    case 'complete-init':
      if (args.length < 2) error('Usage: complete-init <response.json>');
      completeInitCommand(args[1]);
      break;

    default:
      error(`Unknown command: ${command}`);
  }
}

// Run the CLI
main();
