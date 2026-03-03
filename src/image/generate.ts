import { readFile } from "node:fs/promises";
import { extname } from "node:path";

const GENERATIONS_URL = "https://api.openai.com/v1/images/generations";
const EDITS_URL = "https://api.openai.com/v1/images/edits";

export interface ImageOptions {
  model?: string;
  size?: string;
  quality?: string;
}

export async function generateImage(
  prompt: string,
  apiKey: string,
  options: ImageOptions = {},
): Promise<Buffer> {
  const model = options.model ?? "gpt-image-1";
  const size = options.size ?? "1024x1024";
  const quality = options.quality ?? "medium";

  const res = await fetch(GENERATIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      size,
      quality,
      output_format: "png",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Image generation API ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    data: Array<{ b64_json: string }>;
  };

  if (!data.data?.[0]?.b64_json) {
    throw new Error("Image generation API returned no image data");
  }

  return Buffer.from(data.data[0].b64_json, "base64");
}

function mimeFromPath(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return map[ext] ?? "image/png";
}

export async function editImage(
  prompt: string,
  imagePath: string,
  apiKey: string,
  options: ImageOptions = {},
): Promise<Buffer> {
  const model = options.model ?? "gpt-image-1";
  const size = options.size ?? "1024x1024";
  const quality = options.quality ?? "medium";

  const imageBuffer = await readFile(imagePath);
  const mime = mimeFromPath(imagePath);
  const b64 = imageBuffer.toString("base64");
  const dataUrl = `data:${mime};base64,${b64}`;

  const res = await fetch(EDITS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      size,
      quality,
      output_format: "png",
      images: [{ image_url: dataUrl }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Image edit API ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    data: Array<{ b64_json: string }>;
  };

  if (!data.data?.[0]?.b64_json) {
    throw new Error("Image edit API returned no image data");
  }

  return Buffer.from(data.data[0].b64_json, "base64");
}
