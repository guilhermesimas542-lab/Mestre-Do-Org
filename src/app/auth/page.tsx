"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p className="p-8 text-neutral-400">Carregando…</p>;
  }

  if (session) {
    return <p className="p-8 text-neutral-400">Redirecionando ao dashboard…</p>;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center p-6">
      <p className="text-lg mb-4">Área restrita</p>
      <button
        onClick={() => signIn(undefined, { callbackUrl: "/admin" })}
        className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium"
      >
        Entrar
      </button>
    </div>
  );
}
