import { NextRequest, NextResponse } from "next/server";

// API route kept as stub — generation moved to client-side
// to avoid Vercel Hobby outbound network restrictions (ENOTFOUND)
export const runtime = "nodejs";

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { error: "Use client-side generation instead", code: "CLIENT_SIDE_ONLY" },
    { status: 400 }
  );
}
