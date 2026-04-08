---
name: nano-banana-pro
description: Generate or edit images via Google Gemini API. Trigger: "generate image", "create diagram", "edit image", "make illustration". Supports 1K/2K/4K resolution.
---

# Nano Banana Pro Image Generation & Editing

Generate new images or edit existing ones using Google's Gemini image generation API.

## Usage

Run the script using tsx (do NOT cd to skill directory):

**Generate new image:**
```
tsx ${CLAUDE_PLUGIN_ROOT}/skills/nano-banana-pro/scripts/generate_image.ts --prompt "your description" --filename "output.png" [--resolution 1K|2K|4K] --api-key KEY
```

**Edit existing image:**
```
tsx ${CLAUDE_PLUGIN_ROOT}/skills/nano-banana-pro/scripts/generate_image.ts --prompt "editing instructions" --filename "output.png" --input-image "path/to/input.png" [--resolution 1K|2K|4K] --api-key KEY
```

## Resolution Options
- **1K** (default) - ~1024px
- **2K** - ~2048px
- **4K** - ~4096px

## API Key
The script checks for API key in this order:
1. `--api-key` argument
2. `GEMINI_API_KEY` environment variable
3. `GOOGLE_API_KEY` environment variable

## Filename Convention
Use the pattern: `YYYY-MM-DD-HH-MM-SS-descriptive-name.png`

## For Blog Diagrams
When generating diagrams for blog posts, save them to the appropriate content directory (e.g., `src/content/blog/post-name/`) and use descriptive filenames. Prefer clean, minimalist diagram styles with clear labels.

## Output
- Saves PNG to the specified path
- Script prints the full path to the saved image
- Do not read the image back - inform the user of the saved path
