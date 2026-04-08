import { GoogleGenAI } from "@google/genai";
import { parseArgs } from "node:util";
import { mkdir, writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const RESOLUTION_MAP: Record<string, number> = {
  "1K": 1024,
  "2K": 2048,
  "4K": 4096,
};

function getApiKey(argsKey?: string): string {
  const key = argsKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) {
    console.error("Error: No API key found. Pass --api-key or set GEMINI_API_KEY / GOOGLE_API_KEY.");
    process.exit(1);
  }
  return key;
}

const { values } = parseArgs({
  options: {
    prompt: { type: "string" },
    filename: { type: "string" },
    "input-image": { type: "string" },
    resolution: { type: "string", default: "1K" },
    "api-key": { type: "string" },
  },
  strict: true,
});

if (!values.prompt || !values.filename) {
  console.error("Usage: generate_image.ts --prompt <text> --filename <output.png> [--input-image <path>] [--resolution 1K|2K|4K] [--api-key <key>]");
  process.exit(1);
}

const apiKey = getApiKey(values["api-key"]);
const ai = new GoogleGenAI({ apiKey });

const contents: Array<{ inlineData: { mimeType: string; data: string } } | { text: string }> = [];

if (values["input-image"]) {
  const imageData = await readFile(values["input-image"]);
  contents.push({
    inlineData: {
      mimeType: "image/png",
      data: imageData.toString("base64"),
    },
  });
}
contents.push({ text: values.prompt });

const response = await ai.models.generateContent({
  model: "gemini-3-pro-image-preview",
  contents,
  config: {
    responseModalities: ["image", "text"],
  },
});

const part = response.candidates?.[0]?.content?.parts?.find(
  (p) => p.inlineData?.mimeType?.startsWith("image/"),
);

if (!part?.inlineData?.data) {
  console.error("Error: No image was generated in the response.");
  process.exit(1);
}

const outPath = resolve(values.filename);
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, Buffer.from(part.inlineData.data, "base64"));
console.log(`Image saved to: ${outPath}`);
