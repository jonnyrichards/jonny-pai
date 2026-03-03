const WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions";

export async function transcribeAudio(
  buffer: Buffer,
  apiKey: string,
): Promise<string> {
  const form = new FormData();
  form.append(
    "file",
    new Blob([new Uint8Array(buffer)], { type: "audio/ogg" }),
    "voice.ogg",
  );
  form.append("model", "whisper-1");

  const res = await fetch(WHISPER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Whisper API ${res.status}: ${body}`);
  }

  const data = (await res.json()) as { text: string };
  return data.text.trim();
}
