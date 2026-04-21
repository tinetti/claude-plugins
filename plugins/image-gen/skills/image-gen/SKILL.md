---
name: image-gen
description: Generate or edit images via Google Gemini (nano-banana-pro) or OpenAI gpt-image-2. Trigger: "generate image", "create diagram", "edit image", "make illustration". Supports 1K/2K/4K resolution, masked inpainting, and text-accurate generation.
---

# Image Generation & Editing

Multi-provider image generation. Default provider is Gemini (nano-banana-pro); pass `--provider openai` to use gpt-image-2.

## Which provider to pick

- **Gemini (default):** general illustrations, quick diagrams, visual imagery.
- **OpenAI:** anything where text rendering matters (infographics, slide-like images, dense-label diagrams, logos with text) or when you need masked inpainting on edits.

## Usage

The skill ships a pre-bundled Node script — no tsx or dependency install required on the user side. Invoke with `node`:

**Generate:**
```
node ${CLAUDE_PLUGIN_ROOT}/skills/image-gen/dist/generate_image.js \
  --prompt "your description" --filename "output.png" \
  [--provider gemini|openai] [--resolution 1K|2K|4K] [--size WxH] [--quality low|medium|high|auto] [--api-key KEY]
```

**Edit (image-to-image):**
```
node ${CLAUDE_PLUGIN_ROOT}/skills/image-gen/dist/generate_image.js \
  --prompt "editing instructions" --filename "output.png" \
  --input-image "path/to/input.png" [--mask "path/to/mask.png"]
```

## Resolution

- `1K` (default) — 1024px
- `2K` — 2048px
- `4K` — 4096px on Gemini; silently clamped to `3840x2160` on OpenAI (OpenAI's hard cap is 3840).
- `--size WxH` (OpenAI only) overrides `--resolution`. Max edge 3840, both edges must be multiples of 16.

## Quality (OpenAI only)

`low | medium | high | auto` (default `auto`). Ignored on Gemini with a warning.

## Masks (OpenAI only)

`--mask <path>` enables inpainting. Requires `--input-image`. Error if used with Gemini.

## API keys

Resolution order:
1. `--api-key` flag (applied to selected provider)
2. Provider-specific env:
   - Gemini: `GEMINI_API_KEY` or `GOOGLE_API_KEY`
   - OpenAI: `OPENAI_API_KEY`

## Filename convention

`YYYY-MM-DD-HH-MM-SS-descriptive-name.png`

## For blog diagrams

Use OpenAI at `2K` for anything with readable labels or callouts. Save to the appropriate content dir (e.g., `src/content/blog/post-name/`). Prefer clean, minimalist styles.

## Output

- Saves PNG to the specified path.
- Script prints the full saved path.
- Do not read the image back — inform the user of the path.
