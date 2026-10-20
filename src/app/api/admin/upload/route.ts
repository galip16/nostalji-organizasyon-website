import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin, sameOrigin } from "@/lib/auth";

const MAX_BYTES = 200 * 1024 * 1024;

/** Tarayıcıdan doğrudan Vercel Blob'a yükleme için kısa ömürlü token üretir. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Giriş yapmanız gerekiyor." }, { status: 401 });

  const body = (await req.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("gallery/")) throw new Error("Geçersiz yükleme yolu.");
        return {
          allowedContentTypes: [
            "image/webp",
            "image/jpeg",
            "image/png",
            "video/mp4",
            "video/quicktime",
            "video/webm",
          ],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Yükleme başarısız." }, { status: 400 });
  }
}
