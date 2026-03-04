import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function AdminMetaPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, fbp: true, fbc: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Meus IDs Meta</h1>
      <p className="text-sm text-neutral-400">
        Valores de <code className="bg-neutral-800 px-1 rounded">_fbp</code> e{" "}
        <code className="bg-neutral-800 px-1 rounded">_fbc</code> salvos no seu
        cadastro (útil para debug do Pixel/CAPI).
      </p>
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-6 max-w-2xl font-mono text-sm">
        <p>
          <span className="text-neutral-500">email:</span>{" "}
          {user?.email ?? "—"}
        </p>
        <p className="mt-2">
          <span className="text-neutral-500">fbp:</span>{" "}
          {user?.fbp ? (
            <span className="text-green-400 break-all">{user.fbp}</span>
          ) : (
            <span className="text-neutral-500">(vazio)</span>
          )}
        </p>
        <p className="mt-2">
          <span className="text-neutral-500">fbc:</span>{" "}
          {user?.fbc ? (
            <span className="text-green-400 break-all">{user.fbc}</span>
          ) : (
            <span className="text-neutral-500">(vazio)</span>
          )}
        </p>
      </div>
    </div>
  );
}
