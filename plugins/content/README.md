# Content Plugin

Tools for bootstrapping content creation including blog posts and conference talks.

## Skills

### blog-post-writer

Transforms brain dumps into polished blog posts in Nick Nisi's voice.

Use this when you have scattered ideas, talking points, and conclusions that need organization into a cohesive narrative with a conversational, authentic tone.

**Example usage:**
```
/blog-post-writer

[provide your brain dump of ideas, code examples, observations, etc.]
```

The skill will:
- Structure your unorganized thoughts
- Apply Nick's writing voice and tone
- Use Story Circle narrative framework when appropriate
- Create a complete blog post with proper pacing and flow

**Bundled references:**
- `voice-tone.md` - Writing style guide
- `story-circle.md` - Narrative framework

### conference-talk-builder

Creates conference talk outlines and iA Presenter markdown slides using the Story Circle narrative framework.

Use this when you need to structure a tech talk, create presentation slides, or organize talk ideas into a story-driven format.

**Example usage:**
```
/conference-talk-builder

I want to create a talk about [your topic]
```

The skill will:
- Gather information about your talk topic and audience
- Map your content to the 8-step Story Circle framework
- Generate properly formatted iA Presenter markdown slides
- Include speaker notes and code examples

**Bundled references:**
- `story-circle.md` - Eight-step narrative structure
- `ia-presenter-syntax.md` - iA Presenter markdown syntax

## Story Circle Framework

Both skills leverage the Story Circle narrative framework, which maps content to an eight-step journey:

1. Introduction - Current status quo
2. Problem Statement - What needs solving
3. Exploration - Initial attempts
4. Experimentation - Deep investigation
5. Solution - The breakthrough
6. Challenges - Implementation difficulties
7. Apply Knowledge - Integration
8. Results & Insights - Lessons learned

This structure helps create compelling narratives that engage audiences through a relatable journey.

## Installation

This plugin is located at `@plugins/content/` in your Claude plugins directory.

## Version

0.1.0
