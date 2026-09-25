import { buildAvatarPrompt, buildNegativePrompt, type Gender } from "./promptBuilder";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export interface GenerateAvatarOptions {
  gender: Gender;
  pajamaColor?: string;
}

export interface GenerateAvatarResult {
  imageBase64: string;
  mimeType: string;
}

export async function generateAvatarWithHF(
  options: GenerateAvatarOptions,
  hfToken: string
): Promise<GenerateAvatarResult> {
  const prompt = buildAvatarPrompt({
    gender: options.gender,
    pajamaColor: options.pajamaColor ?? "light blue",
    style: "digital art illustration",
  });
  const negativePrompt = buildNegativePrompt();

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        negative_prompt: negativePrompt,
        num_inference_steps: 30,
        guidance_scale: 7.5,
        width: 512,
        height: 768,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} — ${err}`);
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return {
    imageBase64: base64,
    mimeType: blob.type || "image/jpeg",
  };
}
