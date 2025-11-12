# Researcher Plugin

Multi-source parallel research system for Claude Code using Perplexity, Gemini, Grok, and Claude WebSearch with intelligent agent orchestration.

## Overview

The Researcher plugin enables comprehensive information gathering through parallel agent orchestration. Instead of sequential searches taking 5-10 minutes, launch 3-24 specialized research agents simultaneously that complete in 30 seconds to 3 minutes.

**Key Features:**
- 4 research sources: Perplexity, Gemini, Grok, Claude WebSearch
- 3 research modes: Quick (4 agents), Standard (12 agents), Extensive (32 agents)
- Parallel execution for speed
- Multi-perspective synthesis with confidence ratings
- Source attribution and conflict detection

## Prerequisites

1. **Claude Code** installed and configured
2. **API Keys** for research services:
   - Perplexity API key (required for perplexity-researcher)
   - Google API key (required for gemini-researcher)
   - xAI API key (required for grok-researcher)
   - Claude WebSearch (built-in, no key needed)

3. **Node.js** 20+ (for npx to run MCP servers)

## Installation

### 1. Install Plugin

Copy the `researcher/` directory to your Claude Code plugins location:

```bash
cp -r researcher ~/.claude/plugins/
```

### 2. Configure API Keys

Set environment variables with your API keys:

```bash
export PERPLEXITY_API_KEY="your_perplexity_key"
export GOOGLE_API_KEY="your_google_key"
export XAI_API_KEY="your_xai_key"
```

Add these to your shell configuration file (`~/.zshrc` or `~/.bashrc`) to persist across sessions.

### 3. Restart Claude Code

The plugin's `.mcp.json` configures three MCP servers that will be automatically installed via npx when first used:
- `@perplexity-ai/mcp-server` (official Perplexity MCP)
- `gemini-mcp-tool` (Gemini CLI wrapper)
- `grok-mcp` (community Grok MCP)

No manual installation or building required - npx handles everything automatically.

## API Keys

### Perplexity API

1. Visit https://www.perplexity.ai/settings/api
2. Create new API key
3. Set: `export PERPLEXITY_API_KEY="pplx_..."`

**Cost:** Pay-per-use. Sonar models ~$0.001-0.005 per query.

### Google Gemini API

1. Visit https://aistudio.google.com/app/apikey
2. Create new API key
3. Set: `export GOOGLE_API_KEY="AIza..."`

**Cost:** Free tier available. Gemini 2.0 Flash Exp free for experimentation.

### xAI Grok API

1. Visit https://console.x.ai/
2. Create API key
3. Set: `export XAI_API_KEY="xai-..."`

**Cost:** Pay-per-use. Grok-2 ~$0.002-0.010 per query.

## Usage

### Quick Research (4 agents, ~30-60 seconds)

For simple questions or fast answers:

```
"Quick research: What are the latest TypeScript 5.7 features?"
```

**How it works:**
- Launches 4 agents (1 perplexity + 1 gemini + 1 claude + 1 grok)
- 2 minute timeout
- Best for: Straightforward questions, current events, basic fact-finding

### Standard Research (12 agents, ~30-90 seconds) [DEFAULT]

For most research needs:

```
"Research the current state of edge computing adoption"
```

**How it works:**
- Launches 12 agents (3 perplexity + 3 gemini + 3 claude + 3 grok)
- 3 minute timeout
- Best for: Comprehensive coverage, balanced depth, most use cases

### Extensive Research (32 agents, ~1-3 minutes)

For deep-dive analysis:

```
"Do extensive research on the future of autonomous vehicles"
```

**How it works:**
- Launches 32 agents (8 perplexity + 8 gemini + 8 claude + 8 grok)
- 10 minute timeout (usually completes much faster)
- 32 unique research angles for maximum coverage
- Best for: Complex topics, multi-domain analysis, comprehensive reports

## Research Agents

### perplexity-researcher

Uses Perplexity's Sonar models via MCP:
- `perplexity_search` - Fast web search with citations
- `perplexity_chat` - Conversational research (sonar-pro)
- `perplexity_research` - Deep research (sonar-deep-research)
- `perplexity_reasoning` - Advanced reasoning (sonar-reasoning-pro)

**Strengths:** Current information, citations, fast results

### gemini-researcher

Uses Google Gemini via MCP server (`gemini-mcp-tool`):
- `ask-gemini` - Ask Gemini questions for analysis

**Strengths:** Multi-perspective synthesis, creative angles, analytical depth, reasoning

### grok-researcher

Uses xAI Grok via MCP server (`grok-mcp`):
- `chat_completion` - Chat with Grok for analysis
- `function_calling` - Structured queries

**Strengths:** Alternative LLM perspective, reasoning capabilities, analysis

### claude-researcher

Uses Claude's built-in WebSearch:
- `WebSearch` - Native Claude web search

**Strengths:** Detailed analysis, academic focus, no API key needed

## How It Works

### Parallel Orchestration

1. **Query Decomposition**: Break research question into 3-24 sub-questions exploring different angles
2. **Parallel Launch**: Launch all agents simultaneously in single message for true parallelism
3. **Collection**: Wait for agents to return (hard timeout: 2/3/10 minutes depending on mode)
4. **Synthesis**: Analyze findings, identify patterns, rate confidence, provide recommendations

### Speed Comparison

- ❌ Sequential searches: 5-10 minutes
- ✅ Quick mode (4 agents): ~30-60 seconds
- ✅ Standard mode (12 agents): ~30-90 seconds
- ✅ Extensive mode (32 agents): ~1-3 minutes

Actual research time is usually faster than timeout limits.

## Output Format

Research findings include:

- **Summary**: Overview of what was researched
- **Key Insights**: Main discoveries organized by theme
- **Confidence Levels**: High/Medium/Low based on source corroboration
- **Source Attribution**: Which sources provided key findings
- **Contradictions**: Conflicting information across sources
- **Limitations**: Gaps or areas needing more investigation
- **Recommendations**: Actionable conclusions
- **Follow-Up**: Suggested next steps

## Examples

### Example 1: Technology Trend Research

```
User: "Research the adoption of WebAssembly in production applications"

Output:
- Summary of WASM adoption trends in 2025
- Key companies using WASM in production
- Performance benchmarks vs JavaScript
- Use cases: gaming, video editing, scientific computing
- Challenges: debugging, tooling maturity
- Confidence: High (multiple sources agree)
- Recommendation: Ready for production in specific use cases
```

### Example 2: Market Analysis

```
User: "Do extensive research on the electric vehicle battery market"

Output:
- Current market leaders and their technologies
- Supply chain analysis (lithium, cobalt sources)
- Emerging technologies (solid-state, sodium-ion)
- Cost trends and projections
- Environmental impact comparisons
- Regional market differences
- Investment trends and M&A activity
- 5-10 year outlook
- Confidence ratings for each area
- Contradictions noted (cost predictions vary widely)
```

## Troubleshooting

### MCP Servers Not Loading

Check logs:
```bash
tail -f ~/.claude/mcp-server.log
```

MCP servers are installed automatically via npx on first use - no manual building required.

### API Key Errors

Verify keys are set:
```bash
echo $PERPLEXITY_API_KEY
echo $GOOGLE_API_KEY
echo $XAI_API_KEY
```

Test API connectivity:
```bash
# Perplexity
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "sonar", "messages": [{"role": "user", "content": "test"}]}'
```

### Agents Timing Out

- Reduce number of agents (use Quick mode)
- Check API rate limits
- Verify network connection
- Some agents may be slow - system proceeds with partial results after timeout

### Rate Limits

- Perplexity: 20 requests/minute (free tier)
- Gemini: Check Google Cloud Console quotas
- Grok: Check xAI console limits

## Cost Considerations

Approximate costs per research session:

**Quick Mode (4 agents):**
- ~$0.01-0.04 total
- 4 API calls across services

**Standard Mode (12 agents):**
- ~$0.04-0.12 total
- 12 API calls across services

**Extensive Mode (32 agents):**
- ~$0.10-0.35 total
- 32 API calls across services

Actual costs depend on:
- Query complexity
- Response length
- Model selection (sonar vs sonar-pro vs sonar-deep-research)
- Provider pricing

## Architecture

```
Main Claude Session
    ↓
    ├─→ perplexity-researcher agents (via Perplexity MCP)
    ├─→ gemini-researcher agents (via Gemini MCP)
    ├─→ grok-researcher agents (via Grok MCP)
    └─→ claude-researcher agents (via WebSearch)
    ↓
Results collected and synthesized
    ↓
Comprehensive report with confidence ratings
```

## Development

### MCP Servers Used

The plugin uses existing community/official packages via npx:
- `@perplexity-ai/mcp-server` - Official Perplexity MCP server
- `@google/gemini-cli` - Official Google Gemini CLI with MCP support
- `grok-mcp` - Community Grok MCP server

### Testing MCP Tools

List available tools:
```bash
# In Claude Code session
Use the researcher agent and check available MCP tools
```

### Modifying Agents

Agent definitions are in `agents/*.md`. Edit to:
- Adjust research strategies
- Change model preferences
- Modify output formats
- Update tool selection logic

## License

MIT

## Credits

Created by Nick Nisi (nick@nisi.org)

Based on research orchestration concepts from the PAI (Personal AI Infrastructure) project.

Uses official and community MCP servers:
- `@perplexity-ai/mcp-server` - Official Perplexity MCP
- `gemini-mcp-tool` - Gemini CLI wrapper MCP
- `grok-mcp` - Community Grok MCP server

## Support

Issues: https://github.com/nicknisi/claude-plugins/issues
