/**
 * Confluence Sync - Helper functions for Claude Code
 *
 * These functions are called by Claude to sync local markdown files with Confluence.
 * They use the Atlassian MCP tools which are only available within Claude Code.
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  cloudId: 'cultureamp.atlassian.net',
  defaultSpaceKey: 'COACHCAMP',
  defaultSpaceId: '5678399576',
};

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, body: content };
  }

  const metadata = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // Remove quotes if present
      metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { metadata, body: match[2].trim() };
}

/**
 * Serialize frontmatter and body to markdown
 */
function serializeFrontmatter(metadata, body) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(metadata)) {
    if (value === null || value === undefined) {
      lines.push(`${key}: null`);
    } else if (typeof value === 'string' && (value.includes(':') || value.includes('#'))) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n') + '\n\n' + body;
}

/**
 * Validate that a file is ready for sync operations
 */
function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontmatter(content);

  return { content, metadata, body };
}

/**
 * Preprocess markdown body before pushing to Confluence
 * Fixes table formatting issues by converting multi-line cells to single-line with <br> tags
 */
function preprocessMarkdownForPush(body) {
  // Strategy: Find table rows that span multiple lines and collapse them
  // Table rows in markdown that have line breaks use "  \n" (two spaces + newline)
  // We need to convert these to <br> tags

  const lines = body.split('\n');
  const processedLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this is a table row (starts with |)
    // Note: May not end with | if it has trailing spaces before newline
    if (trimmed.startsWith('|')) {
      // Collect this row and any continuation lines
      let fullRow = line;
      let j = i + 1;

      // Look ahead for continuation lines (lines that don't start with |)
      while (j < lines.length) {
        const nextLine = lines[j];
        const nextTrimmed = nextLine.trim();

        // If next line is empty, stop
        if (!nextTrimmed) {
          break;
        }

        // If next line starts with |, it's a new row, stop
        if (nextTrimmed.startsWith('|')) {
          break;
        }

        // This is a continuation line - append it to current row
        fullRow += '\n' + nextLine;
        j++;
      }

      // Now normalize the full row by replacing actual newlines with <br>
      const normalizedRow = normalizeTableRow(fullRow);
      processedLines.push(normalizedRow);

      // Skip ahead past the continuation lines we consumed
      i = j;
    } else {
      // Not a table row, keep as-is
      processedLines.push(line);
      i++;
    }
  }

  return processedLines.join('\n');
}

/**
 * Normalize a table row by converting line breaks within cells to <br> tags
 */
function normalizeTableRow(row) {
  // Split by | to get cells
  const cells = row.split('|');

  // Process each cell
  const normalizedCells = cells.map(cell => {
    // Replace any newlines (with or without trailing spaces) with <br>
    return cell.replace(/\s*\n\s*/g, '<br>');
  });

  // Rejoin with |
  return normalizedCells.join('|');
}

/**
 * CREATE - Prepare instructions for creating a new Confluence page
 *
 * Returns an object describing what MCP calls Claude should make
 */
function prepareCreate(filePath, options = {}) {
  const { metadata, body } = validateFile(filePath);

  if (metadata.confluence_page_id) {
    throw new Error(
      `File already linked to Confluence page ${metadata.confluence_page_id}\n` +
      `URL: ${metadata.confluence_url}`
    );
  }

  if (!metadata.title) {
    throw new Error('File must have a title in frontmatter. Add: title: Your Page Title');
  }

  // Preprocess body to fix table formatting
  const processedBody = preprocessMarkdownForPush(body);

  const params = {
    cloudId: CONFIG.cloudId,
    spaceId: CONFIG.defaultSpaceId,
    title: metadata.title,
    body: processedBody,
    contentFormat: 'markdown',
    subtype: 'live' // Default to Live Docs (modern Confluence format)
  };

  // Allow override to regular page if explicitly specified
  if (options.subtype === 'page') {
    delete params.subtype;
  }

  return {
    action: 'create',
    filePath: path.resolve(filePath),
    title: metadata.title,
    body: processedBody,
    mcpCall: {
      tool: 'mcp__atlassian__createConfluencePage',
      params: params
    }
  };
}

/**
 * PUSH - Prepare instructions for pushing local changes to Confluence
 *
 * Returns an object describing what MCP calls Claude should make
 */
function preparePush(filePath, force = false) {
  const { metadata, body } = validateFile(filePath);

  if (!metadata.confluence_page_id) {
    throw new Error(
      'File not linked to Confluence page.\n' +
      'Use: "Create a Confluence page from this file" first.'
    );
  }

  // Preprocess body to fix table formatting
  const processedBody = preprocessMarkdownForPush(body);

  return {
    action: 'push',
    filePath: path.resolve(filePath),
    pageId: metadata.confluence_page_id,
    title: metadata.title,
    body: processedBody,
    lastSynced: metadata.last_synced,
    force: force,
    mcpCalls: [
      // First, check remote version (unless force)
      !force && {
        tool: 'mcp__atlassian__getConfluencePage',
        params: {
          cloudId: CONFIG.cloudId,
          pageId: metadata.confluence_page_id,
          contentFormat: 'markdown'
        },
        purpose: 'conflict_check'
      },
      // Then, update the page
      {
        tool: 'mcp__atlassian__updateConfluencePage',
        params: {
          cloudId: CONFIG.cloudId,
          pageId: metadata.confluence_page_id,
          title: metadata.title,
          body: processedBody,
          contentFormat: 'markdown'
        },
        purpose: 'update'
      }
    ].filter(Boolean)
  };
}

/**
 * PULL - Prepare instructions for pulling Confluence changes to local
 */
function preparePull(filePath) {
  const { metadata } = validateFile(filePath);

  if (!metadata.confluence_page_id) {
    throw new Error(
      'File not linked to Confluence page.\n' +
      'Use: "Link this file to Confluence page <id>" first.'
    );
  }

  return {
    action: 'pull',
    filePath: path.resolve(filePath),
    pageId: metadata.confluence_page_id,
    mcpCall: {
      tool: 'mcp__atlassian__getConfluencePage',
      params: {
        cloudId: CONFIG.cloudId,
        pageId: metadata.confluence_page_id,
        contentFormat: 'markdown'
      }
    }
  };
}

/**
 * INIT - Prepare instructions for linking a local file to an existing Confluence page
 */
function prepareInit(filePath, pageId) {
  validateFile(filePath);

  return {
    action: 'init',
    filePath: path.resolve(filePath),
    pageId: pageId,
    mcpCall: {
      tool: 'mcp__atlassian__getConfluencePage',
      params: {
        cloudId: CONFIG.cloudId,
        pageId: pageId,
        contentFormat: 'markdown'
      }
    }
  };
}

/**
 * Complete the CREATE action after MCP call
 */
function completeCreate(filePath, mcpResponse) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontmatter(content);

  // Update metadata with Confluence info
  metadata.confluence_page_id = mcpResponse.id;
  metadata.confluence_url = `https://${CONFIG.cloudId}/wiki${mcpResponse._links.webui}`;
  metadata.last_synced = mcpResponse.version.createdAt;

  // Write back to file
  fs.writeFileSync(filePath, serializeFrontmatter(metadata, body));

  return {
    success: true,
    pageId: mcpResponse.id,
    url: metadata.confluence_url,
    version: mcpResponse.version.number
  };
}

/**
 * Check for conflicts before push
 */
function checkConflict(localLastSynced, remoteResponse) {
  const remoteModified = remoteResponse.content.nodes[0].lastModified;
  const remoteVersion = remoteModified; // Could parse this properly if needed

  // If we have a last_synced timestamp and remote was modified after that
  if (localLastSynced) {
    const localDate = new Date(localLastSynced);
    // Remote's lastModified is a human-readable string, so we need to check the API response
    // The version.createdAt from the previous response would be more accurate
    // For now, we'll rely on the user to handle this manually

    // Return a warning if there's any indication of recent changes
    if (remoteModified.includes('minute') || remoteModified.includes('hour') || remoteModified.includes('today')) {
      return {
        hasConflict: true,
        message: `Remote page was modified ${remoteModified}. Your last sync was ${localLastSynced}. Consider pulling first.`
      };
    }
  }

  return { hasConflict: false };
}

/**
 * Complete the PUSH action after MCP call
 */
function completePush(filePath, mcpResponse, conflictCheck = null) {
  // If we did a conflict check, handle it
  if (conflictCheck) {
    const conflict = checkConflict(
      parseFrontmatter(fs.readFileSync(filePath, 'utf8')).metadata.last_synced,
      conflictCheck
    );

    if (conflict.hasConflict) {
      return {
        success: false,
        conflict: true,
        message: conflict.message
      };
    }
  }

  // Update the last_synced timestamp
  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontmatter(content);

  metadata.last_synced = mcpResponse.version.createdAt;

  fs.writeFileSync(filePath, serializeFrontmatter(metadata, body));

  return {
    success: true,
    pageId: mcpResponse.id,
    url: `https://${CONFIG.cloudId}/wiki${mcpResponse._links.webui}`,
    version: mcpResponse.version.number
  };
}

/**
 * Complete the PULL action after MCP call
 */
function completePull(filePath, mcpResponse) {
  const currentContent = fs.readFileSync(filePath, 'utf8');
  const { metadata } = parseFrontmatter(currentContent);

  const pageData = mcpResponse.content.nodes[0];

  // Update metadata
  metadata.title = pageData.title;
  metadata.last_synced = new Date().toISOString();
  metadata.confluence_url = pageData.webUrl;

  // Write back with new content
  fs.writeFileSync(filePath, serializeFrontmatter(metadata, pageData.body));

  return {
    success: true,
    pageId: pageData.id,
    url: pageData.webUrl,
    title: pageData.title
  };
}

/**
 * Complete the INIT action after MCP call
 */
function completeInit(filePath, mcpResponse) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontmatter(content);

  const pageData = mcpResponse.content.nodes[0];

  // Update metadata
  metadata.confluence_page_id = pageData.id;
  metadata.confluence_url = pageData.webUrl;
  metadata.last_synced = null; // Not synced yet, just linked

  if (!metadata.title) {
    metadata.title = pageData.title;
  }

  fs.writeFileSync(filePath, serializeFrontmatter(metadata, body));

  return {
    success: true,
    pageId: pageData.id,
    url: pageData.webUrl,
    title: pageData.title
  };
}

module.exports = {
  CONFIG,
  parseFrontmatter,
  serializeFrontmatter,
  validateFile,
  preprocessMarkdownForPush,
  prepareCreate,
  preparePush,
  preparePull,
  prepareInit,
  completeCreate,
  completePush,
  completePull,
  completeInit,
  checkConflict
};
