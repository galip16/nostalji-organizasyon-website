import { NextResponse } from "next/server";
import { destroySession, sameOrigin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  await destroySession();
  return NextResponse.json({ ok: true });
}
