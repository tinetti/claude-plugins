# WorkOS Plugin

Enterprise authentication and SSO integration toolkit for WorkOS.

## What's included

**Agent:**

- `workos-specialist` - Expert guidance on AuthKit, SSO, Directory Sync, and multi-tenant patterns

**MCP Server:**

- Context7 configured for WorkOS documentation - Always has access to the latest WorkOS API docs

## Use cases

- Implementing WorkOS AuthKit for authentication
- Setting up enterprise SSO (SAML/OIDC)
- Building multi-tenant applications with Organizations
- Configuring Directory Sync for user provisioning
- Debugging authentication flows
- Migrating from other auth providers

## Installation

```bash
/plugin marketplace add nicknisi/claude-plugins
/plugin install workos@nicknisi
```

The plugin bundles the WorkOS specialist agent with context7 MCP pre-configured for WorkOS docs, so the agent always has current API reference available.

## Usage

Ask the workos-specialist agent for help with WorkOS integration:

- "How do I set up AuthKit for a Next.js app?"
- "What's the best way to implement SSO for enterprise customers?"
- "Help me debug this WorkOS webhook verification"

The agent will fetch the latest documentation automatically when needed.
