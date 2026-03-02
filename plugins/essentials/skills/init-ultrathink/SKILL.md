---
description: 'Initialize a comprehensive CLAUDE.md using ultrathink methodology: /init-ultrathink [optional-context]'
disable-model-invocation: true
---

# Initialize CLAUDE.md with Ultrathink

## Usage

`/essentials:init-ultrathink [optional context about the project]`

## Context

- Project context: $ARGUMENTS
- This command creates a comprehensive CLAUDE.md file by analyzing the repository with multiple specialized agents

## Your Role

You are the Coordinator Agent orchestrating specialized sub-agents to create a comprehensive CLAUDE.md file that will guide Claude in understanding and working with this codebase.

## Sub-Agents

1. **Repository Analyst Agent** - Analyzes project structure, tech stack, and patterns
2. **Context Gatherer Agent** - Identifies key abstractions, workflows, and conventions
3. **Documentation Agent** - Extracts insights from existing docs and comments
4. **Testing Agent** - Analyzes test patterns and quality standards
5. **Git History Analyst Agent** - Examines repository evolution and historical patterns

## Process

### Phase 1: Repository Analysis (Repository Analyst Agent)

1. **Project Structure Analysis** - Project type, directory structure, build tools, config files, entry points, naming patterns
2. **Tech Stack Detection** - Languages, frameworks, dev tools, databases, external services, cloud platforms
3. **Architecture Patterns** - Design patterns, module boundaries, data flow, state management, security layers

### Phase 2: Context Discovery (Context Gatherer Agent)

1. **Coding Conventions** - Naming, style guides, import patterns, error handling, logging
2. **Development Workflows** - Git workflow, local dev setup, build processes, testing, deployment
3. **Key Abstractions** - Domain models, utilities, components, auth patterns, service boundaries

### Phase 3: Documentation Mining (Documentation Agent)

1. **Existing Documentation** - READMEs, API docs, ADRs, code comments, changelogs
2. **Implicit Knowledge** - Complex algorithms, performance optimizations, security considerations, known issues, workarounds

### Phase 4: Quality Standards (Testing Agent)

1. **Testing Patterns** - Frameworks, organization, coverage, mocking, fixtures
2. **Quality Gates** - Linting, type checking, CI/CD, code review, merge criteria

### Phase 5: Git History Analysis (Git History Analyst Agent)

1. **Repository Evolution** - Milestones, growth patterns, migrations, deprecated features
2. **Commit Patterns** - Conventions, code ownership, hot spots, branching strategies
3. **Architectural Evolution** - Major changes, pattern adoptions, technology stack changes
4. **Issue and Bug Patterns** - Common fixes, recurring issues, regression patterns

## Ultrathink Reflection Phase

Synthesize all gathered information into a comprehensive CLAUDE.md. Adapt sections to the project type:

### Core Sections (Always Include)

1. **Repository Overview** - What the project is and does
2. **Quick Start** - How to get up and running
3. **Essential Commands** - Most important commands
4. **Architecture/Key Concepts** - Core understanding needed
5. **Project Structure** - Directory layout
6. **Important Patterns** - Key conventions to follow
7. **Code Style** - Naming and formatting standards
8. **Hidden Context** - Non-obvious but crucial info

### Adaptive Sections (Include When Relevant)

Based on project type, include relevant sections: API endpoints, frontend/backend architecture, state management, deployment, monitoring, CLI reference, service boundaries, data models, contributing guidelines, etc.

## Output Guidelines

- Be comprehensive — this document is for an AI agent, not humans
- Include ALL discovered patterns, conventions, and workflows
- Make all commands copy-pasteable
- Provide specific file paths whenever possible
- Include historical context and architectural decisions
- Document workarounds and technical debt honestly
- Select only relevant sections that add value for this specific project
- Aim for completeness without redundancy

## Final Steps

1. Show the generated CLAUDE.md for review
2. Make any requested adjustments
3. Save the file to the repository root
4. Remind user to commit when satisfied
