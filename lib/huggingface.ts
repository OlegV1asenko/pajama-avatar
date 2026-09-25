import { buildAvatarPrompt, buildNegativePrompt, type Gender } from "./promptBuilder";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export interface GenerateAvatarOptions {
  gender: Gender;
  pajamaColor?: string;
}

// Called directly from the browser (client-side) to avoid Vercel Hobby outbound restrictions
export async function generateAvatarClientSide(
  options: GenerateAvatarOptions,
  hfToken: string
): Promise<{ imageUrl: string }> {
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

  if (response.status === 503) {
    // Model is loading (cold start)
    throw new Error("MODEL_LOADING");
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HuggingFace API error ${response.status}: ${err}`);
  }

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  return { imageUrl };
}
