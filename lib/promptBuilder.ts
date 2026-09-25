// Constructs the AI image generation prompt based on detected gender/style
export type Gender = "woman" | "man" | "person";

export interface PromptOptions {
  gender: Gender;
  pajamaColor?: string;
  style?: string;
}

export function buildAvatarPrompt(options: PromptOptions): string {
  const { gender, pajamaColor = "light blue", style = "digital art" } = options;

  return [
    `full body portrait of a ${gender}`,
    `wearing cozy ${pajamaColor} pajamas with small star pattern`,
    `standing pose, arms slightly relaxed`,
    `${style} illustration style`,
    `soft warm lighting`,
    `white or very light background`,
    `cute friendly expression`,
    `high quality, detailed`,
    `full body visible from head to toe`,
  ].join(", ");
}

export function buildNegativePrompt(): string {
  return [
    "blurry",
    "low quality",
    "cropped",
    "partial body",
    "missing feet",
    "missing head",
    "distorted",
    "extra limbs",
    "text",
    "watermark",
    "nude",
    "nsfw",
    "violent",
  ].join(", ");
}

// Simple client-side gender detection hint from photo filename or user selection
export function detectGenderFromFilename(filename: string): Gender {
  const lower = filename.toLowerCase();
  if (lower.includes("man") || lower.includes("boy") || lower.includes("male")) return "man";
  if (lower.includes("woman") || lower.includes("girl") || lower.includes("female")) return "woman";
  return "person";
}
