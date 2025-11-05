# Execute PRP with Incremental Validation

## PRP File: $ARGUMENTS

Execute a PRP (Pre-Requirements Plan) in phases with validation points between each step for controlled, incremental implementation.

## Execution Process

### 1. Load and Plan

- Read the PRP file completely to understand all requirements
- Extract research context, tech stack, and validation commands
- Create implementation plan using TodoWrite tool
- Identify the phases and validation points from the PRP

### 2. Phase-by-Phase Execution

For each phase in the PRP:

1. **Announce Phase Start**
   - Clear statement of which phase is beginning
   - List the specific deliverables for this phase
   - Estimate time/complexity for the phase

2. **Implement Phase Requirements**
   - Follow the PRP's instructions for this phase
   - Use referenced patterns from the codebase
   - Apply the documented error handling strategy
   - Create only the code specified for this phase

3. **Run Validation**
   - Execute phase-specific validation commands from PRP
   - Run any automated tests defined
   - Check for compilation/syntax errors
   - Verify the phase deliverables are complete

4. **User Checkpoint**
   - Show what was implemented with file paths
   - Provide manual testing steps from PRP
   - Report validation results clearly
   - Wait for user feedback before proceeding

### 3. Phase Structure

Standard progression (from PRP template):

- **Setup Phase**: File structure, types, interfaces, configuration
- **Core Phase**: Main functionality implementation
- **Integration Phase**: Connect with existing systems
- **Testing Phase**: Unit and integration tests
- **Polish Phase**: Error handling, edge cases, documentation

Each phase should:

- Output working, testable code
- Have clear success criteria
- Include manual testing instructions
- Build incrementally on previous phases

### 4. Validation Protocol

```bash
# Run validation commands from PRP
npm run type-check  # or project-specific command
npm run lint
npm run test

# Report results clearly
echo "✓ Type checking passed"
echo "✓ Linting passed"
echo "⚠ 2 tests pending implementation"

# Fix any failures before proceeding
# If validation fails, stop and fix before continuing
```

### 5. User Checkpoints

After completing each phase:

- **Implementation Summary**: List all files created/modified
- **Validation Results**: Show output from validation commands
- **Manual Testing**: Provide specific steps for user to test
- **Next Phase Preview**: Brief description of what comes next

Wait for user response:

- "continue" → Proceed to next phase
- "fix [issue]" → Address specific problem
- Other feedback → Incorporate before continuing

## Control Commands During Execution

### Navigation Commands

- `continue` - Proceed to next phase
- `pause` - Stop for manual intervention
- `status` - Show current phase and progress
- `restart phase` - Redo current phase from beginning
- `skip to [phase]` - Jump to specific phase (with warning)

### Correction Commands

- `fix [issue]` - Address specific problem
- `rollback` - Undo current phase changes
- `validate` - Re-run validation commands
- `debug` - Show detailed error information

### Information Commands

- `show plan` - Display full implementation plan
- `show prp` - Display relevant PRP section
- `progress` - Show overall completion status
- `help` - Show available commands

## Execution Modes

### Standard Mode (Default)

- Stop at each checkpoint for user confirmation
- Show all validation results
- Require explicit "continue" to proceed

### Auto Mode (When specified)

- Continue automatically if validation passes
- Stop only on errors or warnings
- Still show progress updates

### Debug Mode

- Extra verbose output
- Show all command executions
- Detailed error traces

## Error Handling

### Validation Failures

1. Stop execution immediately
2. Show clear error message
3. Suggest fix if possible
4. Wait for user instruction

### Missing Dependencies

1. Identify what's missing
2. Suggest installation command
3. Pause for user to install
4. Retry after installation

### Ambiguous Requirements

1. Flag the ambiguity
2. Show PRP section in question
3. Ask for clarification
4. Update understanding and proceed

## Completion

### Final Validation

- Run complete test suite
- Verify all PRP requirements met
- Check success criteria achieved
- Generate coverage report if applicable

### Deliverables

- Summary of all changes made
- Documentation updates completed
- Usage examples created
- Any remaining TODOs noted

### Handoff

- Provide clear usage documentation
- List any manual steps needed
- Note any deferred items
- Suggest next steps

## Important Notes

- **Always wait for user confirmation between phases** unless explicitly told to continue automatically
- **Never skip validation** even if it seems unnecessary
- **Document any deviations** from the PRP with clear reasoning
- **Preserve existing code** unless PRP specifically says to modify
- **Test incrementally** rather than waiting until the end

The goal is controlled, validated, incremental delivery that builds confidence at each step.
