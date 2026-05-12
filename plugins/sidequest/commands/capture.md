---
name: capture
description: Park the current tangent as a side quest — writes a full-context handoff to the Obsidian vault and creates a linked OmniFocus task
argument-hint: <seed — short description of the tangent>
allowed-tools: Bash(git:*), Bash(date:*), Bash(basename:*), Bash(pwd:*), Bash(echo:*), Bash(mkdir:*), Bash(ls:*), Bash(python3:*), Bash(obsidian:*), Bash(command:*), Write, mcp__plugin_sidequest_omnifocus-enhanced__*
---

# Capture Side Quest

**Seed:** $ARGUMENTS

## Context snapshot (pre-computed)

- **Date:** !`date +%Y-%m-%d`
- **CWD:** !`pwd`
- **Repo root:** !`git rev-parse --show-toplevel 2>/dev/null || echo ""`
- **Repo name:** !`git rev-parse --show-toplevel 2>/dev/null | xargs -I{} basename {} 2>/dev/null || echo general`
- **Vault path:** !`echo "${OBSIDIAN_VAULT:-$HOME/Notes}"`
- **Vault name:** !`basename "${OBSIDIAN_VAULT:-$HOME/Notes}"`
- **Obsidian CLI available:** !`command -v obsidian >/dev/null 2>&1 && echo yes || echo no`

## Task

Park the tangent described by the seed so it can be resumed later without losing context. Use the pre-computed values above — do not re-run those commands.

**Do not ask follow-up questions.** Capture from what's already in the conversation. Thin context produces a thin doc, and that is the user's signal to seed better next time.

## Workflow

### 1. Compute the slug

- Seed-slug: lowercase the seed, strip non-alphanumerics (spaces → hyphens), collapse repeated hyphens, trim to at most 6 words.
- Full slug: `{Date}-{Repo name}-{seed-slug}`
- Filename: `{slug}.md`

If `{Vault path}/!Sidequests/{filename}` already exists (same seed captured twice in one day), append `-2`, `-3`, … until the filename is free. Update `slug` in frontmatter to match.

### 2. Synthesize the handoff

Extract from the conversation. Better to over-capture than under-capture — this file is the only thing a fresh session will have.

Frontmatter:

```yaml
---
date: { Date }
repo: { Repo name }
repo_path: { Repo root or "" }
cwd: { CWD }
seed: '<original $ARGUMENTS>'
status: open
slug: { full slug, no .md }
---
```

Body sections in order:

- `# <Seed as title>`
- `## Goal` — one or two sentences on what the side quest accomplishes
- `## Why it matters` — why it came up; stakeholder, incident, or deadline context
- `## Context` — what was being discussed in the main thread when this tangent appeared
- `## Code pointers` — every file/symbol referenced, as `path/to/file:line — what matters here`
- `## Considered approaches` — options discussed with tradeoffs (omit section if none)
- `## Open questions` — unresolved decisions
- `## Next step` — first concrete executable action when resuming

### 3. Write the file

Ensure target dir exists: `mkdir -p "{Vault path}/!Sidequests"`.
Write to `{Vault path}/!Sidequests/{filename}` using the Write tool.

### 4. Build the Obsidian URL

If **Obsidian CLI available** is `yes`, run `obsidian uri "{Vault path}/!Sidequests/{filename}"` and use its output.

Otherwise build manually:

```bash
ENC_VAULT=$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))' "{Vault name}")
ENC_FILE=$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))' "!Sidequests/{full slug}")
URL="obsidian://open?vault=${ENC_VAULT}&file=${ENC_FILE}"
```

### 5. Create the OmniFocus task

Use the `omnifocus-enhanced` MCP server.

- **Title:** the raw seed (readable, not slugged)
- **Note:** the Obsidian URL on line 1, blank line, then a 1–2 sentence summary lifted from the Goal section
- **Project:** `Side Quests` — create if missing
- **Tag:** `{Repo name}` — create if missing (enables per-repo review later)

If project/tag creation requires separate calls, do that first.

### 6. Report back

Four lines, nothing more:

```
Parked: <seed>
File: <absolute path to markdown>
OmniFocus: "<seed>" in "Side Quests" #<repo name>
<obsidian:// URL>
```

Do not dump the handoff contents into the response — the point of parking is to get back to the main thread.

## Rules

- No follow-up questions.
- Use the pre-computed context values; do not re-run `git`, `date`, `pwd`, `basename`, or `echo`.
- Write the file before the OF task — the task references the file.
- Repo comes from `pwd`, not from repo names mentioned in the conversation (unless the seed explicitly overrides).
