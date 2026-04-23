# sidequest

Park conversation tangents without derailing the main thread. Resume later with full context intact.

## Commands

- `/sidequest:capture <seed>` — writes a full-context handoff to the Obsidian vault and creates a linked OmniFocus task
- `/sidequest:execute [slug]` — loads a parked side quest back into a fresh session

## Storage

- **Vault source of record**: `${OBSIDIAN_VAULT:-$HOME/Notes}/!Sidequests/YYYY-MM-DD-{repo}-{slug}.md`
- **OmniFocus review surface**: task in project `Side Quests`, note contains `obsidian://` URL back to the file, tag = repo name
- Flat storage (no per-repo subfolders) — repo is in the filename and frontmatter

## Dependencies

- [OmniFocus](https://www.omnigroup.com/omnifocus/) (macOS) — task manager
- [OmniFocus MCP Enhanced](https://www.npmjs.com/package/omnifocus-mcp-enhanced) — auto-installed via `npx` when the plugin enables (see `.mcp.json`)
- **Obsidian plugin** — this plugin expects the `obsidian` plugin (providing `obsidian-cli` and vault helpers) to be installed separately. There is no formal `dependencies` field in the plugin manifest spec yet; install `obsidian` alongside this one.
- Python 3 — used as a fallback for URL encoding when `obsidian` CLI is unavailable

## Configuration

- `OBSIDIAN_VAULT` — absolute path to your Obsidian vault. Defaults to `$HOME/Notes`.
- OmniFocus project name is hardcoded to `Side Quests`. Change in `commands/capture.md` if preferred.

## Why this shape

Task managers store titles. Filesystems store content. Obsidian stores knowledge. None of them alone solve "park this AI conversation and pick it up later."

- The **file** holds everything a fresh Claude session needs to resurrect the work.
- **OmniFocus** provides the review-and-notification surface so parked quests are not forgotten.
- **Obsidian** is the storage backend because the vault already exists, is indexed, and is searchable alongside the rest of your knowledge graph.
- The OF note contains an `obsidian://` URL, so one tap from the task opens the full handoff.

Deleting the file when truly done closes the loop manually. `execute` marks the OF task complete automatically when invoked (with confirmation).

## Workflow example

```
Main conversation: "…and we should probably also look at whether the caching
layer handles invalidation on multi-region failover, but let's stay focused
on the auth bug first."

You:              /sidequest:capture caching invalidation on multi-region failover

→ Writes: ~/Notes/!Sidequests/2026-04-23-dotfiles-caching-invalidation-on-multi-region-failover.md
→ OmniFocus: new task in "Side Quests" tagged #dotfiles, note links to the file
→ You return to the auth bug immediately

Days later:       /sidequest:execute caching

→ Lists matching files, you pick one
→ Full handoff loaded into context, cwd offered, OF task closed on confirm
→ You pick up as if you never left
```

## Installation

From the marketplace repo root:

```bash
pnpm run sync
```

Then install the plugin in Claude Code (via the marketplace entry).
