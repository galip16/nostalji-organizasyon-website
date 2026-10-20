import { NextResponse } from "next/server";
import { adminConfigured, createSession, passwordMatches, sameOrigin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin paneli henüz yapılandırılmamış (ADMIN_PASSWORD ve ADMIN_SESSION_SECRET eksik)." },
      { status: 503 },
    );
  }
  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  if (typeof body?.password !== "string" || !passwordMatches(body.password)) {
    // Şifre denemelerini yavaşlat
    await new Promise((r) => setTimeout(r, 900));
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
