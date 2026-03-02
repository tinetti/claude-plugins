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

#### 🧹 Code Simplifier Agent

Refactor code to improve readability, reduce complexity, and enhance maintainability without altering functionality.

**When to use:**

- Simplifying complex logic with nested conditionals
- Removing code redundancy
- Improving naming conventions
- Extracting methods from large functions
- Removing AI-generated "slop" patterns

**Features:**

- Preserves all public APIs and external behavior
- Reduces complexity through early returns and simpler conditionals
- Eliminates redundant code and applies DRY principles
- Improves naming to reveal intent
- Removes unnecessary defensive checks and type workarounds
- Extracts smaller, focused methods from large functions
- Removes dead code and clarifies logic flow

**What it removes:**

- Extra comments inconsistent with codebase style
- Excessive try/catch blocks in trusted codepaths
- Type casts to `any` that work around issues
- Style inconsistencies within files

**Example:**

```
You: "This function is hard to read, can you simplify it?"
Claude: *code-simplifier agent refactors while preserving behavior*
```

#### 🔐 Security Auditor Agent

Find critical vulnerabilities through invariant-binding analysis across trust boundaries.

**When to use:**

- Explicit security audit requests
- Penetration testing preparation
- Vulnerability assessments
- Pre-deployment security review

**Not for:** General code review — only dedicated security analysis.

**Features:**

- 6-phase methodology (Context → Threat Model → Hypotheses → Testing → Validation → Output)
- Invariant-binding analysis across trust boundaries
- Subagent deployment for coverage and bias reduction
- Built-in anti-hallucination rules
- Detection heuristics for auth bypass, IDOR, injection, race conditions

**What it finds:**

- Authentication/authorization bypass
- IDOR and access control flaws
- Injection vulnerabilities (SQL, command, template)
- Trust boundary violations
- State and race conditions

**What it ignores:**

- Low-severity issues (open redirects, CSS injection)
- Bugs requiring attacker to guess UUIDs
- Issues outside the threat model

**Example:**

```
You: "Run a security audit on src/api/"
Claude: *security-auditor agent performs 6-phase analysis, reports critical findings*
```

### Skills

#### `/essentials:ultrathink` - Deep Thinking Mode

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
/essentials:ultrathink Design a plugin system for this application
```

#### `/essentials:init-ultrathink` - Initialize CLAUDE.md

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
/essentials:init-ultrathink This is a Next.js e-commerce application
```

The command orchestrates five specialized agents:

1. **Repository Analyst** - Structure, tech stack, architecture
2. **Context Gatherer** - Conventions, workflows, abstractions
3. **Documentation Agent** - Existing docs and implicit knowledge
4. **Testing Agent** - Test patterns and quality gates
5. **Git History Analyst** - Evolution, decisions, common issues

#### `/essentials:de-slopify` - Remove AI Code Slop

Remove AI-generated code slop from your current branch by comparing against a base branch.

**When to use:**

- After AI-assisted coding sessions
- Before code review
- When code feels over-engineered or inconsistent

**What it removes:**

- Unnecessary comments that a human wouldn't add
- Excessive defensive checks or try/catch blocks
- Type casts to `any` that work around issues
- Style inconsistencies with the rest of the file

**Example:**

```bash
/essentials:de-slopify main
```

#### `/essentials:pr` - Create Pull Request

Create a pull request with a structured template.

**When to use:**

- Ready to open a PR for your branch
- Want consistent PR formatting

**Features:**

- Auto-creates feature branch (`nicknisi/${feature}`) if on `main`
- Enforces concise titles (< 72 chars)
- Structured body template

**Template includes:**

- Summary (1-3 bullets on what changed)
- Why (context for the change)
- Notes (optional reviewer info)

**Process:**

1. Analyzes `git status` and `git log` for branch changes
2. Drafts title and body following template
3. Creates PR via `gh pr create`
4. Returns PR URL

**Example:**

```bash
/essentials:pr
```

#### `/essentials:final-review` - Comprehensive PR Review & Testing

Multi-agent PR review that catches consistency issues, code smells, and defensive code problems before merge.

**When to use:**

- Before merging any PR
- After completing a feature branch
- When you want thorough automated review

**What it does:**

1. **Determines review pass** - Checks git history to see if this is a follow-up review
2. **Creates/updates PR** - Ensures changes are on a feature branch with a PR
3. **Launches 3 parallel review agents:**
   - **Codebase Consistency Reviewer** - Finds duplication, checks for similar patterns that need the same fix
   - **SOLID & Clean Code Reviewer** - Uncle Bob's principles, method decomposition, abstraction levels
   - **Defensive Code Auditor** - Catches error swallowing, silent fallbacks, debugging-hostile patterns
4. **Reconciles recommendations** - Applies most suggestions, handles conflicts intelligently
5. **Runs comprehensive tests** - Auto-detects stack, runs lint/typecheck/unit/integration tests
6. **Pushes and summarizes** - Documents what was applied, skipped, and tested

**Stack detection:**

Automatically detects your project stack from manifest files (`package.json`, `Gemfile`, `pyproject.toml`, `go.mod`, `Cargo.toml`, etc.) and runs appropriate tooling.

**CLAUDE.md integration:**

For best results, define in your project's CLAUDE.md:

- Test commands (`npm test`, `pytest`, etc.)
- Lint/typecheck commands
- Test credentials (for integration tests)
- Dev server URL/port (for browser testing)

**Example:**

```bash
/essentials:final-review
```

**Output includes:**

- Review pass number (tracks iterative reviews)
- Changes applied from each agent
- Recommendations skipped with reasoning
- Test coverage summary
- Recommendation on whether another pass is needed

## Installation

Add this marketplace to Claude Code:

```bash
/plugin marketplace add nicknisi/claude-plugins
```

Then install the essentials plugin:

```bash
/plugin install essentials@nicknisi
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
You: "/essentials:ultrathink How should we architect this microservices system?"
Claude: *engages ultrathink mode, questions assumptions, crafts elegant solution*
```

### Initialize Project Documentation

```
You: "/essentials:init-ultrathink"
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

### Skill Configuration

Skills are defined as `SKILL.md` files in named directories under `skills/`:

```markdown
---
description: Skill description
disable-model-invocation: true
---

Skill prompt and instructions...
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
