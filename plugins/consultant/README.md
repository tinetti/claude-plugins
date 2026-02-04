# Consultant Plugin

Multi-model AI consultation and research for Claude Code. Get expert opinions from individual AI models or run parallel multi-agent research.

## Overview

The Consultant plugin provides three powerful modes:

**Consultation Mode:** Ask a single AI expert for focused analysis

- "Ask Gemini about this architecture"
- "Consult Codex on this bug"
- Fast: ~10-30 seconds

**Research Mode:** Launch 5-40 agents in parallel for comprehensive research

- "Quick research: TypeScript 5.7 features"
- "Research edge computing adoption"
- Fast: ~30 seconds to 3 minutes

**Deliberation Mode:** Agents debate, critique each other, and reach consensus

- "Deliberate on: REST vs GraphQL for our API"
- "Have the consultants debate this architecture decision"
- ~2-4 minutes (multi-round peer review)

## Quick Start

### Consultation Examples

```bash
# Ask a specific AI model
"Ask Gemini: What's the best way to implement rate limiting?"
"Consult Codex on this TypeScript error"
"What does Grok think about this API design?"
"Get Perplexity's research on Next.js 15 features"
```

### Research Examples

```bash
# Quick research (5 agents)
"Quick research: Latest developments in WebAssembly"

# Standard research (15 agents) - DEFAULT
"Research the current state of edge computing"

# Extensive research (40 agents)
"Do extensive research on AI agent architectures"
```

### Deliberation Examples

```bash
# Agents debate and reach consensus
"Deliberate on: Should we use TypeScript or Go for our backend microservices?"

# Peer review with critique
"Have the consultants debate: Monorepo vs polyrepo for our team of 20 engineers"

# Multi-round refinement
"What do the models think about using Tailwind CSS after discussing the trade-offs?"
```

## Prerequisites

**Required:**

- Claude Code installed
- Node.js 20+

**API Keys** (set what you plan to use):

```bash
export OPENAI_API_KEY="..."      # For GPT-5/Codex
export PERPLEXITY_API_KEY="..."  # For Perplexity
export GOOGLE_API_KEY="..."      # For Gemini
export GROK_API_KEY="..."        # For Grok
```

## Installation

1. Add the marketplace and install the plugin:

```bash
/plugin marketplace add nicknisi/claude-plugins
/plugin install consultant@nicknisi
```

2. Restart Claude Code

3. Verify MCP servers loaded:

```bash
/mcp
# Should show: gpt5-server, codex, perplexity, gemini-mcp-tool, grok
```

## Available Consultants

### codex (GPT-5 Codex)

**Best for:** Deep technical analysis, complex reasoning, architectural decisions

**MCP Tools:**

- `codex_generate` - Single-shot analysis
- `codex_messages` - Multi-turn conversation

**When to use:** Complex technical problems, debugging, architecture review

### gemini (Google Gemini)

**Best for:** Multi-perspective analysis, creative solutions, reasoning

**MCP Tools:**

- `ask-gemini` - Analysis and research queries

**When to use:** Alternative perspectives, creative problem-solving, synthesis

### grok (xAI Grok-4)

**Best for:** Alternative LLM perspective, different training approach

**MCP Tools:**

- `grok_send_message` - Send analysis requests

**When to use:** Second opinion, different perspective, comparison

### perplexity (Perplexity Sonar)

**Best for:** Current web information, citations, fast research

**MCP Tools:**

- `perplexity_search` - Quick web search
- `perplexity_research` - Deep research (sonar-deep-research)
- `perplexity_reasoning` - Reasoning tasks (sonar-reasoning-pro)
- `perplexity_chat` - Conversational research

**When to use:** Need current web data, want citations, research latest info

### claude (Claude WebSearch)

**Best for:** Detailed web research, synthesis, built-in (no API key)

**Tools:**

- `WebSearch` - Claude's built-in web search

**When to use:** Don't want to use API credits, need web research

## Detailed Usage Examples

### Consultation Mode

#### Example 1: Architecture Decision

**Prompt:**

```
"Ask Gemini: I'm building a real-time collaborative editor. Should I use CRDTs,
Operational Transformation, or a simpler last-write-wins approach? Consider
scalability, complexity, and developer experience."
```

**What happens:**

- Launches 1 gemini-researcher agent
- Agent calls `mcp__gemini-mcp-tool__ask-gemini` with your question
- Returns Gemini's multi-perspective analysis in ~15-20 seconds
- Includes pros/cons, recommendations, trade-offs

#### Example 2: Debugging Assistance

**Prompt:**

```
"Consult Codex on this: I'm getting 'Type instantiation is excessively deep'
error in TypeScript when composing multiple utility types. Here's the code:
[paste code]
What's the root cause and how do I fix it?"
```

**What happens:**

- Launches 1 codex-researcher agent
- Agent calls `mcp__codex__codex_generate` with high reasoning
- Returns GPT-5's deep technical analysis with step-by-step solution
- ~20-30 seconds

#### Example 3: Current Information Lookup

**Prompt:**

```
"Get Perplexity's research on: What are the major security vulnerabilities
discovered in popular JavaScript frameworks in 2025?"
```

**What happens:**

- Launches 1 perplexity-researcher agent
- Agent calls `mcp__perplexity__perplexity_research` (sonar-deep-research)
- Returns current web research with citations
- ~15-25 seconds

#### Example 4: Alternative Perspective

**Prompt:**

```
"What does Grok think about using Server Components vs Client Components in
Next.js for a dashboard application?"
```

**What happens:**

- Launches 1 grok-researcher agent
- Agent calls `mcp__grok__grok_send_message`
- Returns Grok's alternative perspective
- ~15-20 seconds

### Research Mode

#### Example 1: Quick Research for Fast Answers

**Prompt:**

```
"Quick research: What are the main differences between Bun, Deno, and Node.js
in 2025?"
```

**What happens:**

1. Main session decomposes into 5 focused questions:
   - "Bun vs Node.js performance benchmarks 2025"
   - "Deno security features and built-in tools"
   - "Bun compatibility with Node.js ecosystem"
   - "Developer adoption trends for Bun vs Deno"
   - "Production readiness comparison across all three"

2. Launches 5 agents in parallel (1 of each type):
   - perplexity-researcher: Web search for benchmarks
   - claude-researcher: WebSearch for adoption trends
   - gemini-researcher: Analysis of trade-offs
   - codex-researcher: Technical comparison
   - grok-researcher: Alternative perspective

3. Collects results in ~30-60 seconds

4. Synthesizes into comprehensive answer with:
   - Key differences organized by category
   - Confidence ratings
   - Source attribution
   - Recommendations

#### Example 2: Standard Research for Comprehensive Coverage

**Prompt:**

```
"Research: What are the best practices for implementing authentication in a
modern SaaS application?"
```

**What happens:**

1. Main session decomposes into 15 sub-questions:
   - "OAuth 2.0 vs SAML for enterprise SSO"
   - "Session management best practices 2025"
   - "JWT security considerations and alternatives"
   - "Password hashing algorithms comparison"
   - "MFA implementation patterns"
   - "Social login integration security"
   - "API key management for service accounts"
   - "Role-based access control (RBAC) patterns"
   - "Authentication library comparison (Passport, Auth.js, etc.)"
   - "Token refresh strategies"
   - (5 more angles...)

2. Launches 15 agents (3 of each type) in SINGLE message

3. Each agent type focuses on different aspects:
   - 3 perplexity agents: Current best practices, library comparisons, security trends
   - 3 claude agents: Detailed technical patterns, implementation guides
   - 3 gemini agents: Architecture trade-offs, design patterns
   - 3 codex agents: Technical deep-dives, code examples
   - 3 grok agents: Alternative approaches, comparisons

4. Synthesizes in ~60-90 seconds with:
   - Organized findings by theme (not by agent)
   - High confidence for corroborated findings (multiple sources agree)
   - Medium confidence for partial agreement
   - Contradictions flagged
   - Clear recommendations

#### Example 3: Extensive Research for Deep Analysis

**Prompt:**

```
"Do extensive research on: The current state and future of Rust for systems
programming. Include adoption trends, ecosystem maturity, performance vs C++,
learning curve considerations, and industry case studies."
```

**What happens:**

1. Main session creates 40 diverse research angles:
   - Current adoption statistics by industry
   - Major companies using Rust in production
   - Rust vs C++ performance benchmarks
   - Memory safety advantages in practice
   - Async runtime ecosystem analysis
   - Rust for embedded systems
   - WebAssembly + Rust use cases
   - Learning curve data and developer surveys
   - Corporate training programs
   - Open source project trends
   - (30 more creative angles...)

2. Launches 40 agents (8 of each type)

3. Each agent type contributes:
   - 8 perplexity agents: Current data, statistics, case studies
   - 8 claude agents: Detailed analysis, technical comparisons
   - 8 gemini agents: Multi-angle synthesis, trend analysis
   - 8 codex agents: Deep technical evaluation, code ecosystem
   - 8 grok agents: Alternative viewpoints, critical analysis

4. Comprehensive synthesis in ~1-3 minutes:
   - Organized into major themes
   - Confidence levels for each theme
   - Conflicting information highlighted
   - Source attribution (which agents found what)
   - Expert recommendations
   - Follow-up research suggestions

## Consultation vs Research - When to Use What

### Consultation Mode Scenarios

**Scenario:** "I'm stuck debugging this issue and need a second opinion"

```
"Consult Codex: I'm getting race conditions in my React state updates.
The component re-renders multiple times. [paste code]. What's causing this?"
```

**Why consultation:** Single focused expert opinion, fast answer, cheap

---

**Scenario:** "I want to compare two approaches"

```
"Ask Gemini: For a chat application, should I use WebSockets, Server-Sent
Events, or HTTP polling? Consider reliability, scalability, and mobile support."
```

**Why consultation:** One model can analyze trade-offs, faster than research

---

**Scenario:** "Need current information fast"

```
"Get Perplexity's research on the latest Next.js 15 App Router features"
```

**Why consultation:** Perplexity excels at current web research with citations

### Research Mode Scenarios

**Scenario:** "Evaluating a major technology decision"

```
"Research: Should we migrate our monolith to microservices? We have 50 engineers,
$10M ARR, and growing 30% YoY."
```

**Why research:** Multiple perspectives reveal blind spots, higher confidence through consensus

---

**Scenario:** "Learning a new technology area"

```
"Do extensive research on edge computing platforms: Cloudflare Workers, AWS
Lambda@Edge, Deno Deploy, Fastly Compute. Compare features, pricing, DX, and
use cases."
```

**Why research:** Comprehensive coverage across multiple dimensions

---

**Scenario:** "Fact-checking critical information"

```
"Quick research: Is it true that TypeScript 5.7 adds built-in pattern matching?"
```

**Why research:** Multiple sources confirm or deny, catch misinformation

---

### Deliberation Mode Scenarios

**Scenario:** "Critical architecture decision with high stakes"

```
"Deliberate on: Should we adopt Event Sourcing for our financial transaction
system? Consider complexity, audit requirements, scalability, and team expertise."
```

**Why deliberation:** Multiple rounds catch flaws, agents challenge each other's assumptions, consensus reduces risk

---

**Scenario:** "Comparing approaches with strong trade-offs"

```
"Have the consultants debate: Server-side rendering vs Static generation vs
Client-side rendering for our marketing site with 1M monthly visitors"
```

**Why deliberation:** Agents critique each other, reveal hidden trade-offs, converge on nuanced recommendation

---

**Scenario:** "Validating technical claims"

```
"Peer review: Is it feasible to migrate our 500K line Python codebase to Rust?
What would it take and is it worth it?"
```

**Why deliberation:** Multi-round review catches optimistic/pessimistic biases, realistic assessment through debate

## Deliberation Mode Deep Dive

### How Deliberation Works

**Full Example: "Deliberate on: Use PostgreSQL or MongoDB for our analytics platform"**

**Round 1: Initial Perspectives (~30 seconds)**

Launches 5 agents simultaneously, each provides initial stance:

```
codex-researcher:
"PostgreSQL. ACID guarantees critical for analytics accuracy.
JSONB handles semi-structured data. Mature ecosystem."

gemini-researcher:
"MongoDB. Flexible schema evolution as analytics needs change.
Horizontal scaling for growing data. Aggregation pipeline."

perplexity-researcher:
"Recent benchmarks show PostgreSQL with TimescaleDB competitive
for time-series analytics. MongoDB Atlas gaining traction."

claude-researcher:
"Depends on query patterns. PostgreSQL better for complex joins,
MongoDB better for denormalized aggregations."

grok-researcher:
"Consider hybrid: PostgreSQL for source of truth, MongoDB for
read-optimized analytics views."
```

**Round 2: Critique & Challenge (~45 seconds)**

Share Round 1 with all agents, each critiques others:

```
codex → gemini:
"Schema flexibility is overstated. PostgreSQL's JSONB + migrations
handles evolution well. MongoDB's lack of joins complicates analytics."

gemini → codex:
"ACID is overkill for analytics workloads. Eventually consistent is
fine. Codex didn't address horizontal scaling - PostgreSQL sharding
is complex."

perplexity → all:
"Missing consideration: operational complexity. PostgreSQL has
broader expertise pool. MongoDB requires specialized knowledge."

claude → grok:
"Hybrid adds operational overhead. Two databases to maintain,
sync, monitor. Only worth it at massive scale."

grok → claude:
"Fair point. But Claude's 'depends' answer isn't actionable.
Need recommendation based on stated analytics use case."
```

**Round 3: Refinement (~45 seconds)**

Agents revise positions based on critiques:

```
codex-researcher (revised):
"Maintaining PostgreSQL position BUT acknowledging Gemini's scaling point.
Recommend PostgreSQL with Citus extension for horizontal scaling.
Addresses both ACID and scale concerns."

gemini-researcher (revised):
"Conceding to Codex and Perplexity on operational complexity.
PostgreSQL + TimescaleDB hybrid approach actually handles our needs.
MongoDB's flexibility advantage is smaller than I claimed."

perplexity-researcher (added data):
"New finding: 73% of analytics platforms use PostgreSQL in 2025.
MongoDB dropped from 31% to 24%. Market trend supports PostgreSQL."

claude-researcher (specific recommendation):
"Based on discussion: PostgreSQL with TimescaleDB for time-series,
Citus for horizontal scaling if needed. Proven approach."

grok-researcher (consensus):
"Agree with emerging PostgreSQL consensus. Hybrid was over-engineering.
Single database with right extensions handles requirements."
```

**Round 4: Final Synthesis (main session)**

```
CONSENSUS ACHIEVED:
✓ All 5 agents converged on PostgreSQL-based solution
✓ Extensions: TimescaleDB for time-series, Citus if scaling needed
✓ Operational simplicity preferred over MongoDB flexibility

KEY INSIGHTS FROM DELIBERATION:
- Codex's initial ACID argument was valid
- Gemini's scaling concern addressed via Citus extension
- Perplexity's market data (73% adoption) confirms consensus
- Claude provided actionable specificity
- Grok identified and eliminated over-engineering (hybrid)

UNRESOLVED DISAGREEMENTS:
- None (full consensus reached)

CONFIDENCE: HIGH (all 5 agents agree after critique rounds)

RECOMMENDATION: Use PostgreSQL with TimescaleDB extension
```

### When to Use Deliberation Mode

**Use deliberation when:**

- Decision has major consequences (architecture, tech stack, migrations)
- Single expert opinion feels risky
- Want to catch errors through peer review
- Need consensus to increase confidence
- Trade-offs are complex and non-obvious
- Willing to wait 2-4 minutes for higher quality

**Skip deliberation when:**

- Simple factual questions (use consultation)
- Need speed over depth (use research)
- Low-stakes decisions
- Already confident in direction

### Deliberation Benefits

**Error Detection:**

- Agents catch each other's mistakes
- Challenge questionable assumptions
- Validate technical claims

**Consensus Building:**

- Convergence indicates strong recommendation
- Persistent disagreement reveals genuine trade-offs
- Nuanced positions emerge through debate

**Higher Quality:**

- Multi-round refinement improves answers
- Peer review reduces overconfidence
- Final synthesis benefits from all perspectives

## Research Mode Usage

### Quick Research (5 agents, ~30-60 seconds)

```
"Quick research: What are the latest features in Bun 1.2?"
```

**What happens:**

- Decomposes into 5 sub-questions
- Launches 5 agents (1 perplexity + 1 claude + 1 gemini + 1 codex + 1 grok)
- Each researches different angle
- Synthesizes findings in ~30-60 seconds

### Standard Research (15 agents, ~30-90 seconds) [DEFAULT]

```
"Research serverless database options for high-traffic apps"
```

**What happens:**

- Decomposes into 15 sub-questions
- Launches 15 agents (3 of each type)
- Comprehensive multi-source coverage
- Confidence ratings based on corroboration

### Extensive Research (40 agents, ~1-3 minutes)

```
"Do extensive research on the future of WebGPU in browsers"
```

**What happens:**

- Decomposes into 40 unique angles
- Launches 40 agents (8 of each type)
- Maximum coverage and depth
- Detailed confidence analysis

## Cost Comparison

### Consultation Mode

- ~$0.002-0.02 per consultation
- Single API call
- Fast and cheap for focused questions

### Research Mode

- Quick (5 agents): ~$0.01-0.05
- Standard (15 agents): ~$0.05-0.15
- Extensive (40 agents): ~$0.15-0.40

## When to Use Which Mode

**Use Consultation When:**

- Need one expert opinion quickly
- Want specific model's perspective
- Debugging or second opinion
- Testing different model approaches
- Cost-conscious (single API call)

**Use Research When:**

- Need comprehensive coverage
- Want multiple perspectives
- Checking for consensus
- Exploring complex topics
- Higher confidence needed

## API Key Setup

### OpenAI (GPT-5/Codex)

1. https://platform.openai.com/api-keys
2. `export OPENAI_API_KEY="sk-..."`

### Perplexity

1. https://www.perplexity.ai/settings/api
2. `export PERPLEXITY_API_KEY="pplx-..."`

### Google Gemini

1. https://aistudio.google.com/app/apikey
2. `export GOOGLE_API_KEY="AIza..."`

### xAI Grok

1. https://console.x.ai/
2. `export GROK_API_KEY="xai-..."`

Add to `~/.zshrc` or `~/.bashrc` to persist.

## Troubleshooting

### MCP Servers Not Loading

```bash
/mcp
# Check which servers are connected
```

If any show as failed, check API keys are set.

### Agent Using Wrong Tools

Each agent is strictly limited to its own tools. If you see errors:

- Agent will report the failure
- Agent will NOT fall back to other tools
- This is intentional - failures are visible

### Grok Not Working

Ensure you set `GROK_API_KEY` (not `XAI_API_KEY`):

```bash
export GROK_API_KEY="${XAI_API_KEY}"  # If you have XAI_API_KEY
# Or set directly:
export GROK_API_KEY="your-grok-key"
```

## License

MIT

## Credits

Created by Nick Nisi (nick@nisi.org)

Merges consultation and research patterns for maximum flexibility.
