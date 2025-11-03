# GPT-5 Consultant Plugin

Ask GPT-5 to consult on your task via MCP (Model Context Protocol).

## Requirements

This plugin requires an OpenAI API key with access to GPT-5 models.

### Setting up your API key

The plugin reads the `OPENAI_API_KEY` environment variable. Set it in your shell configuration:

**bash/zsh:**

```bash
export OPENAI_API_KEY="your-api-key-here"
```

**fish:**

```fish
set -x OPENAI_API_KEY "your-api-key-here"
```

Alternatively, set it in your Claude Code configuration before starting the application.

## Features

- **gpt5_generate** - Generate text using GPT-5 with a simple input prompt
- **gpt5_messages** - Generate text using GPT-5 with structured conversation messages

Both tools support:

- Custom system instructions
- Reasoning effort levels (low, medium, high)
- Token usage reporting

## Installation

This plugin is part of the nicknisi/claude-plugins marketplace.

After installation, ensure your `OPENAI_API_KEY` environment variable is set before using the plugin.
