import { buildAvatarPrompt, type Gender } from "./promptBuilder";

export interface GenerateAvatarOptions {
  gender: Gender;
  pajamaColor?: string;
}

// Client-side AI image generator:
// Uses Pollinations AI (free, ultra-fast, zero-token, full CORS) with HF router fallback
export async function generateAvatarClientSide(
  options: GenerateAvatarOptions,
  hfToken?: string
): Promise<{ imageUrl: string }> {
  const prompt = buildAvatarPrompt({
    gender: options.gender,
    pajamaColor: options.pajamaColor ?? "light blue",
    style: "digital art illustration",
  });

  const seed = Math.floor(Math.random() * 1000000);
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=512&height=768&nologo=true&seed=${seed}`;

  try {
    const res = await fetch(pollinationsUrl);
    if (!res.ok) {
      throw new Error(`Pollinations status: ${res.status}`);
    }
    const blob = await res.blob();
    if (blob.size < 500) {
      throw new Error("Invalid image returned");
    }
    const imageUrl = URL.createObjectURL(blob);
    return { imageUrl };
  } catch (pollinationsError) {
    console.warn("Pollinations generation fallback to HF:", pollinationsError);

    // Fallback to Hugging Face router if token available
    if (hfToken) {
      const hfRouterUrl =
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";
      const hfRes = await fetch(hfRouterUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: 512,
            height: 768,
          },
        }),
      });

      if (hfRes.status === 503) {
        throw new Error("MODEL_LOADING");
      }
      if (!hfRes.ok) {
        const errText = await hfRes.text();
        throw new Error(`AI generation error: ${hfRes.status} — ${errText}`);
      }

      const hfBlob = await hfRes.blob();
      const imageUrl = URL.createObjectURL(hfBlob);
      return { imageUrl };
    }

    throw pollinationsError;
  }
}
