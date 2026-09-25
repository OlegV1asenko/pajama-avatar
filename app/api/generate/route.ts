import { NextRequest, NextResponse } from "next/server";
import { generateAvatarWithHF } from "@/lib/huggingface";
import type { Gender } from "@/lib/promptBuilder";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for HF generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const gender: Gender = body.gender ?? "person";
    const pajamaColor: string = body.pajamaColor ?? "light blue";

    const hfToken = process.env.HUGGINGFACE_TOKEN;
    if (!hfToken) {
      return NextResponse.json(
        { error: "HuggingFace token not configured" },
        { status: 500 }
      );
    }

    const result = await generateAvatarWithHF({ gender, pajamaColor }, hfToken);

    return NextResponse.json({
      imageBase64: result.imageBase64,
      mimeType: result.mimeType,
    });
  } catch (error: unknown) {
    console.error("Avatar generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    
    // Handle HF model loading (cold start)
    if (message.includes("loading")) {
      return NextResponse.json(
        { error: "Model is loading, please try again in 20 seconds", retryable: true },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
