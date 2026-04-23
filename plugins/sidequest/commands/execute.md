---
name: execute
description: Resume a parked side quest — loads the handoff doc from the Obsidian vault and restores full context
argument-hint: [slug-substring — optional, prompts if omitted]
allowed-tools: Bash(ls:*), Bash(pwd:*), Bash(echo:*), Bash(grep:*), Bash(head:*), Read, Edit, mcp__plugin_sidequest_omnifocus-enhanced__*
---

# Execute Side Quest

**Target:** $ARGUMENTS

## Context snapshot (pre-computed)

- **CWD:** !`pwd`
- **Vault path:** !`echo "${OBSIDIAN_VAULT:-$HOME/Notes}"`
- **Available side quests (newest first, up to 20):**

!`ls -1t "${OBSIDIAN_VAULT:-$HOME/Notes}/!Sidequests/" 2>/dev/null | head -20 || echo "(none — the directory is empty or does not exist)"`

## Task

Resume a parked side quest. Rehydrate its context so this fresh session can pick up exactly where the previous one parked.

## Workflow

### 1. Pick the file

If the available list is empty, respond `No parked side quests.` and stop. Do not proceed to later steps.

**If `$ARGUMENTS` is empty:** show the available list (above) to the user and ask which to resume. Accept slug substring, date, or repo+date.

**If `$ARGUMENTS` is set:** substring-match (case-insensitive) against the available list.

- Exactly one match → use it
- Multiple matches → show them and ask the user to pick
- No matches → say so and show the 5 most recent

### 2. Load the handoff

Read the full file with the Read tool. Parse frontmatter into variables: `date`, `repo`, `repo_path`, `cwd`, `seed`, `status`, `slug`.

### 3. Restoration block

Print exactly five lines, nothing more:

```
Resuming: <seed>
  repo:   <repo> (<repo_path>)
  parked: <date>
  goal:   <first line of Goal section>
  next:   <first line of Next step section>
```

**Do not dump the full handoff.** It is loaded into your context already — that is the point.

### 4. Working-directory check

If `repo_path` is set and differs from the pre-computed **CWD** above:

- Flag clearly: `Side quest parked in <repo_path>, current cwd is <CWD>`
- Offer to `cd` there
- **Do NOT cd without confirmation**

### 5. Mark in-progress

Use the Edit tool on the handoff file to change `status: open` to `status: in-progress`. Leave everything else untouched. Do not delete the file — archival is manual.

If `status` is already `in-progress` (re-entering a quest), skip the edit — do not fail on missing `old_string`.

### 6. Close the OmniFocus loop (with confirmation)

Ask the user: "Mark the OmniFocus task complete?"

If yes: use the `omnifocus-enhanced` MCP server to find the task in project `Side Quests` with title = `seed`, and mark it complete. If the task is not found, say so and proceed — do not block.

### 7. Hand over

Context is loaded. Next step is visible. Wait for the user to drive. **Do not auto-execute the next step.**

## Rules

- Restoration block is exactly five lines.
- Never dump the full handoff — it is already in context.
- Confirm before `cd`.
- Do not auto-start work — rehydration is the job; execution is the user's call.
