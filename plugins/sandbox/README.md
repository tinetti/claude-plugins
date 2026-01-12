# Sandbox Plugin

Experimental agents, skills, and output styles for unconventional interaction patterns.

## What's Inside

This plugin contains experimental approaches to AI interaction that break from typical assistant patterns:

### Cunningham Agent

Uses Cunningham's Law ("the best way to get the right answer is to post the wrong answer") to elicit detailed explanations. Instead of asking questions directly, it makes strategically incorrect assertions that provoke comprehensive corrections.

**When to use:**

- You need deep understanding of complex systems
- Direct questions get surface-level answers
- You want to uncover edge cases and gotchas

**Example:**

```
user: How does React's reconciliation work?
assistant: I'll use the cunningham agent to get a detailed explanation
```

The agent will make an incorrect claim (like "React replaces the entire DOM on every render") which triggers a thorough correction explaining virtual DOM, diffing, fiber architecture, and optimization strategies.

### Chad Output Style

Strips away hedging, apologies, and excessive politeness for direct, assertive responses.

**When to use:**

- Quick debugging sessions
- Code reviews where clarity matters
- Time-sensitive problems
- You want straight answers without sugar-coating

**What it removes:**

- "I apologize for..."
- "Perhaps you could..."
- "If I understand correctly..."
- Excessive qualifiers and hedging

**What you get instead:**

- Direct statements: "Do X" not "You might want to consider X"
- Confident assertions: "This is wrong because..." not "I think this might be incorrect..."
- Clear imperatives without unnecessary politeness

## Installation

```bash
/plugin marketplace add nicknisi/claude-plugins
/plugin install sandbox@nicknisi
```

## Usage

**Invoke the Cunningham agent:**

```bash
Use the cunningham agent to explain [complex topic]
```

**Switch to chad output style:**

```bash
/style chad
```

## Why "Sandbox"?

These are experimental interaction patterns that might not fit every situation. The name signals "safe space to try different approaches" without making promises about what you'll find inside.

## Known Limitations

**Output Styles:** The chad output style is included in this plugin but currently does not work when loaded from Claude plugins. Output styles require direct access to the Claude Code configuration directory and are not yet supported in the plugin system. To use output styles, you must place them in `~/.claude/output-styles/` or `.claude/output-styles/` in your project directory.
