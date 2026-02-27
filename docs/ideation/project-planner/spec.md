# Implementation Spec: Project Planner Plugin

**Contract**: ./contract.md
**Estimated Effort**: M

## Technical Approach

Clone the ideation plugin's structure and rewrite every file for non-technical, knowledge-work context. The pipeline shape stays identical (intake → context gathering → project brief → phasing → execution plans → handoff) but all language, templates, examples, and references are adapted for leadership/PM users working in Claude Cowork.

The core translation: "codebase" becomes "existing documents/context," "implementation spec" becomes "execution plan," "code patterns" become "deliverables and approach," "feedback loops" become "review cycles," and "validation commands" become "completion criteria."

The plugin is pure markdown — no code, no build step, no MCP servers. All files are new (nothing modified in the existing ideation plugin).

## File Changes

### New Files

| File Path | Purpose |
|-----------|---------|
| `plugins/project-planner/.claude-plugin/plugin.json` | Plugin manifest |
| `plugins/project-planner/README.md` | Plugin documentation |
| `plugins/project-planner/skills/project-planner/SKILL.md` | Core workflow — all 5 phases rewritten for non-technical context |
| `plugins/project-planner/skills/project-planner/references/brief-template.md` | Project brief template (adapted from contract-template.md) |
| `plugins/project-planner/skills/project-planner/references/plan-template.md` | Phased project plan template (adapted from prd-template.md) |
| `plugins/project-planner/skills/project-planner/references/execution-plan-template.md` | Execution plan template (adapted from spec-template.md) |
| `plugins/project-planner/skills/project-planner/references/confidence-rubric.md` | Scoring rubric with plain-language criteria (adapted from confidence-rubric.md) |
| `plugins/project-planner/skills/project-planner/references/review-cycle-guide.md` | Review cycle design guide (replaces feedback-loop-guide.md) |
| `plugins/project-planner/skills/project-planner/references/workflow-example.md` | End-to-end walkthrough using cross-team initiative |
| `plugins/project-planner/skills/project-planner/examples/brief-example.md` | Filled-in project brief for platform migration |
| `plugins/project-planner/skills/project-planner/examples/plan-example.md` | Filled-in project plan for platform migration phase 1 |
| `plugins/project-planner/skills/project-planner/examples/execution-plan-example.md` | Filled-in execution plan for platform migration phase 1 |

## Implementation Details

### Component 1: Plugin Scaffolding

**Overview**: Create plugin directory structure and manifest.

**plugin.json**:
```json
{
  "name": "project-planner",
  "version": "0.1.0",
  "description": "Transform brain dumps into structured project plans: briefs, phased plans, and execution plans for knowledge work",
  "author": {
    "name": "Nick Nisi",
    "email": "nick@nisi.org"
  },
  "keywords": ["planning", "project", "brain-dump", "cowork", "leadership", "execution-plan"]
}
```

**README.md**: Brief plugin description, workflow overview, artifact descriptions. Keep it short — the skill itself is the documentation.

### Component 2: SKILL.md — Core Workflow

**Pattern to follow**: `plugins/ideation/skills/ideation/SKILL.md`

**Overview**: The most complex file. Rewrite all 5 phases with translated language while preserving the exact same gating logic, confidence thresholds, and AskUserQuestion patterns.

**Phase-by-phase translation**:

#### Phase 1: Intake
- Identical to ideation. Accept messy input without judgment.
- **Add**: File location question. After acknowledging intake, use AskUserQuestion to ask where to save artifacts. Default: `./{project-name}/`. Options: root of folder, named subfolder, custom path.

#### Phase 2: Context Gathering (replaces "Codebase Exploration")
- **Purpose**: Understand existing context before scoring confidence.
- **What to explore**: Scan the working directory for existing documents, notes, meeting minutes, prior plans, spreadsheets, presentations, org charts, process docs — anything relevant to the brain dump's scope.
- **When to skip**: If the brain dump is about something entirely new with no prior context in the folder.
- **How to explore**: Use Glob to find `.md`, `.txt`, `.docx`, `.pdf`, `.csv` files. Read relevant ones. Look for prior art, existing decisions, stakeholder lists, timelines, constraints.
- **Record findings**: Same as ideation — retain as context, don't write to files. Findings inform confidence scoring, brief, and plans.

#### Phase 3: Brief Formation (replaces "Contract Formation")
- **Same confidence rubric** — 5 dimensions, 0-20 each, threshold ≥95.
- **Language changes in rubric**:
  - Problem Clarity: same (works for any domain)
  - Goal Definition: replace technical metrics with business metrics where appropriate in examples
  - Success Criteria: "Can I define clear acceptance criteria?" instead of "Can I write tests?"
  - Scope Boundaries: same (works for any domain)
  - Consistency: same
- **Output**: `project-brief.md` (replaces `contract.md`). Same structure: Problem Statement, Goals, Success Criteria, Scope Boundaries.
- **Approval gate**: Same AskUserQuestion pattern.

#### Phase 4: Phasing & Planning (replaces "Phasing & Specification")

**4.1 Choose Workflow**:
- "Straight to execution plans" — recommended for focused projects. Brief defines what, execution plans define how.
- "Project plans then execution plans" — recommended for large scope or cross-functional teams. Adds a stakeholder alignment layer.

**4.2 Determine Phases**:
- Same criteria: dependencies, risk, value delivery, complexity.
- Small-project shortcut still applies.
- **Detect repeatable patterns**: Same template+delta approach for repetitive phases.

**4.3 Generate Project Plans** (optional, replaces PRDs):
- `project-plan-phase-{n}.md` using plan template.
- Content: Phase overview, stakeholder needs (replaces user stories), requirements (functional + non-functional), dependencies, acceptance criteria.
- **Key difference from PRD**: Use "stakeholder needs" framed as "As [stakeholder role], I need [capability] so that [business outcome]" — same structure as user stories but business-language.

**4.4 Generate Execution Plans** (replaces Implementation Specs):
- `execution-plan-phase-{n}.md` using execution plan template.
- **Structure** (maps from spec template):

| Spec template section | Execution plan equivalent |
|---|---|
| Technical Approach | **Approach** — high-level strategy for this phase's work |
| Feedback Strategy | **Review Strategy** — who reviews, when, what format |
| File Changes | **Deliverables** — documents/artifacts to produce, with purpose |
| Implementation Details per component | **Execution Details per deliverable** — what to research, draft, gather, organize |
| Per-component feedback loop | **Per-deliverable review cycle** — draft→review→finalize checkpoints |
| Data Model / API Design | **Omit** — not applicable |
| Testing Requirements | **Omit** — replaced by completion criteria |
| Validation Commands | **Completion Criteria** — how to verify each deliverable is done |
| Error Handling | **Risk Mitigation** — what could go wrong and contingency plans |
| Rollout Considerations | **Communication Plan** — how to announce/distribute deliverables |

- **Per-deliverable structure**:
  ```
  ### {Deliverable Name}

  **Overview**: What this deliverable is and why it matters.

  **Inputs needed**: What information/context to gather before drafting.

  **Key decisions**:
  - {Decision 1 and options to consider}

  **Execution steps**:
  1. {Step 1}
  2. {Step 2}
  3. {Step 3}

  **Review cycle**:
  - **Draft**: {What the first draft should cover}
  - **Review with**: {Who should review — role, not name}
  - **Finalize when**: {Specific completion criteria}
  ```

- **Repeatable patterns**: Same template+delta approach. If 3+ phases follow the same deliverable structure, generate one execution plan template + per-phase delta files.

**4.5 Present for Review**:
- **Before presenting, evaluate review cycle quality**:
  - Strong: All substantive deliverables have review cycles, completion criteria are specific
  - Adequate: Most have cycles but some gaps
  - Weak: No review strategy or complex deliverables missing cycles → revise first
- Same AskUserQuestion approval gate.

#### Phase 5: Handoff Summary (simplified)
- **No tasks to create, no commands to run.**
- Present a summary: "Planning complete. Artifacts written to `{output-path}/`."
- List all artifacts produced with one-line descriptions.
- If phases are sequential, note the recommended order.
- If phases are independent, note they can be worked in parallel.
- **No agent team prompts** — this is for non-technical users. Keep the handoff clean.
- **Future hook**: Note that a `/execute-plan` command could be built to let Cowork execute these plans step by step (mirrors `/execute-spec`). But not in v1.

### Component 3: Reference Documents

**3a. brief-template.md** (from contract-template.md)
- Rename "Contract" → "Project Brief" throughout
- Same structure: Problem Statement, Goals, Success Criteria, Scope Boundaries
- Update template usage notes: replace "API response times" examples with business examples ("quarterly planning cycle takes 6 weeks instead of 2")

**3b. plan-template.md** (from prd-template.md)
- Rename "PRD" → "Project Plan"
- "User Stories" → "Stakeholder Needs" (same format: As a [role], I need [thing] so that [outcome])
- "Functional Requirements" → "Requirements" (drop the "functional" qualifier — all requirements here are business requirements)
- Keep non-functional requirements but use business language: "Response time" → "Turnaround time," "Scalability" → "Scale considerations"
- Keep dependencies, acceptance criteria, open questions

**3c. execution-plan-template.md** (from spec-template.md)
- Complete restructure per the mapping in Component 2 above
- Remove all code-specific sections: Data Model, API Design, code snippets
- Add: Deliverables table, Execution Details per deliverable, Review cycles, Completion Criteria, Risk Mitigation, Communication Plan
- Keep: Approach (from Technical Approach), Open Items
- Template usage notes updated for business context

**3d. confidence-rubric.md** (from confidence-rubric.md)
- Same 5 dimensions, same scoring ranges, same thresholds
- Language tweaks:
  - Success Criteria: "Can I define clear acceptance criteria?" (not "Can I write tests?")
  - Examples updated to business context throughout (e.g., score 20 for Problem Clarity: "Quarterly planning process takes 6 weeks involving 12 teams, causing 3-week delays in budget allocation affecting all Q2 hiring")
  - Question templates: same structure, business language
- **Remove**: "Spec Feedback Quality" section at bottom — replace with "Execution Plan Quality" section using review cycle criteria (Strong/Adequate/Weak mapped to review cycles instead of feedback loops)

**3e. review-cycle-guide.md** (replaces feedback-loop-guide.md)
- **Purpose**: Guide for designing review cycles in execution plans
- **Deliverable-type mapping** (replaces component-type mapping):

| Deliverable Type | Review Mechanism | Example |
|---|---|---|
| Strategic documents (briefs, proposals) | Stakeholder review — circulate draft, collect feedback, revise | "Share draft with VP Engineering, iterate on scope" |
| Communications (announcements, emails) | Tone/accuracy review — draft, review with comms/legal, finalize | "Review announcement draft with comms team" |
| Process documents (runbooks, playbooks) | Walkthrough review — draft, walk through with practitioners, revise | "Walk through migration runbook with ops team" |
| Data/analysis artifacts (reports, dashboards) | Accuracy review — draft with sample data, validate with data owner | "Verify migration metrics with data team" |
| Trivial artifacts (meeting agendas, status updates) | Skip — no formal review needed | N/A |

- **Three design questions** (parallel to feedback-loop-guide):
  1. What's the draft? (What does the first version look like?)
  2. Who reviews? (Role, not name — stakeholder type)
  3. When is it done? (Specific completion criteria)

**3f. workflow-example.md** — Full rewrite
- **Domain**: Cross-team platform migration initiative
- **Brain dump example**: Messy dictation about migrating from legacy platform, multiple teams affected, unclear timeline, leadership pressure
- **Walk through**: All 5 phases with the platform migration example
  - Context gathering: find existing migration notes, prior assessments, team org docs
  - Brief: Platform migration brief with business goals and scope
  - Phasing: Phase 1 (assessment + planning), Phase 2 (team-by-team migration), Phase 3 (validation + decommission)
  - Execution plans: Show one phase's execution plan with deliverables and review cycles
  - Handoff: Summary of all artifacts

### Component 4: Examples

All examples use the **cross-team platform migration** domain.

**4a. brief-example.md** (from contract-example.md)
- Platform migration project brief
- Problem: Legacy platform costs $X/year, 3 teams blocked on features it can't support
- Goals: Complete migration by Q3, reduce platform costs by 40%, unblock feature development
- Success criteria: All 3 teams migrated, legacy decommissioned, no service disruptions
- Scope: In (migration, data transfer, team training), Out (feature development on new platform, vendor evaluation)

**4b. plan-example.md** (from prd-example.md)
- Platform migration Phase 1: Assessment & Planning
- Stakeholder needs, requirements, dependencies
- Shows the "Stakeholder Needs" format: "As a team lead, I need a clear migration timeline so that I can plan my team's sprint commitments around it"

**4c. execution-plan-example.md** (from spec-example.md)
- Platform migration Phase 1 execution plan
- Deliverables: Migration assessment doc, team impact analysis, timeline with milestones, communication plan
- Shows per-deliverable execution details with review cycles
- Shows completion criteria (not validation commands)

## Completion Criteria

- [ ] Plugin directory structure matches standard layout
- [ ] `plugin.json` has correct metadata
- [ ] SKILL.md covers all 5 phases with translated language
- [ ] All references to "codebase," "code," "implementation," "tests" are replaced with business equivalents
- [ ] Confidence rubric preserves exact scoring logic (same thresholds, same dimensions)
- [ ] All AskUserQuestion gates preserved
- [ ] File location question added to intake phase
- [ ] Context gathering phase scans for documents, not code
- [ ] Execution plan template has deliverables, review cycles, completion criteria (not file changes, feedback loops, validation commands)
- [ ] All 3 examples use platform migration domain
- [ ] Workflow example walks through complete pipeline
- [ ] No references to dev tools (test runners, dev servers, storybook, bash commands)
- [ ] Plugin syncs correctly with marketplace (`pnpm run sync`)

---

_This spec is ready for implementation. Follow the patterns and validate at each step._
