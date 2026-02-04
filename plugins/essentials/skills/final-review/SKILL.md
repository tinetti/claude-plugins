# Final Review - Comprehensive PR Review & Testing

## Step 0: Determine Review Pass

Before starting, check the git history to determine if this is a follow-up review:

```bash
git log --oneline -10 | grep -i "Co-Authored-By: Claude"
```

- **First pass**: No recent Claude co-authored commits on this branch, or the Claude commits are from a different feature.
- **Follow-up pass**: Recent Claude co-authored commits exist from a previous `/final-review` run on this same feature.

If this is a follow-up pass:

- Note this in the summary as "Review Pass #2" (or #3, etc.)
- Tell the review agents to check git history to understand WHY recent changes were made before suggesting reversals
- Be more conservative with changes - the previous pass already applied significant improvements
- Focus agents on catching issues introduced BY the previous review, not re-litigating decisions already made

## Step 1: Create or Update the PR

First, check which branch you're on:

- **If on `main`**: Create a new feature branch with a descriptive name based on the changes (e.g., `feature/add-user-metrics`, `fix/dashboard-loading`), then commit the changes to that branch.
- **If already on a feature branch**: Continue with existing branch.

Then handle the PR:

- If a PR doesn't exist for this branch, create one with a clear title and description summarizing the changes.
- If a PR already exists, push any uncommitted changes to it.

## Step 2: Launch Three Review Agents in Parallel

Use the Task tool to launch these three agents simultaneously.

**Important context for all agents**: If this is a follow-up pass, include in each agent's prompt:

- "Check git log to see recent commits and their messages before making recommendations"
- "If a pattern looks intentional based on recent commit messages, don't recommend reversing it without strong justification"
- "Focus on issues that may have been INTRODUCED by recent changes, not re-reviewing the entire file"

### Agent 1: Codebase Consistency Reviewer

Review the code changes with these focuses:

- Are we duplicating logic that already exists elsewhere in the codebase? Search for similar patterns, helper methods, or services that we should be using instead.
- Are there other places in the codebase with similar situations where this same logic/fix should be applied? We don't want inconsistency.
- Check for opportunities to consolidate with existing utilities, concerns, or services.

### Agent 2: SOLID & Clean Code Reviewer

Review the code changes through the lens of Uncle Bob's Clean Code principles:

- Single Responsibility: Are classes/methods doing one thing?
- Open/Closed: Can we extend without modifying?
- Look for opportunities to replace conditionals with polymorphism or strategy patterns
- Identify deeply nested if statements that could be flattened or extracted
- Flag long methods that should be decomposed
- Check for proper abstraction levels

### Agent 3: Defensive Code Auditor

Review for overly defensive code that could hide real issues:

- Exception/error handlers that swallow errors silently (empty catch blocks, bare `except:`, `rescue => e` without logging)
- Fallback values that mask null/nil/undefined errors we'd want to know about
- Optional chaining or safe navigation that hides broken assumptions (`?.`, `&.`, `??`)
- Empty array/object fallbacks that hide missing data (`|| []`, `|| {}`, `?? []`)
- Conditional checks that prevent useful errors from surfacing
- Any pattern that would make debugging harder in production

## Step 3: Reconcile and Apply Fixes

When the three agents return their recommendations:

1. **Apply most recommendations** - If you're on the fence, do it. This is a single-developer repo so "out of scope" doesn't apply.

2. **Handle conflicts intelligently** - If Agent 1 says "use existing method X" and Agent 2 says "extract to new method Y", prefer using existing code (Agent 1) to keep the codebase DRY.

3. **Track what you skip** - Only skip if you're genuinely confident it's wrong for this codebase. Note these for the summary.

4. **On follow-up passes, aim for convergence** - If agents are only finding minor issues or suggesting stylistic preferences, note this in the summary. The goal is to converge, not to endlessly refactor. If changes from this pass are minimal, recommend that the user proceed without another review pass.

## Step 4: Comprehensive Testing

Detect the project stack and run appropriate tests. Look for these indicators:

| File                                 | Stack                             |
| ------------------------------------ | --------------------------------- |
| `package.json`                       | Node.js / JavaScript / TypeScript |
| `Gemfile`                            | Ruby                              |
| `pyproject.toml`, `requirements.txt` | Python                            |
| `go.mod`                             | Go                                |
| `Cargo.toml`                         | Rust                              |
| `pom.xml`, `build.gradle`            | Java                              |
| `*.csproj`, `*.sln`                  | .NET                              |

### 4a. Lint & Type Check Changed Files

Run the project's configured linter and type checker on changed files:

- **Check CLAUDE.md** for project-specific lint/typecheck commands
- If not specified, detect from config files (`eslint.config.js`, `.rubocop.yml`, `pyproject.toml`, etc.)
- Run on changed files only to keep feedback fast

### 4b. Run Unit Tests

Run tests related to the changed code:

- **Check CLAUDE.md** for the project's test command
- If full suite is fast (<2 minutes), run it all
- Otherwise, run targeted tests for affected modules/files
- Look for test files that mirror the changed source files

### 4c. Integration/Contract Verification (if applicable)

If CLAUDE.md defines test accounts, fixtures, or verification scripts:

- Use them to validate data contracts with realistic data
- Run any defined smoke test scripts
- Verify API responses match expected shapes

Skip this step if no integration test infrastructure is defined.

### 4d. Browser/UI Testing (if applicable)

If changes affect UI and the project has browser automation configured:

1. **Check CLAUDE.md** for:
   - Test credentials
   - Dev server URL/port
   - Browser automation tool (Playwright, Cypress, Puppeteer, etc.)

2. List each manual smoke test needed based on the diff

3. If browser automation is available, run the tests programmatically

4. If not, document what manual verification is needed in the summary

## Step 5: Push Final Changes

After all fixes and tests pass, commit and push the changes to the PR.

## Step 6: Final Summary

Provide a summary with these sections:

### Review Pass

- State which pass this is (e.g., "Review Pass #1" or "Review Pass #2")
- If follow-up pass, briefly note what the previous pass addressed

### Changes Applied

- List the recommendations you implemented from each agent

### Recommendations Skipped

- For each skipped item, explain WHY you decided not to do it
- Remember: "out of scope" is not a valid excuse in a single-developer repo

### Test Coverage

- Which tests passed
- What was verified via integration tests (if any)
- What was smoke tested via browser (if any)

### Unable to Test

- List anything that couldn't be tested and why
- Explain what manual verification is recommended

### Another Pass Needed?

- If this pass made substantial changes (new classes, significant refactoring), recommend running `/final-review` again
- If changes were minor (small tweaks, style fixes), recommend proceeding to merge
- Be honest: "This pass was substantial - I'd recommend one more review" or "Changes were minimal - ready to merge"
