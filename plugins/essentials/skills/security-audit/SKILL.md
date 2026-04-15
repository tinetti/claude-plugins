---
name: security-audit
description: >-
  Dispatch the security-auditor agent on the current branch diff with
  pre-gathered context. User-invocable only — does not auto-trigger on
  ambiguous phrasing. Use when you explicitly want a deep vulnerability
  audit of branch changes.
disable-model-invocation: true
---

# Security Audit

Launches the `security-auditor` agent (from this plugin) with pre-loaded
branch context, so the agent does not have to assemble scope itself.

## Pre-gathered Context

<!--
  The `!`-prefix executes the command and injects output before the agent
  is dispatched. Keep these small — the agent will pull full file contents
  itself. These are orientation signals, not exhaustive input.
-->

- Current branch: !`git rev-parse --abbrev-ref HEAD`
- Diff summary vs main: !`git diff main...HEAD --stat`
- Commits on branch: !`git log main..HEAD --oneline`
- PR metadata (if open): !`gh pr view --json title,body,comments 2>/dev/null || echo "no open PR for this branch"`

## Task

Dispatch the `security-auditor` agent via the Task tool with the context
above. Scope the audit to the branch diff shown.

## Output

Report back the agent's findings verbatim. Do not summarize or re-rank —
the agent's Phase 6 output is already the final report format.
