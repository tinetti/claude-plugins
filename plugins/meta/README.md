# Meta Plugin

Meta-cognitive tools for Claude Code self-improvement. Learn from your corrections, optimize configurations, and evolve your AI development workflow.

## Overview

While most plugins help you build software, the **meta** plugin helps Claude Code improve itself. It operates at a different abstraction level - analyzing feedback, detecting patterns, and updating Skills/agents/CLAUDE.md based on your preferences.

## What's Included

### Skills

#### 📊 Claude Code Analyzer - Workflow Optimization

Comprehensive Claude Code usage analysis, community discovery, and configuration optimization.

**When to use:**

- Setting up Claude Code for a new project
- Optimizing your workflow based on usage patterns
- Finding unused auto-allowed tools
- Discovering community skills/agents/commands
- Creating or improving CLAUDE.md

**What it analyzes:**

1. **Usage Patterns** - Tool frequency, auto-allows vs actual usage, model distribution
2. **GitHub Discovery** - Community skills, agents, commands matching your workflow
3. **Project Structure** - Tech stack detection, missing documentation
4. **Configuration Gaps** - Repetitive commands that should be slash commands, complex workflows needing agents

**Example:**

```
You: "Optimize my Claude Code setup"
Claude: *runs usage analysis*

"You use Bash 150× but it's not auto-allowed (approval friction).
You run 'npm test' frequently → Create /test command.
Your Next.js project needs CLAUDE.md with build commands.
Found community TypeScript testing skill matching your workflow."
```

**Provides:**

- Auto-allow recommendations based on actual usage
- Slash command suggestions for repetitive operations
- Agent recommendations for complex workflows
- CLAUDE.md templates with detected project info
- Links to relevant community resources
- Latest Claude Code documentation when needed

**Activate with:**

```
optimize my claude code setup
analyze my workflow
help me configure claude code
what should I document in CLAUDE.md?
```

#### 🧠 Autoskill - Session Learning

Analyze coding sessions to detect corrections and preferences, then propose targeted improvements to Skills used in the session.

**When to use:**

- After a session with multiple corrections
- When you want Claude to "remember this pattern"
- To codify repeated feedback into durable preferences

**How it works:**

1. **Signal Detection** - Scans session for corrections, patterns, and approvals
2. **Quality Filter** - Applies 4-question test to identify durable preferences
3. **Confidence Scoring** - Weights signals (explicit corrections = 5pts, patterns = 3pts, approvals = 1pt)
4. **Smart Mapping** - Determines whether changes belong in CLAUDE.md or specific Skills
5. **Conflict Resolution** - Handles contradictory signals using recency and explicitness
6. **Targeted Proposals** - Suggests minimal, reversible edits for review

**Example session:**

```
You: "Don't add error handling for internal functions"
Claude: *adds try-catch in utility function*
You: "No, remove that - internal functions don't need try-catch"
Claude: *removes error handling*

Later...
You: "/autoskill"
Claude: "Detected 1 HIGH confidence preference (8 points):

Signal: 'Don't add try-catch for internal functions' (repeated correction)
Target: code-simplifier skill
Proposed: Add rule to 'When NOT to simplify' section

Apply? [y/n]"
```

**Key features:**

- **Weighted scoring** - Not all feedback is equal (explicit > patterns > approvals)
- **CLAUDE.md vs Skills boundary** - Automatically determines where changes belong
- **Conflict resolution** - Handles contradictory signals with priority rules
- **Concrete examples** - Shows before/after changes with scoring
- **Rollback guidance** - All changes are reversible via git
- **Clarification protocol** - Asks questions when uncertain instead of guessing

**Scoring system:**

- Explicit correction with "always/never": 5 points
- Repeated pattern (2+ occurrences): 3 points
- Single correction: 2 points
- Approval/confirmation: 1 point

**Update thresholds:**

- Update existing Skill: ≥ 3 points
- Propose new Skill: ≥ 5 points
- Update CLAUDE.md instead: < 5 points for new skill

**What counts as "new information":**

✅ **Worth capturing:**

- Project-specific conventions ("we use `cn()` not `clsx()` here")
- Custom component/utility locations ("buttons are in `@/components/ui`")
- Team preferences that differ from defaults ("we prefer explicit returns")
- Non-obvious architectural decisions ("auth logic lives in middleware")

❌ **NOT worth capturing:**

- General best practices (DRY, separation of concerns)
- Language/framework conventions (React hooks rules, TypeScript basics)
- Common library usage (standard Tailwind classes)
- Universal security practices

**Activate with:**

```
/autoskill
learn from this session
remember this pattern
update skills from these corrections
```

**Session scope:**

By default, analyzes only the current session. For multi-session pattern detection, explicitly request: "analyze my last 5 sessions" or "look for patterns across this week".

## Philosophy

The meta plugin embodies **self-improvement through feedback**:

- **Learn, Don't Repeat** - Turn corrections into durable preferences
- **Signal Quality Over Quantity** - Explicit corrections > repeated patterns > approvals
- **Clarity Over Assumptions** - Ask questions when uncertain
- **Reversible Changes** - All updates are minimal and git-tracked
- **Context-Aware Mapping** - Distinguish project conventions from skill behavior

## Installation

Add this marketplace to Claude Code:

```bash
/plugin marketplace add tinetti/claude-plugins
```

Then install the meta plugin:

```bash
/plugin install meta@tinetti
```

## Usage Examples

### Optimize Workflow

```
You: "Help me optimize my Claude Code setup"
Claude: *analyzes usage, discovers community resources, suggests configs*
       "Added Bash/Read/Write to auto-allows, created /test command,
        found TypeScript testing skill on GitHub"
```

### Setup New Project

```
You: "I just started working on this Next.js project"
Claude: *runs claude-code-analyzer*
       "Detected: Next.js 14, Vitest, npm scripts: dev/build/test
        Creating CLAUDE.md with project context and commands"
```

### Learn from Session

```
You: "I've been correcting the same thing multiple times today"
You: "/autoskill"
Claude: *analyzes session, proposes skill updates with confidence scores*
```

### Pattern Recognition

```
You: "We always use `cn()` for className merging, not `clsx()`"
Claude: *notes project convention*
You: "/autoskill"
Claude: "Detected HIGH confidence preference (5 points):
         Target: CLAUDE.md (project convention)
         Add: 'Use cn() utility for className merging'"
```

### Conflict Resolution

```
Session 1: "Add error handling everywhere"
Session 3: "Don't add error handling for internal functions"

You: "/autoskill"
Claude: "Detected contradiction. Recent explicit rule (5pts) overrides
         older single correction (2pts). Proposing: Update code-simplifier
         with 'Don't add try-catch for internal functions'"
```

## Future Capabilities

The meta plugin will continue to expand:

- **Performance Analyzer** - Optimize agent selection and model usage based on effectiveness
- **Workflow Insights** - Surface productivity patterns and bottlenecks over time
- **A/B Testing** - Compare different configurations and measure improvement
- **Preference Sync** - Share learned preferences across projects
- **Community Learning** - Aggregate anonymized patterns to suggest proven workflows

## Technical Details

### Skill Structure

Skills are defined in `skills/skill-name/SKILL.md` with YAML frontmatter:

```markdown
---
name: autoskill
description: Analyze coding sessions to detect corrections and preferences...
---

Skill instructions...
```

### Signal Detection Algorithm

1. Scan session for explicit corrections, patterns, approvals
2. Apply quality filter (4 questions)
3. Calculate confidence scores
4. Resolve conflicts using priority rules
5. Map to CLAUDE.md vs specific Skills
6. Present proposals grouped by confidence

### Rollback Process

All autoskill changes are git-tracked:

```bash
# Find autoskill commits
git log --grep="autoskill" --oneline

# Revert specific change
git revert <commit-hash>

# Revert all autoskill changes
git log --grep="autoskill" --format="%H" | xargs -n1 git revert
```

## Contributing

This plugin is part of a personal marketplace but contributions are welcome. See the main repository README for contribution guidelines.

## Keywords

`meta`, `learning`, `self-improvement`, `feedback`, `skills`, `configuration`, `optimization`, `preferences`, `patterns`, `workflow`

## License

MIT
