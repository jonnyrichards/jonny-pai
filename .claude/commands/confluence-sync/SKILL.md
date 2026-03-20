# Confluence Sync Skill

Bidirectional sync between local markdown files and Confluence pages using Atlassian MCP.

## Overview

This skill enables you to sync markdown files in your workspace with Confluence pages. Changes flow both ways:
- **Create**: Create new Confluence Live Doc from local file
- **Push**: Upload local changes to Confluence
- **Pull**: Download Confluence changes to local file
- **Init**: Link existing local file to existing Confluence page

## When to Use This Skill

Trigger this skill when the user asks to:
- "Create a Confluence page from [file]"
- "Push [file] to Confluence"
- "Pull [file] from Confluence"
- "Sync [file] with Confluence"
- "Link [file] to Confluence page [id]"

## Default Settings

- **Space**: COACHCAMP (5678399576)
- **cloudId**: cultureamp.atlassian.net (5b094b66-6935-4e1b-86b0-d4722bcafaf4)
- **Page Type**: Live Doc (modern Confluence format with better collaboration)

New pages are created at the top level of the COACHCAMP space as Live Docs by default.

## Usage Workflow

All operations follow a two-step pattern:
1. **Prepare**: Run CLI to prepare the operation (outputs MCP call details)
2. **Execute & Complete**: Execute the MCP tool call, save response to temp file, run CLI completion command

---

## CREATE - Create new Confluence page

**User says:** "Create a Confluence page from projects/my-project.md"

**Steps:**

1. Run prepare command:
   ```bash
   node .claude/commands/confluence-sync/cli.cjs create projects/my-project.md
   ```

2. Execute the MCP tool call shown in the CLI output:
   ```
   Tool: mcp__atlassian__createConfluencePage
   Params: {
     cloudId: "5b094b66-6935-4e1b-86b0-d4722bcafaf4",
     spaceId: "5678399576",
     title: "...",
     body: "...",
     contentFormat: "markdown",
     subtype: "live"
   }
   ```

3. Save the MCP response to a temp file (e.g., `/tmp/confluence_response.json`)

4. Run completion command:
   ```bash
   node Skills/confluence-sync/cli.cjs complete-create /tmp/confluence_response.json
   ```

**Important:** By default, this creates a **Live Doc** (modern Confluence format). Only use `--classic` flag if user explicitly requests a "classic Confluence page" or "regular Confluence page" (rare).

**Requirements:**
- File must have `title` in frontmatter
- File must NOT already be linked to Confluence (no `confluence_page_id` in frontmatter)

---

## PUSH - Push local changes to Confluence

**User says:** "Push projects/my-project.md to Confluence"

**Steps:**

1. Run prepare command:
   ```bash
   node .claude/commands/confluence-sync/cli.cjs push projects/my-project.md
   ```

2. Execute the MCP tool calls shown in the CLI output (in order):
   - First: `mcp__atlassian__getConfluencePage` (conflict check)
   - Second: `mcp__atlassian__updateConfluencePage` (update content)

3. Save both responses to temp files

4. Run completion command:
   ```bash
   node Skills/confluence-sync/cli.cjs complete-push /tmp/update_response.json
   ```

**Conflict Detection:**
- If remote page was modified since last sync, you'll be warned
- User should pull first to see remote changes, then push again
- Use `--force` flag to skip conflict check (not recommended)

**Requirements:**
- File must be linked to Confluence (has `confluence_page_id` in frontmatter)

---

## PULL - Pull Confluence changes to local

**User says:** "Pull the latest from Confluence for projects/my-project.md"

**Steps:**

1. Run prepare command:
   ```bash
   node .claude/commands/confluence-sync/cli.cjs pull projects/my-project.md
   ```

2. Execute the MCP tool call shown in the CLI output:
   ```
   Tool: mcp__atlassian__getConfluencePage
   ```

3. Save the MCP response to a temp file

4. Run completion command:
   ```bash
   node Skills/confluence-sync/cli.cjs complete-pull /tmp/confluence_response.json
   ```

**Important:** This overwrites local content (intentional, since user initiated pull).

**Requirements:**
- File must be linked to Confluence (has `confluence_page_id` in frontmatter)

---

## INIT - Link file to existing Confluence page

**User says:** "Link projects/my-project.md to Confluence page 5934482147"

**Steps:**

1. Run prepare command:
   ```bash
   node .claude/commands/confluence-sync/cli.cjs init projects/my-project.md 5934482147
   ```

2. Execute the MCP tool call shown in the CLI output:
   ```
   Tool: mcp__atlassian__getConfluencePage
   ```

3. Save the MCP response to a temp file

4. Run completion command:
   ```bash
   node Skills/confluence-sync/cli.cjs complete-init /tmp/confluence_response.json
   ```

**Finding Page IDs:**
Look in the URL: `https://cultureamp.atlassian.net/wiki/spaces/SPACE/pages/123456789/Page+Title`
The number `123456789` is the page ID.

---

## File Format

Local markdown files use frontmatter to track sync metadata:

```yaml
---
title: My Project Plan
confluence_page_id: "5934482147"
confluence_space: "COACHCAMP"
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5934482147"
last_synced: "2026-02-16T05:57:27.983Z"
---

# My Project Plan

Your markdown content here...
```

### Metadata Fields

- `title` - Page title (required for create)
- `confluence_page_id` - Confluence page ID (set after create/init)
- `confluence_space` - Confluence space key (set after create/init)
- `confluence_url` - Direct link to page (set after create/init)
- `last_synced` - ISO timestamp of last successful sync (used for conflict detection)

---

## Content Format

The Atlassian MCP tools support `contentFormat: markdown`, which means:
- ✅ Push markdown directly to Confluence (no conversion needed)
- ✅ Pull content back as clean markdown (not storage format)
- ✅ Bullet lists, headers, bold, links, tables all work natively

**Table Formatting:** The skill automatically preprocesses tables to fix multi-line cell issues by converting line breaks to `<br>` tags.

---

## Examples

### Example 1: Create and push a new project plan

```
User: "Create a Confluence page from projects/q1-goals.md"
Claude: [Runs cli.cjs create, executes MCP, runs complete-create]
        ✅ Page created: https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/...

User: [Makes local edits to projects/q1-goals.md]

User: "Push projects/q1-goals.md to Confluence"
Claude: [Runs cli.cjs push, executes MCP, runs complete-push]
        ✅ Changes pushed successfully
```

### Example 2: Pull remote changes

```
User: "Pull the latest from Confluence for projects/strategy/product-vision.md"
Claude: [Runs cli.cjs pull, executes MCP, runs complete-pull]
        ✅ Remote changes downloaded and saved locally
```

### Example 3: Link to existing page

```
User: "Link this_week.md to Confluence page 5921931465"
Claude: [Runs cli.cjs init, executes MCP, runs complete-init]
        ✅ File linked to existing page
```

---

## Troubleshooting

**Error: File not linked to Confluence page**
- Use create or init first to establish the link
- Check frontmatter for `confluence_page_id`

**Error: File already linked to Confluence page**
- File is already connected, use push/pull instead
- URL is in the frontmatter

**Warning: Remote page modified since last sync**
- Someone edited the page in Confluence
- Pull first to see their changes, then push your changes

**Error: File must have a title in frontmatter**
- Add `title: Your Page Title` to the frontmatter before creating

**Error: Unknown skill: confluence-sync**
- This is expected if using the `Skill` tool
- This is a procedural skill - read this SKILL.md and follow the CLI workflow
- Do NOT try to invoke via the `Skill` tool

---

## Implementation Details

### CLI Commands

The `cli.cjs` provides all operations:

```bash
# Create (Live Doc by default)
node .claude/commands/confluence-sync/cli.cjs create <file-path>
node .claude/commands/confluence-sync/cli.cjs complete-create <response.json>

# Create classic page (rare - only if user explicitly requests)
node .claude/commands/confluence-sync/cli.cjs create <file-path> --classic

# Push
node .claude/commands/confluence-sync/cli.cjs push <file-path>
node .claude/commands/confluence-sync/cli.cjs complete-push <update-response.json>

# Pull
node .claude/commands/confluence-sync/cli.cjs pull <file-path>
node .claude/commands/confluence-sync/cli.cjs complete-pull <response.json>

# Init
node .claude/commands/confluence-sync/cli.cjs init <file-path> <page-id>
node .claude/commands/confluence-sync/cli.cjs complete-init <response.json>
```

### State Management

The CLI saves state to temp files between prepare and complete steps:
- `/tmp/confluence_create_state.json`
- `/tmp/confluence_push_state.json`
- `/tmp/confluence_pull_state.json`
- `/tmp/confluence_init_state.json`

These are automatically cleaned up after successful completion.

### Helper Functions

The `confluence-sync.js` module provides helper functions called by the CLI:
- `prepareCreate()` - Prepares create with `subtype: "live"` by default
- `preparePush()` - Prepares push with conflict check
- `preparePull()` - Prepares pull
- `prepareInit()` - Prepares init
- `completeCreate()` - Updates local file metadata after create
- `completePush()` - Updates last_synced after push
- `completePull()` - Overwrites local file with remote content
- `completeInit()` - Updates local file metadata after init
- `preprocessMarkdownForPush()` - Fixes table formatting for Confluence

---

## Known Limitations

- Only syncs to COACHCAMP space (configurable in `confluence-sync.js`)
- No batch operations (sync one file at a time)
- No merge conflict resolution (simple overwrite model)
- Conflict detection is basic (timestamp comparison only)

These limitations keep the tool simple and focused. They can be extended later if needed.

---

## Quick Reference for Claude

**When user asks to sync with Confluence:**

1. **Determine the operation**: create, push, pull, or init
2. **Run the prepare command**: `node .claude/commands/confluence-sync/cli.cjs <operation> <file-path>`
3. **Execute the MCP tool call(s)** shown in the CLI output
4. **Save the MCP response(s)** to temp files (e.g., `/tmp/confluence_response.json`)
5. **Run the complete command**: `node .claude/commands/confluence-sync/cli.cjs complete-<operation> <response.json>`

**Default to Live Docs:** Always create Live Docs unless user explicitly says "classic" or "regular" page.

**Don't improvise:** Follow the CLI workflow exactly. Don't call MCP tools directly without the CLI wrapper - you'll miss important logic like Live Doc defaults, table preprocessing, and conflict detection.
