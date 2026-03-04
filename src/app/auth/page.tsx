"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Conectado como {session.user?.email} <br />
        <button onClick={() => signOut()}>Sair</button>
      </>
    );
  }

  return (
    <>
      Não conectado <br />
      <button onClick={() => signIn()}>Entrar</button>
    </>
  );
}
