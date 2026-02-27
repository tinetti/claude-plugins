# Project Planner Plugin Contract

**Created**: 2026-02-19
**Confidence Score**: 96/100
**Status**: Draft

## Problem Statement

Non-technical leadership is asking how to use the ideation plugin in Claude Cowork. The current plugin is developer-centric — it explores codebases, generates implementation specs with code patterns, and hands off to `/execute-spec` which runs dev tools. Leadership wants the same confidence-gated workflow (brain dump → structured plan) but for project planning and knowledge work, not software implementation.

Cowork operates on mounted folders where output files can feel "lost" if the plugin writes to assumed paths. The existing plugin's handoff requires manual CLI invocations across fresh sessions, which doesn't map to Cowork's async, GUI-based workflow.

## Goals

1. **Clone and adapt the ideation plugin** as a new `project-planner` plugin that translates the same pipeline (intake → explore → contract → phase → detail → handoff) for non-technical users
2. **Replace developer-centric artifacts** with business/knowledge-work equivalents: project briefs, phased project plans, and execution plans (deliverables + approach guidance, not code specs)
3. **Make file output location discoverable** by asking during intake where to save artifacts (default `./{project-name}/`)
4. **Preserve the confidence-gated workflow** as the core value — same scoring, questioning, and approval gates with language tweaks for plain English
5. **Produce execution plans structured enough for Cowork to follow** — not just human-readable docs but step-by-step instructions an AI agent can act on for knowledge work

## Success Criteria

- [ ] Plugin installs and activates in both Claude Code and Cowork
- [ ] Skill triggers on brain dumps about projects, initiatives, and planning (not code)
- [ ] Confidence rubric scores with same dimensions, plain language (no codebase/code references)
- [ ] Contract → "Project Brief" with problem, goals, success criteria, scope (same structure, business language)
- [ ] PRD equivalent → "Project Plan" with deliverables, stakeholders, timelines, dependencies
- [ ] Spec equivalent → "Execution Plan" with deliverables, execution details, completion criteria, review cycles
- [ ] File location prompt during intake with sensible default
- [ ] Examples use cross-team initiative domain (e.g., platform migration)
- [ ] All AskUserQuestion gates preserved (confidence, brief approval, plan approval)
- [ ] Artifacts are the handoff — no separate handoff command needed
- [ ] Context gathering phase scans mounted folder for existing docs/notes/prior work instead of codebase

## Scope Boundaries

### In Scope

- New plugin at `plugins/project-planner/` with full plugin structure
- SKILL.md rewritten from ideation SKILL.md with translated phases
- Adapted reference docs: brief template, plan template, execution plan template, confidence rubric, workflow example
- New examples using cross-team initiative domain
- Context gathering phase (replaces codebase exploration) that scans the working folder
- File location question added to intake phase
- `plugin.json` manifest with appropriate metadata

### Out of Scope

- `/execute-plan` command (can be added later if Cowork execution proves valuable)
- Agent definitions (skill-based like the original)
- Autonomous mode (gating is the feature)
- MCP server integrations
- Any changes to the original ideation plugin

### Future Considerations

- `/execute-plan` command that lets Cowork follow the execution plans step by step (parallel to `/execute-spec`)
- Bridge format: output that can be consumed by the dev ideation plugin as structured input
- Cowork-specific file organization patterns (index files, README generation)

---

_This contract was generated from brain dump input. Review and approve before proceeding to specification._
