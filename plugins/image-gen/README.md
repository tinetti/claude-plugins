# image-gen

Generate or edit images via Google Gemini (nano-banana-pro) or OpenAI (gpt-image-2) from Claude Code.

Adapted from [zackproser/nano-banana-pro](https://github.com/zackproser/nano-banana-pro) with added OpenAI support.

## Setup

Plugin users only need Node — the skill ships a pre-bundled JS file with deps inlined.

For marketplace maintainers building locally:

1. Install workspace dependencies and build:

   ```bash
   pnpm install
   pnpm run build
   ```

2. Set at least one provider key:

   ```bash
   export GEMINI_API_KEY="your-gemini-key"   # or GOOGLE_API_KEY
   export OPENAI_API_KEY="your-openai-key"
   ```

## Usage

Trigger the skill by asking Claude Code to "generate image", "create diagram", "edit image", or "make illustration".

### Generate

```bash
node plugins/image-gen/skills/image-gen/dist/generate_image.js \
  --prompt "a cat wearing a space helmet" \
  --filename "space-cat.png" \
  --provider openai \
  --resolution 2K \
  --quality high
```

### Edit

```bash
node plugins/image-gen/skills/image-gen/dist/generate_image.js \
  --prompt "make the background blue" \
  --filename "edited.png" \
  --input-image "original.png"
```

### Inpainting (OpenAI)

```bash
node plugins/image-gen/skills/image-gen/dist/generate_image.js \
  --prompt "replace the sky with aurora" \
  --filename "inpainted.png" \
  --input-image "photo.png" \
  --mask "sky-mask.png" \
  --provider openai
```

## Provider selection

- `--provider gemini` (default) or `--provider openai`
- If no `--provider` and only `OPENAI_API_KEY` is set, defaults to openai
- Otherwise defaults to gemini for back-compat

## Resolution

- `1K` → 1024px
- `2K` → 2048px
- `4K` → 4096px on Gemini; silently clamped to `3840x2160` on OpenAI (3840 is OpenAI's hard cap)
- `--size WxH` (OpenAI only) overrides `--resolution`; max edge 3840, multiples of 16
