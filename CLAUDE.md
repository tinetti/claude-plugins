# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal Claude Code plugin marketplace - a pnpm monorepo that packages and distributes custom plugins for Claude Code. The repository includes agents, skills, and MCP servers that extend Claude's capabilities.

## Essential Commands

```bash
# Install all dependencies (pnpm workspace)
pnpm install

# Type check entire workspace (uses TypeScript project references)
pnpm run typecheck

# Build all MCP servers (bundles with esbuild)
pnpm run build

# Sync marketplace metadata (auto-discovers plugins)
pnpm run sync
```

## Architecture

### Plugin Auto-Discovery System

The marketplace uses **convention-based discovery** instead of manual registration:

1. **Sync script** (`scripts/sync-marketplace.ts`):
   - Scans `plugins/` directory
   - Finds directories with `.claude-plugin/plugin.json`
   - Extracts metadata and generates `marketplace.json`
   - Add/remove plugin directories → run `pnpm run sync` → marketplace updates

2. **No manual registration needed**: The `marketplace.json` is fully generated. Never edit it directly.

### Plugin Structure Patterns

All plugins follow this structure:

```
plugins/{plugin-name}/
├── .claude-plugin/
│   └── plugin.json          # Required: metadata
├── .mcp.json                # Optional: MCP server config
├── agents/*.md              # Optional: agent definitions
├── skills/*/SKILL.md        # Optional: skill definitions
├── commands/*.md            # Optional: slash commands
└── mcp-server/              # Optional: custom MCP server
    ├── src/
    ├── build/               # TypeScript output (tsc)
    └── dist/                # Bundled output (esbuild)
```

**Four plugin types in this repo:**

1. **Agent-only** (`developer-experience`): Agents in markdown files, no MCP server
2. **Custom MCP server** (`gpt5-consultant`): Node.js MCP server with bundled distribution
3. **External MCP server** (`workos`): Uses `npx` to run published MCP server
4. **Skills-only** (`content`): Skills and reference documents, no agents or MCP

### MCP Server Integration

**Pattern 1: Custom Node.js MCP Server**

- Location: `plugins/{name}/mcp-server/`
- Build: TypeScript → `build/` (dev) and esbuild → `dist/` (distribution)
- Config: `.mcp.json` with `${CLAUDE_PLUGIN_ROOT}` for path resolution
- Example: `gpt5-consultant`

```json
// .mcp.json for custom server
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/dist/index.js"],
      "env": {
        "API_KEY": "${API_KEY}" // User's environment variable
      }
    }
  }
}
```

**Pattern 2: External MCP Server**

- Uses `npx` to install and run published package
- No local mcp-server directory needed
- Example: `workos` uses `@context7/mcp-server`

```json
// .mcp.json for external server
{
  "mcpServers": {
    "context7-workos": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"],
      "env": {
        "CONTEXT7_LIBRARY": "workos"
      }
    }
  }
}
```

### pnpm Workspace Architecture

**Workspace configuration** (`pnpm-workspace.yaml`):

```yaml
packages:
  - 'plugins/*/mcp-server'
```

This auto-discovers all MCP server packages. Benefits:

- Shared dependency management
- Parallel builds: `pnpm -r run bundle`
- Filtered operations: `pnpm -r --filter './plugins/**/mcp-server' run bundle`

**TypeScript project references** (`tsconfig.json`):

```json
{
  "references": [
    { "path": "./scripts" },
    { "path": "./plugins/gpt5-consultant/mcp-server" }
  ]
}
```

Add new MCP server → Update both files → Run `pnpm install`

## Adding a New Plugin

### 1. Create Plugin Directory Structure

```bash
mkdir -p plugins/my-plugin/.claude-plugin
```

### 2. Create `plugin.json` (Required)

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Plugin description",
  "author": {
    "name": "Nick Nisi",
    "email": "nick@nisi.org"
  },
  "keywords": ["optional"],
  "category": "optional"
}
```

### 3. Add Components (Optional)

**Agents** (`agents/*.md`):

```markdown
---
name: agent-name
description: Agent description
tools: Read, Write, Bash
model: sonnet
color: cyan
---

Agent prompt content...
```

**Skills** (`skills/skill-name/SKILL.md`):

```markdown
---
name: skill-name
description: Skill description
---

Skill instructions...
```

**Custom MCP Server** (`mcp-server/`):

- Copy structure from `plugins/gpt5-consultant/mcp-server/`
- Update `pnpm-workspace.yaml` (if pattern doesn't match)
- Add to root `tsconfig.json` references
- Create `.mcp.json` in plugin root
- Use `${CLAUDE_PLUGIN_ROOT}` for paths

**External MCP Server**:

- Create `.mcp.json` with `npx` command
- No mcp-server directory needed

### 4. Sync Marketplace

```bash
pnpm run sync
```

The sync script auto-discovers the new plugin and adds it to `marketplace.json`.

## MCP Server Development

### Building MCP Servers

**Development build** (for local testing):

```bash
cd plugins/{plugin-name}/mcp-server
pnpm run build  # TypeScript → build/
```

**Distribution build** (for plugin users):

```bash
cd plugins/{plugin-name}/mcp-server
pnpm run bundle  # esbuild → dist/ (bundled, no node_modules needed)
```

**Workspace build** (all MCP servers):

```bash
pnpm run build  # Runs bundle in all mcp-server packages
```

### MCP Server Path Resolution

**Critical**: Use `${CLAUDE_PLUGIN_ROOT}` in `.mcp.json` for directory-based marketplaces:

```json
"args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/dist/index.js"]
```

Without this, Claude Code can't resolve relative paths to the plugin installation directory.

### Environment Variables

MCP servers can access user environment variables:

```json
"env": {
  "API_KEY": "${API_KEY}"  // Pulls from user's shell environment
}
```

Users must export variables in their shell config (`.zshrc`, `.bashrc`) for MCP servers to access them.

## Plugin Metadata

The sync script extracts these fields from `plugin.json`:

**Required:**

- `name` - Plugin identifier (kebab-case)
- `version` - Semantic version
- `description` - Brief description
- `author` - Object with `name` and `email`

**Optional:**

- `keywords` - Array of search terms
- `category` - Plugin category
- `homepage` - Project URL
- `repository` - Git repository
- `license` - License identifier

All fields are auto-synced to `marketplace.json`. Edit `plugin.json`, never `marketplace.json`.

## Project Type: ESM-Only

All packages use `"type": "module"` in package.json. This is a pure ESM monorepo:

- Use `import/export` syntax
- File extensions required in imports: `./utils.js` not `./utils`
- No `require()` or `module.exports`

## Hidden Context

### Why Two Build Outputs?

MCP servers have dual build processes:

1. **`build/`** (TypeScript compiler):
   - Source maps and type declarations
   - Used during development
   - Keeps imports separate for debugging

2. **`dist/`** (esbuild):
   - Single bundled file with all dependencies
   - No node_modules needed by users
   - What `.mcp.json` references
   - Must be committed to git

### Marketplace Installation Modes

Claude Code supports two installation modes:

1. **Directory-based** (this repo):
   - `/plugin marketplace add /Users/nicknisi/Developer/claude-plugins`
   - Loads plugins directly from source directory
   - Changes take effect immediately (no reinstall needed)
   - Requires `${CLAUDE_PLUGIN_ROOT}` in paths

2. **Git-based**:
   - `/plugin marketplace add nicknisi/claude-plugins`
   - Claude Code clones repo to user's config
   - Requires git commits to update

### Sync Script Behavior

The sync script (`scripts/sync-marketplace.ts`) **replaces** the entire `plugins` array in `marketplace.json`:

- Add plugin directory → appears after sync
- Delete plugin directory → disappears after sync
- Rename plugin directory → old entry removed, new entry added
- No manual marketplace maintenance needed

### Why esbuild Bundle Size Matters

The `gpt5-consultant` MCP server bundles to ~214KB because:

- All npm dependencies are included
- Users don't need to run `npm install`
- Server works immediately after plugin installation
- No version conflicts with other plugins

Without bundling, users would need `node_modules/` (risky and error-prone).

## Common Issues

### MCP Server Won't Start

1. **Check environment variables**: MCP servers inherit from shell, not interactive sessions
   - Export in `.zshenv` (all shells) not just `.zshrc` (interactive only)
   - Verify: `zsh -c 'echo $VAR_NAME'`

2. **Check paths**: Use `${CLAUDE_PLUGIN_ROOT}` for all plugin-relative paths

3. **Check bundle**: Ensure `dist/index.js` exists and is committed

### Plugin Not Appearing in Marketplace

1. **Missing `plugin.json`**: Must be at `.claude-plugin/plugin.json`
2. **Invalid JSON**: Check for syntax errors
3. **Forgot to sync**: Run `pnpm run sync`

### TypeScript Errors After Adding MCP Server

1. **Update workspace**: Add to `pnpm-workspace.yaml` if pattern doesn't match
2. **Update references**: Add to root `tsconfig.json` references array
3. **Run install**: `pnpm install` to link workspace packages
