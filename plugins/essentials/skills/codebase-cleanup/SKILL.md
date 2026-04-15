---
name: codebase-cleanup
description: >-
  Use when the user asks for a comprehensive, codebase-wide quality sweep —
  phrases like "deep clean the whole repo", "run a full codebase audit",
  "nuclear cleanup", "deslop everything", or "sweep the entire codebase for
  quality issues". Dispatches eight subagents covering deduplication, shared
  types, unused code (knip), circular deps (madge), weak types, defensive
  try/catch, deprecated paths, and AI slop. Do NOT use for single-file fixes,
  branch-scoped diffs (use de-slopify instead), or targeted refactors.
disable-model-invocation: true
---

# Codebase Deep Clean

Dispatch 8 subagents to audit and clean the codebase. Each subagent must:
(1) research its domain, (2) write a critical assessment with findings,
(3) implement all high-confidence fixes.

## Pre-flight

- Detect project language(s) from config files (package.json, Cargo.toml, pyproject.toml, go.mod, etc.) and tailor subagent instructions accordingly.
- Identify the test runner and verify tests pass before starting. Abort if tests are already broken.
- Create a working branch: `cleanup/<YYYY-MM-DD>`.
- Exclude generated files, `node_modules`, `dist`, `vendor`, lock files, and any paths listed in `.gitignore`.

## Execution order

Some subagents have dependencies. Run in two phases:

**Phase 1 (parallel):** 1, 2, 5, 6, 7, 8
**Phase 2 (parallel, after Phase 1 commits):** 3, 4

Dead-code removal (3) runs after dedup (1) and type consolidation (2) to avoid deleting code that is about to be reused. Circular-dep work (4) benefits from type consolidation first.

## Subagents

1. **Deduplication** — Find duplicated logic across the codebase. Apply DRY only where it reduces complexity; do not abstract three similar lines into a helper.
2. **Type consolidation** — Find all type definitions. Merge duplicates into shared locations. Update imports.
3. **Dead code removal** — Use `knip` (or language equivalent) to find unused exports, files, and dependencies. Verify each removal with grep across the full repo before deleting.
4. **Circular dependency resolution** — Use `madge --circular` (or equivalent) to identify cycles. Refactor to break them; do not paper over with lazy imports.
5. **Weak type elimination** — Replace `any`, `unknown`, and language equivalents with concrete types. Research correct types from call sites and upstream packages. No casts to suppress errors.
6. **Defensive code pruning** — Remove try/catch blocks that hide errors or return silent fallbacks. Keep only those guarding genuinely untrusted input (user input, external APIs, filesystem boundaries).
7. **Deprecated/legacy removal** — Find code marked deprecated, behind always-on feature flags, or labeled legacy. Remove the dead path; keep one canonical implementation.
8. **AI slop removal** — Strip stubs, placeholder code, in-motion-work comments ("now replacing X with Y"), and over-commenting. Replace only where a new contributor genuinely needs the context. Be concise.

## Constraints

- Each subagent commits independently with a descriptive message (`cleanup(<task>): <summary>`).
- Run the test suite after each subagent commits. If tests fail, revert that subagent's commit and include the failure in the final report — do not auto-fix.
- Subagents that touch the same file must serialize: later subagents rebase on earlier commits.
- No subagent may skip hooks (`--no-verify`) or force-push.

## Reporting

After all subagents complete, produce a single summary with:

- Per-subagent: files changed, lines added/removed, key findings.
- Any subagents that failed or were reverted, with the failing test output.
- Remaining issues flagged but not auto-fixed (low confidence) — list for human review.
