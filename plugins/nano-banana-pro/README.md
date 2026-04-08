# nano-banana-pro

Generate or edit images via Google's Gemini API from Claude Code.

Ported from [zackproser/nano-banana-pro](https://github.com/zackproser/nano-banana-pro) (Python) to TypeScript.

## Setup

1. Install marketplace dependencies:

   ```bash
   pnpm install
   ```

2. Set your Gemini API key:

   ```bash
   export GEMINI_API_KEY="your-key-here"
   ```

## Usage

Trigger the skill by asking Claude Code to "generate image", "create diagram", "edit image", or "make illustration".

### Generate a new image

```bash
tsx plugins/nano-banana-pro/skills/nano-banana-pro/scripts/generate_image.ts \
  --prompt "a cat wearing a space helmet" \
  --filename "space-cat.png"
```

### Edit an existing image

```bash
tsx plugins/nano-banana-pro/skills/nano-banana-pro/scripts/generate_image.ts \
  --prompt "make the background blue" \
  --filename "edited.png" \
  --input-image "original.png"
```

### API Key

Resolved in order: `--api-key` flag > `GEMINI_API_KEY` env > `GOOGLE_API_KEY` env.
