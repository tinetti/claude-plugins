# Essentials Plugin

Essential agents, commands, and tools for enhanced Claude Code workflows.

## Overview

The Essentials plugin provides foundational capabilities that improve how you work with Claude Code. It includes specialized agents for common development tasks, commands for deep thinking and project initialization, and tools for managing complex workflows.

## What's Included

### Agents

#### 🔬 Researcher Agent

Proactively research documentation, APIs, frameworks, and best practices.

**When to use:**

- Looking up API documentation
- Finding framework usage examples
- Researching best practices
- Understanding how technologies work

**Example:**

```
You: "How does the Stripe API work for payments?"
Claude: *automatically engages researcher agent*
```

The researcher agent:

- Finds authoritative documentation
- Gathers practical examples
- Identifies best practices and anti-patterns
- Provides actionable implementation guidance

**Fast-path responses** for common patterns (React hooks, JWT auth, database connections, etc.) provide instant, validated answers.

#### 🎯 Git Committer Agent

Create semantic commits with proper formatting and pre-commit hook handling.

**When to use:**

- Creating well-structured commit messages
- Following semantic commit conventions
- Handling pre-commit hook failures
- Running verification checks before commits

**Features:**

- Semantic commit message format (`feat:`, `fix:`, `refactor:`, etc.)
- Automatic staging of related files
- Pre-commit hook failure handling
- Linting and type checking before commits
- 50-character subject line enforcement
- Detailed body text explaining the "why"

**Example commit:**

```
feat(auth): add OAuth2 integration with Google

Implemented Google OAuth2 authentication flow to allow users
to sign in with their Google accounts. This includes:
- OAuth2 configuration and middleware setup
- User profile synchronization
- Session management with JWT tokens

Closes #123
```

#### 🧠 Context Manager Agent

Manage context across multiple agents and long-running tasks.

**When to use:**

- Projects exceeding 10k tokens
- Transitioning between multiple agents
- Resuming work after breaks
- Coordinating complex multi-agent workflows

**Features:**

- Context capture and compression
- Agent-specific briefings
- Context checkpoints at milestones
- Quick context summaries (< 500 tokens)
- Full context documents (< 2000 tokens)
- Archived historical context

**Example:**

```
You: "We've been working on this authentication system for a while,
     and I need to bring in the database specialist agent"
Claude: *uses context-manager to prepare a focused briefing*
```

### Commands

#### `/ultrathink` - Deep Thinking Mode

Engage deep thinking mode for complex problems that require excellence-driven problem-solving.

**Philosophy:**
Inspired by Steve Jobs' approach to product development - question every assumption, plan meticulously, craft elegant solutions, and iterate relentlessly toward perfection.

**When to use:**

- Complex architectural decisions
- Novel problems requiring creative solutions
- When the first solution isn't good enough
- Situations demanding elegance and simplicity

**What it does:**

1. **Think Different** - Question assumptions, explore alternatives
2. **Obsess Over Details** - Study the codebase deeply, understand patterns
3. **Plan Like Da Vinci** - Create clear, well-reasoned architecture
4. **Craft, Don't Code** - Write elegant, well-named, graceful code
5. **Iterate Relentlessly** - Test, refine, improve until insanely great
6. **Simplify Ruthlessly** - Remove complexity without losing power

**Example:**

```bash
/ultrathink Design a plugin system for this application
```

#### `/init-ultrathink` - Initialize CLAUDE.md

Create a comprehensive CLAUDE.md file by analyzing your repository with multiple specialized agents.

**When to use:**

- Starting work on a new codebase
- Documenting project patterns and conventions
- Creating context for Claude Code
- Onboarding new developers

**What it generates:**

- Repository overview and architecture
- Quick start guide with prerequisites
- Essential commands and workflows
- Project structure with annotations
- Coding conventions and patterns
- Testing approaches
- Hidden context and gotchas
- Historical decisions from git history
- Performance and security considerations

**Example:**

```bash
/init-ultrathink This is a Next.js e-commerce application
```

The command orchestrates five specialized agents:

1. **Repository Analyst** - Structure, tech stack, architecture
2. **Context Gatherer** - Conventions, workflows, abstractions
3. **Documentation Agent** - Existing docs and implicit knowledge
4. **Testing Agent** - Test patterns and quality gates
5. **Git History Analyst** - Evolution, decisions, common issues

## Installation

Add this marketplace to Claude Code:

```bash
/plugin marketplace add /Users/nicknisi/Developer/claude-plugins
```

Then install the essentials plugin:

```bash
/plugin install essentials
```

## Usage Examples

### Research Documentation

```
You: "I need to implement JWT authentication in Node.js"
Claude: *researcher agent provides implementation guide with examples*
```

### Create Semantic Commits

```
You: "Commit these changes"
Claude: *git-committer agent analyzes changes, stages files, creates semantic message*
```

### Manage Complex Projects

```
You: "This project is getting large, let's organize our approach"
Claude: *context-manager compresses and organizes project context*
```

### Deep Problem Solving

```
You: "/ultrathink How should we architect this microservices system?"
Claude: *engages ultrathink mode, questions assumptions, crafts elegant solution*
```

### Initialize Project Documentation

```
You: "/init-ultrathink"
Claude: *orchestrates multiple agents to analyze repo and generate comprehensive CLAUDE.md*
```

## Keywords

`git`, `commit`, `research`, `documentation`, `context-management`, `ultrathink`, `workflow`, `agents`, `initialization`, `best-practices`

## Technical Details

### Agent Configuration

All agents are defined in markdown files with frontmatter:

```markdown
---
name: agent-name
description: Agent description
tools: Read, Write, Bash
model: sonnet
---

Agent prompt and instructions...
```

### Command Configuration

Commands are slash commands defined in markdown:

```markdown
---
description: Command description
---

Command prompt and instructions...
```

### File Structure

## Philosophy

- The Essentials plugin embodies several key principles:
- **Proactive Intelligence** - Agents activate automatically when needed, not just when explicitly requested.
- **Workflow Enhancement** - Every component improves how you work, reducing friction and improving outcomes.
- **Excellence-Driven** - Ultrathink mode encourages craftsmanship over quick fixes.
- **Context Preservation** - Complex projects need context management to maintain coherence.
- **Research-Backed** - Decisions should be informed by authoritative documentation and best practices.
- **Semantic History** - Git commits tell the story of your project's evolution.

## Contributing

This plugin is part of a personal marketplace but contributions are welcome. See the main repository README for contribution guidelines.

## License

MIT
