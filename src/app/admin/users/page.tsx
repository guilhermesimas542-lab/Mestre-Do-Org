import { prisma } from "@/lib/prisma";

const LIMIT = 100;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: LIMIT,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Usuários</h1>
      <p className="text-sm text-neutral-400">
        Cadastros no sistema (login e/ou compradores).
      </p>
      <div className="overflow-x-auto rounded-lg border border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Premium</th>
              <th className="px-4 py-2">Plano</th>
              <th className="px-4 py-2">Expira em</th>
              <th className="px-4 py-2">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-neutral-700">
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 text-neutral-300">{u.name ?? "—"}</td>
                <td className="px-4 py-2">
                  {u.isPremium ? (
                    <span className="text-green-400">Sim</span>
                  ) : (
                    <span className="text-neutral-500">Não</span>
                  )}
                </td>
                <td className="px-4 py-2 text-neutral-300">{u.planType ?? "—"}</td>
                <td className="px-4 py-2 text-neutral-300">
                  {u.subscriptionExpiresAt
                    ? u.subscriptionExpiresAt.toLocaleDateString("pt-BR")
                    : "—"}
                </td>
                <td className="px-4 py-2 text-neutral-400 text-xs">
                  {u.createdAt.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
