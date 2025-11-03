# Claude Plugins

My personal collection of Claude Code plugins.

## Using this marketplace

Add this marketplace to Claude Code:

```bash
/plugin marketplace add /Users/nicknisi/Developer/claude-plugins
```

Or if you're setting it up from GitHub:

```bash
/plugin marketplace add nicknisi/claude-plugins
```

Then install plugins:

```bash
/plugin install gpt5-consultant
```

## Plugins

### developer-experience

Tools for the experienced developer experience engineer. Includes specialized agents for:

- **dx-optimizer** - Developer experience specialist for eliminating friction and maximizing velocity
- **dx-sdk-advocate** - SDK design and API usability review
- **typescript-pro** - TypeScript 5.x architecture and type-level programming
- **code-simplifier** - Refactor code for readability and maintainability
- **coder** - Implement features from detailed specifications
- **readme-writer** - Create engaging documentation for open source projects
- **security-agent** - OWASP compliance and vulnerability assessment

### gpt5-consultant

Brings GPT-5 into Claude Code as a consultant via MCP. Useful when you want a second opinion or to leverage GPT-5's specific strengths.

**Requirements:** OpenAI API key with GPT-5 access. Set `OPENAI_API_KEY` in your environment.

**Features:**
- Simple text generation with GPT-5
- Structured conversation support
- Configurable reasoning effort levels
- Token usage reporting

## Development

This is a pnpm workspace with TypeScript project references.

```bash
# Install dependencies
pnpm install

# Type check everything
pnpm run typecheck

# Build all MCP servers
pnpm run build

# Build and sync marketplace metadata
pnpm run build:all
```

### Adding a new plugin

1. Create `plugins/your-plugin/.claude-plugin/plugin.json` with metadata
2. Add components: agents, commands, skills, or MCP servers
3. If adding an MCP server, update `pnpm-workspace.yaml` and root `tsconfig.json`
4. Run `pnpm run sync` to auto-discover and add to marketplace

The sync script scans `plugins/` and automatically discovers all plugins with valid `plugin.json` files. Add a plugin directory and it shows up. Remove one and it disappears.

## Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace registry
├── plugins/
│   └── gpt5-consultant/
│       ├── .claude-plugin/
│       │   └── plugin.json       # Plugin metadata
│       ├── .mcp.json              # MCP server config
│       ├── agents/                # Agent definitions
│       └── mcp-server/            # Node.js MCP server
└── scripts/
    └── sync-marketplace.ts        # Syncs plugin metadata
```

## License

MIT
