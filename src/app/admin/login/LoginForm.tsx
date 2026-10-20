"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Giriş yapılamadı.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılamadı.");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-berry-100 bg-paper p-8 shadow-xl">
        <Image src="/logo.png" alt="Nostalji Şekerleme" width={640} height={322} className="mx-auto h-16 w-auto" />
        <h1 className="mt-6 text-center font-display text-2xl font-semibold text-ink">Yönetim Paneli</h1>

        {!configured && (
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
            Panel henüz yapılandırılmamış. Vercel ortam değişkenlerine <b>ADMIN_PASSWORD</b> ve{" "}
            <b>ADMIN_SESSION_SECRET</b> eklenmeli.
          </p>
        )}

        <label className="mt-6 block text-sm font-bold">
          Şifre
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-berry-200 bg-white px-4 py-3 text-base focus:border-berry-600 focus:outline-none focus:ring-2 focus:ring-berry-200"
          />
        </label>

        {error && (
          <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-berry-600 px-6 py-3.5 font-bold text-white transition hover:bg-berry-700 disabled:opacity-50"
        >
          <Lock className="size-4" aria-hidden="true" />
          {busy ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}
