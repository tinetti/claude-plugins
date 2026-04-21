import { GoogleGenAI } from "@google/genai";
import OpenAI, { toFile } from "openai";
import { parseArgs } from "node:util";
import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type Provider = "gemini" | "openai";
type Resolution = "1K" | "2K" | "4K";
type Quality = "low" | "medium" | "high" | "auto";

const OPENAI_RESOLUTION_MAP: Record<Resolution, string> = {
  "1K": "1024x1024",
  "2K": "2048x2048",
  "4K": "3840x2160",
};

const GEMINI_RESOLUTION_MAP: Record<Resolution, number> = {
  "1K": 1024,
  "2K": 2048,
  "4K": 4096,
};

const { values } = parseArgs({
  options: {
    prompt: { type: "string" },
    filename: { type: "string" },
    "input-image": { type: "string" },
    mask: { type: "string" },
    resolution: { type: "string", default: "1K" },
    size: { type: "string" },
    quality: { type: "string" },
    provider: { type: "string" },
    "api-key": { type: "string" },
  },
  strict: true,
});

function die(msg: string): never {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

if (!values.prompt || !values.filename) {
  die(
    "Usage: generate_image.ts --prompt <text> --filename <output.png> [--provider gemini|openai] [--input-image <path>] [--mask <path>] [--resolution 1K|2K|4K] [--size WxH] [--quality low|medium|high|auto] [--api-key <key>]",
  );
}

const resolution = values.resolution as Resolution;
if (!(resolution in GEMINI_RESOLUTION_MAP)) {
  die(`Invalid --resolution "${resolution}". Use 1K, 2K, or 4K.`);
}

const provider = resolveProvider(values.provider, values["api-key"]);
const apiKey = resolveApiKey(provider, values["api-key"]);

if (values.mask && provider !== "openai") {
  die("--mask is only supported with --provider openai.");
}
if (values.mask && !values["input-image"]) {
  die("--mask requires --input-image.");
}
if (values.quality && provider !== "openai") {
  console.warn("Warning: --quality is ignored for Gemini.");
}
if (values.size && provider !== "openai") {
  console.warn("Warning: --size is ignored for Gemini; use --resolution instead.");
}

const outPath = resolve(values.filename);
await mkdir(dirname(outPath), { recursive: true });

const imageBase64 =
  provider === "openai"
    ? await runOpenAI({
        apiKey,
        prompt: values.prompt,
        inputImage: values["input-image"],
        mask: values.mask,
        size: values.size ?? OPENAI_RESOLUTION_MAP[resolution],
        quality: (values.quality as Quality | undefined) ?? "auto",
      })
    : await runGemini({
        apiKey,
        prompt: values.prompt,
        inputImage: values["input-image"],
      });

await writeFile(outPath, Buffer.from(imageBase64, "base64"));
console.log(`Image saved to: ${outPath}`);

function resolveProvider(flag: string | undefined, apiKeyFlag: string | undefined): Provider {
  if (flag) {
    if (flag !== "gemini" && flag !== "openai") {
      die(`Invalid --provider "${flag}". Use "gemini" or "openai".`);
    }
    return flag;
  }
  // Default: prefer gemini for back-compat with the former nano-banana-pro skill.
  // If only OPENAI_API_KEY is set (and no Gemini key, and no --api-key), route to openai.
  const hasGemini = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  if (!apiKeyFlag && !hasGemini && hasOpenAI) return "openai";
  return "gemini";
}

function resolveApiKey(p: Provider, flag: string | undefined): string {
  if (flag) return flag;
  if (p === "openai") {
    const k = process.env.OPENAI_API_KEY;
    if (!k) die("No OpenAI key. Pass --api-key or set OPENAI_API_KEY.");
    return k;
  }
  const k = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!k) die("No Gemini key. Pass --api-key or set GEMINI_API_KEY / GOOGLE_API_KEY.");
  return k;
}

async function runGemini(args: {
  apiKey: string;
  prompt: string;
  inputImage?: string;
}): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: args.apiKey });
  const contents: Array<
    { inlineData: { mimeType: string; data: string } } | { text: string }
  > = [];

  if (args.inputImage) {
    const imageData = await readFile(args.inputImage);
    contents.push({
      inlineData: {
        mimeType: "image/png",
        data: imageData.toString("base64"),
      },
    });
  }
  contents.push({ text: args.prompt });

  const response = await ai.models.generateContent({
    model: "nano-banana-pro-preview",
    contents,
    config: { responseModalities: ["image", "text"] },
  });

  const part = response.candidates?.[0]?.content?.parts?.find((p) =>
    p.inlineData?.mimeType?.startsWith("image/"),
  );
  if (!part?.inlineData?.data) {
    die("Gemini returned no image in the response.");
  }
  return part.inlineData.data;
}

async function runOpenAI(args: {
  apiKey: string;
  prompt: string;
  inputImage?: string;
  mask?: string;
  size: string;
  quality: Quality;
}): Promise<string> {
  const client = new OpenAI({ apiKey: args.apiKey });

  if (args.inputImage) {
    const image = await toFile(createReadStream(args.inputImage), null, {
      type: "image/png",
    });
    const mask = args.mask
      ? await toFile(createReadStream(args.mask), null, { type: "image/png" })
      : undefined;

    const result = await client.images.edit({
      model: "gpt-image-2",
      image,
      ...(mask ? { mask } : {}),
      prompt: args.prompt,
      size: args.size as never,
    });
    const b64 = result.data?.[0]?.b64_json;
    if (!b64) die("OpenAI returned no image in the edit response.");
    return b64;
  }

  const result = await client.images.generate({
    model: "gpt-image-2",
    prompt: args.prompt,
    size: args.size as never,
    quality: args.quality as never,
  });
  const b64 = result.data?.[0]?.b64_json;
  if (!b64) die("OpenAI returned no image in the generate response.");
  return b64;
}
