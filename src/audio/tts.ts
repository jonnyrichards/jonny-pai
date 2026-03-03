const TTS_URL = "https://api.openai.com/v1/audio/speech";
const MAX_TTS_CHARS = 4096;

export async function textToSpeech(
  text: string,
  apiKey: string,
  voice = "ash",
  model = "gpt-4o-mini-tts",
): Promise<Buffer> {
  // Split long texts into chunks
  if (text.length > MAX_TTS_CHARS) {
    const chunks = splitText(text, MAX_TTS_CHARS);
    const buffers: Buffer[] = [];
    for (const chunk of chunks) {
      const buf = await callTtsApi(chunk, apiKey, voice, model);
      buffers.push(buf);
    }
    return Buffer.concat(buffers);
  }

  return callTtsApi(text, apiKey, voice, model);
}

async function callTtsApi(
  text: string,
  apiKey: string,
  voice: string,
  model: string,
): Promise<Buffer> {
  const res = await fetch(TTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      voice,
      input: text,
      response_format: "opus",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TTS API ${res.status}: ${body}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

function splitText(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    let splitAt = remaining.lastIndexOf(". ", maxLen);
    if (splitAt <= 0) splitAt = remaining.lastIndexOf("\n", maxLen);
    if (splitAt <= 0) splitAt = remaining.lastIndexOf(" ", maxLen);
    if (splitAt <= 0) splitAt = maxLen;

    chunks.push(remaining.slice(0, splitAt + 1).trim());
    remaining = remaining.slice(splitAt + 1).trim();
  }

  if (remaining.trim()) {
    chunks.push(remaining.trim());
  }

  return chunks;
}
