# Spec-Driven Development Plugin

Transform specifications into executable code with automated analysis, validation checkpoints, and incremental delivery. This plugin provides a complete workflow for specification-driven development where requirements become actionable blueprints that guide implementation.

## Overview

The spec-driven plugin implements a progressive refinement workflow that turns traditional documentation into executable artifacts. Instead of writing specs that gather dust, you create living documents that actively drive implementation with built-in validation and automated codebase analysis.

## Workflow

```
generate-spec → check-spec → generate-prp → check-prp → execute-spec/execute-prp
```

Each step builds on the previous one, progressively refining requirements into implementation-ready plans with validation at every stage.

## Commands

### `/generate-spec <feature-description>`

Creates a comprehensive, actionable feature specification with automated codebase analysis.

**Key Features:**

- Automated discovery of existing patterns and similar features
- Complexity scoring based on codebase analysis
- Technical architecture with database schemas and API designs
- Implementation checklists with validation criteria
- Risk analysis and mitigation strategies
- Success metrics and rollout planning

**Example:**

```
/generate-spec user authentication with OAuth2 and role-based permissions
```

**Output:** `docs/specs/{feature-name}-spec.md` plus supporting artifacts

### `/check-spec <spec-file>`

Reviews a feature specification for completeness and implementation readiness.

**Validates:**

- Requirements clarity and measurability
- User experience considerations
- Technical specifications completeness
- Implementation readiness
- Project management aspects

**Output:**

- Quality score (1-10)
- Strengths and gaps analysis
- Specific recommendations for improvement
- Risk assessment

**Example:**

```
/check-spec docs/specs/user-auth-spec.md
```

### `/generate-prp <feature-file>`

Generates a Pre-Requirements Plan (PRP) from a specification with thorough research.

**Research Process:**

1. Analyzes codebase for patterns and conventions
2. Gathers external documentation and best practices
3. Identifies project context (framework, testing, build tools)
4. Creates phased implementation plan

**Output:** `PRPs/{feature-name}.md` with:

- Research context and documentation URLs
- Implementation phases with clear deliverables
- Validation commands for each phase
- Manual testing instructions
- Error handling strategies

**Example:**

```
/generate-prp docs/specs/user-auth-spec.md
```

### `/check-prp <prp-file>`

Validates a PRP for completeness and execution readiness.

**Checks:**

- Research context completeness
- Tech stack identification accuracy
- Validation commands compatibility
- Implementation phases clarity
- Testing coverage

**Output:**

- Quality score (1-10)
- Missing elements identification
- Improvement suggestions
- Execution readiness assessment

**Example:**

```
/check-prp PRPs/user-auth.md
```

### `/execute-spec <spec-file>`

Executes a feature specification with intelligent automation and comprehensive validation.

**Execution Features:**

- Auto-generates or updates PRP if needed
- Adapts to project complexity (simple/medium/complex)
- Provides phase-by-phase implementation
- Continuous validation at each step
- Progress tracking with implementation checklists
- Smart checkpoints based on complexity

**Control Commands During Execution:**

- `continue` - Proceed to next phase
- `status` - Show current progress
- `validate` - Run validation checks
- `pause` - Stop for manual work
- `report` - Generate progress report

**Example:**

```
/execute-spec specs/user-auth-spec.md
/execute-spec specs/feature-spec.md --auto  # Auto-progression mode
```

### `/execute-prp <prp-file>`

Executes a PRP with controlled, incremental validation.

**Process:**

1. Creates implementation plan using TodoWrite
2. Executes phase-by-phase with user checkpoints
3. Runs validation after each phase
4. Waits for confirmation before proceeding

**Phase Structure:**

- Setup → Core → Integration → Testing → Polish

**Control Commands:**

- `continue` - Proceed to next phase
- `fix [issue]` - Address specific problem
- `pause` - Stop for manual intervention
- `restart phase` - Redo current phase
- `validate` - Re-run validation

**Example:**

```
/execute-prp PRPs/user-auth.md
```

## Key Concepts

### Specifications as Executable Artifacts

Specifications aren't just documentation - they're blueprints that:

- Include automated codebase analysis
- Calculate complexity scores
- Define validation criteria
- Provide implementation checklists
- Specify success metrics

### Pre-Requirements Plans (PRPs)

PRPs bridge the gap between specifications and code by:

- Gathering all necessary research and context
- Breaking implementation into validated phases
- Providing validation commands for each step
- Including manual testing instructions
- Defining incremental milestones

### Validation-Driven Development

Every phase includes:

- Automated validation commands
- Manual testing steps
- Success criteria
- User checkpoints
- Error recovery strategies

### Adaptive Execution

The plugin adapts to:

- Project complexity (simple/medium/complex)
- Existing codebase patterns
- Framework and tooling choices
- Testing strategies
- Build processes

## Best Practices

### Writing Specifications

1. **Be Specific**: Include concrete examples and exact requirements
2. **Define Success**: Provide measurable success criteria
3. **Consider Edge Cases**: Document error states and exceptions
4. **Include Context**: Reference existing patterns and systems
5. **Prioritize**: Distinguish MVP from enhancements

### Creating PRPs

1. **Research Thoroughly**: Include all relevant documentation
2. **Phase Carefully**: Break work into testable increments
3. **Validate Often**: Include validation at each step
4. **Document Patterns**: Reference existing code examples
5. **Plan Recovery**: Include error handling strategies

### Executing Plans

1. **Start Small**: Begin with simple features to learn the workflow
2. **Validate Continuously**: Never skip validation steps
3. **Document Deviations**: Note any changes from the plan
4. **Test Incrementally**: Verify each phase before proceeding
5. **Preserve Code**: Don't modify existing code unnecessarily

## Example Workflow

### 1. Generate Initial Specification

```
/generate-spec payment processing with Stripe integration
```

### 2. Review and Refine

```
/check-spec docs/specs/payment-processing-spec.md
# Address any gaps identified
```

### 3. Create Implementation Plan

```
/generate-prp docs/specs/payment-processing-spec.md
```

### 4. Validate Plan

```
/check-prp PRPs/payment-processing.md
# Ensure all research is complete
```

### 5. Execute Implementation

```
/execute-spec docs/specs/payment-processing-spec.md
# Or use PRP directly:
/execute-prp PRPs/payment-processing.md
```

## Advanced Features

### Complexity Scoring

Automatically calculates based on:

- Files to modify
- New dependencies required
- Database changes needed
- API surface area
- Integration points

### Codebase Pattern Analysis

Discovers and uses:

- Similar feature implementations
- Testing patterns
- Authentication/authorization approaches
- Database schema conventions
- API endpoint patterns

### Rollout Planning

Includes:

- Feature flag strategies
- Phased deployment plans
- Performance monitoring
- Success metrics tracking
- Rollback procedures

## Integration with Other Tools

The spec-driven plugin works well with:

- **TodoWrite**: Automatically creates task lists during execution
- **Git commands**: Commits at phase boundaries
- **Testing tools**: Runs project-specific test suites
- **Build tools**: Validates compilation and builds

## Troubleshooting

### Specification Issues

**Problem**: Spec generation misses project context
**Solution**: Provide more specific feature description with technology mentions

**Problem**: Complexity score seems wrong
**Solution**: Review the automated analysis and adjust scope if needed

### Execution Issues

**Problem**: Validation commands fail
**Solution**: Check that commands match your project setup

**Problem**: Implementation doesn't match specification
**Solution**: Use `/check-spec` to identify gaps, then regenerate PRP

**Problem**: Execution gets stuck
**Solution**: Use `pause` command, fix issues manually, then `continue`

## Philosophy

This plugin embodies the principle that specifications should be:

- **Actionable**: Direct implementation guidance
- **Validated**: Built-in success criteria
- **Incremental**: Phased delivery with checkpoints
- **Adaptive**: Adjusts to project context
- **Automated**: Reduces manual analysis work

By treating specifications as code artifacts rather than documentation, we bridge the gap between planning and implementation, ensuring that what's specified is what gets built.

## License

Part of the Claude Plugins marketplace - see main repository for license details.
