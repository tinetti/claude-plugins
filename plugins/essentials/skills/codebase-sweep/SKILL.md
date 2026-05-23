---
name: codebase-sweep
description: >-
  Comprehensive, codebase-wide quality sweep that dispatches parallel subagents
  to find and fix structural issues. Covers deduplication, type consolidation,
  dead code removal, circular dependencies, weak types, defensive try/catch,
  deprecated paths, and AI slop. Primary support for JS/TS projects (knip,
  madge, TypeScript types); other languages get grep-based analysis. Use when
  the user asks to "deep clean the whole repo", "run a full codebase audit",
  "nuclear cleanup", "deslop everything", or "sweep the entire codebase for
  quality issues". Do NOT use for single-file fixes, branch-scoped diffs (use
  de-slopify instead), or targeted refactors.
disable-model-invocation: true
---

# Codebase Sweep

Dispatch up to 8 subagents to audit and clean the codebase. Each subagent must:
(1) research its domain, (2) write a critical assessment with findings,
(3) implement all high-confidence fixes.

## Pre-flight

1. Detect project language(s) from config files (package.json, tsconfig.json, Cargo.toml, pyproject.toml, go.mod, etc.).
2. Based on detected languages, determine which subagents apply (see language applicability below).
3. Identify the test runner and verify tests pass before starting. Abort if tests are already broken.
4. Create a working branch: `cleanup/<YYYY-MM-DD>`.
5. Exclude generated files, `node_modules`, `dist`, `vendor`, lock files, and any paths listed in `.gitignore`.

## Subagents

Each subagent is spawned using the Agent tool with `mode: "auto"`. Give each subagent a clear prompt including: the task description below, the project root path, detected language(s), and a reminder to commit its own changes with the prefix `cleanup(<task>):`.

| # | Subagent | Applies to | Description |
|---|----------|-----------|-------------|
| 1 | **Deduplication** | All languages | Find duplicated logic across the codebase. Apply DRY only where it reduces complexity; do not abstract three similar lines into a helper. |
| 2 | **Type consolidation** | JS/TS, Java, C#, Go (typed languages) | Find all type/interface definitions. Merge duplicates into shared locations. Update imports. |
| 3 | **Dead code removal** | All languages | JS/TS: use `knip` to find unused exports, files, and dependencies. Other languages: use grep-based analysis to find unreferenced exports and files. Verify each removal with grep across the full repo before deleting. |
| 4 | **Circular dependency resolution** | All languages | JS/TS: use `madge --circular` to identify cycles. Other languages: trace import graphs with grep/find. Refactor to break cycles; do not paper over with lazy imports. |
| 5 | **Weak type elimination** | JS/TS (primary), Python (type hints) | Replace `any`, `unknown` (TS) or missing type annotations (Python) with concrete types. Research correct types from call sites and upstream packages. No casts to suppress errors. |
| 6 | **Defensive code pruning** | All languages | Remove try/catch blocks that hide errors or return silent fallbacks. Keep only those guarding genuinely untrusted input (user input, external APIs, filesystem boundaries). |
| 7 | **Deprecated/legacy removal** | All languages | Find code marked deprecated, behind always-on feature flags, or labeled legacy. Remove the dead path; keep one canonical implementation. |
| 8 | **AI slop removal** | All languages | Strip stubs, placeholder code, in-motion-work comments ("now replacing X with Y"), and over-commenting. Replace only where a new contributor genuinely needs the context. |

**Skip subagents that don't apply** to the detected language. For a Python-only project, skip subagent 4 (madge) unless circular imports are suspected, and scope subagent 2 to dataclass/TypedDict consolidation.

## Execution order

Run in two phases because dead-code removal and circular-dep work produce better results after dedup and type consolidation have landed.

**Phase 1 (parallel):** 1, 2, 5, 6, 7, 8
**Phase 2 (parallel, after Phase 1 commits):** 3, 4

## Constraints

- Each subagent commits independently with a descriptive message (`cleanup(<task>): <summary>`).
- Run the test suite after each subagent commits. If tests fail, revert that subagent's commit and include the failure in the final report — do not auto-fix.
- Subagents that touch the same file must serialize: later subagents rebase on earlier commits.
- No subagent may skip hooks (`--no-verify`) or force-push.
- For repositories over ~200 files, consider scoping to the most active packages/directories rather than sweeping everything. Use `git log --format='%H' --since='3 months ago' -- <path>` to prioritize high-churn areas.

## Reporting

After all subagents complete, produce a single summary with:

- Per-subagent: files changed, lines added/removed, key findings.
- Subagents skipped (with reason — language not applicable).
- Any subagents that failed or were reverted, with the failing test output.
- Remaining issues flagged but not auto-fixed (low confidence) — list for human review.
