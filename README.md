# Claude Plugins

My personal collection of Claude Code plugins.

## Using this marketplace

Add this marketplace to Claude Code:

```bash
/plugin marketplace add nicknisi/claude-plugins
```

Then install plugins:

```bash
/plugin install consultant@nicknisi
```

## Plugins

- [consultant](plugins/consultant/README.md) - Multi-model AI consultation and research with GPT-5/Codex, Gemini, Grok, Perplexity, and Claude (supports both single-agent consultation and parallel multi-agent research)
- [content](plugins/content/README.md) - Tools for bootstrapping content creation
- [developer-experience](plugins/developer-experience/README.md) - Tools for the experienced developer experience engineer
- [essentials](plugins/essentials/README.md) - Core productivity tools and workflows for Claude Code
- [ideation](plugins/ideation/README.md) - Transform brain dumps into structured contracts, phased PRDs, and implementation specs
- [sandbox](plugins/sandbox/README.md) - Experimental agents, skills, and output styles for unconventional interaction patterns
- [spec-driven](plugins/spec-driven/README.md) - Transform specifications into executable code with validation-driven development
- [workos](plugins/workos/README.md) - Enterprise authentication and SSO integration toolkit

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

## License

MIT
