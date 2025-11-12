---
name: research
description: Multi-source comprehensive research using perplexity-researcher, claude-researcher, gemini-researcher, and grok-researcher agents. Three modes - Quick (4 agents), Standard (12 agents), Extensive (32 agents). USE WHEN user says 'do research', 'quick research', 'extensive research', 'find information about', 'investigate', 'analyze trends', 'current events', or any research-related request.
---

# Research Skill

## When to Use This Skill

This skill activates when the user requests research or information gathering:
- "Do research on X"
- "Research this topic"
- "Find information about X"
- "Investigate this subject"
- "Analyze trends in X"
- "Current events research"
- Any comprehensive information gathering request

## THREE RESEARCH MODES

### QUICK RESEARCH MODE
- User says "quick research" → Launch 4 agents (1 of each type)
- **Timeout: 2 minutes** | Main session waits 2 minutes then synthesizes
- Best for: Simple queries, straightforward questions, fast answers

### STANDARD RESEARCH MODE (Default)
- Default for most research requests → Launch 12 agents (3 of each type)
- **Timeout: 3 minutes** | Main session waits 3 minutes then synthesizes
- Best for: Most research needs, comprehensive coverage, balanced depth

### EXTENSIVE RESEARCH MODE
- User says "extensive research" → Launch 32 agents (8 of each type)
- Generate 32 unique, creative research angles
- **Timeout: 10 minutes** | Main session waits 10 minutes then synthesizes
- Best for: Deep-dive research, multi-domain analysis, comprehensive reports

**CRITICAL TIMEOUT RULES:**
- **Quick (4 agents): 2 minute timeout**
- **Standard (12 agents): 3 minute timeout**
- **Extensive (32 agents): 10 minute timeout**
- After timeout, STOP WAITING and synthesize with whatever results are available
- Proceed with partial results - don't wait indefinitely for stragglers

## Available Research Agents

- **perplexity-researcher**: Perplexity API searches with citations (web search, current data)
- **claude-researcher**: Claude WebSearch with query decomposition (web search, detailed analysis)
- **gemini-researcher**: Google Gemini AI analysis (reasoning, multi-perspective synthesis)
- **grok-researcher**: xAI Grok analysis (alternative LLM perspective, reasoning)

## How Research Works

### Parallel Agent Orchestration

1. **Query Decomposition**
   - Break research question into 4-32 focused sub-questions
   - Each sub-question explores a different angle or perspective
   - Ensure no duplicate efforts across sub-questions

2. **Parallel Agent Launch**
   - Launch all agents in SINGLE message for true parallelism
   - Distribute sub-questions across perplexity, claude, gemini, and grok agents
   - Each agent researches independently using their specialized tools

3. **Result Collection**
   - Wait for agents to return (hard timeout: 2/3/10 minutes)
   - Collect results as they arrive
   - Don't wait for slow agents past timeout

4. **Synthesis**
   - Analyze all findings from returned agents
   - Identify patterns, consensus, and contradictions
   - Rate confidence based on source corroboration
   - Provide integrated recommendations

### Speed Benefits

- ❌ **Old approach**: Sequential searches → 5-10 minutes
- ✅ **Quick mode**: 4 parallel agents → **~30-60 seconds** (2 min timeout)
- ✅ **Standard mode**: 12 parallel agents → **~30-90 seconds** (3 min timeout)
- ✅ **Extensive mode**: 32 parallel agents → **~1-3 minutes** (10 min timeout)

Actual research time is usually much faster than timeout. Timeouts are safety limits.

## Research Output Format

**Comprehensive Findings:**

**Summary:** Brief overview of what was researched and key discoveries

**Key Insights:** Main findings organized by theme (not by agent or query)

**Confidence Levels:**
- **High Confidence:** Multiple sources agree, authoritative sources
- **Medium Confidence:** Some corroboration, generally consistent
- **Low Confidence:** Single source, conflicting information, or limited data

**Source Attribution:** Note which research sources provided key findings

**Contradictions:** Call out any conflicting information across sources

**Limitations:** Identify gaps in research or areas needing more investigation

**Recommendations:** Actionable conclusions based on findings

**Follow-Up:** Suggested next steps or deeper investigation areas

## Best Practices

**Query Decomposition:**
- Create diverse angles, not slight variations
- Balance breadth and depth
- Consider: technical, practical, historical, future perspectives
- For extensive mode: Use creative angles (pros/cons, use cases, limitations, comparisons)

**Agent Selection:**
- Perplexity: Web search with citations, current information
- Claude: Web search with detailed analysis
- Gemini: LLM reasoning and multi-perspective synthesis
- Grok: Alternative LLM perspective for analysis

**Synthesis Quality:**
- Organize by theme, not by source
- Integrate findings, don't just list them
- Highlight consensus and flag disagreements
- Rate confidence explicitly for major claims
- Provide actionable conclusions

## Example Workflow

**User:** "Do extensive research on quantum computing commercialization"

**Process:**
1. Decompose into 32 angles:
   - Current commercial applications
   - Major companies and their approaches
   - Technical limitations
   - Cost considerations
   - Timeline predictions
   - Industry-specific use cases
   - Competing technologies
   - Investment trends
   - (24 more diverse angles...)

2. Launch 32 agents (8 perplexity + 8 claude + 8 gemini + 8 grok)
3. Wait up to 10 minutes (usually complete in 1-3 minutes)
4. Synthesize findings from all returned agents
5. Organize by themes: Applications, Challenges, Timeline, Investment
6. Rate confidence for each theme
7. Provide comprehensive report with recommendations
