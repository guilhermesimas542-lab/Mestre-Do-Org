import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [eventCount, paymentCount, userCount, recentEvents] = await Promise.all([
    prisma.adminEvent.count(),
    prisma.payment.count(),
    prisma.user.count(),
    prisma.adminEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Visão geral</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/events"
          className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-5 hover:border-green-500/50 transition-colors"
        >
          <p className="text-sm text-neutral-400">Eventos (tracking)</p>
          <p className="text-3xl font-bold text-green-400 mt-1">{eventCount}</p>
        </Link>
        <Link
          href="/admin/payments"
          className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-5 hover:border-amber-500/50 transition-colors"
        >
          <p className="text-sm text-neutral-400">Pagamentos</p>
          <p className="text-3xl font-bold text-amber-400 mt-1">{paymentCount}</p>
        </Link>
        <Link
          href="/admin/users"
          className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-5 hover:border-blue-500/50 transition-colors"
        >
          <p className="text-sm text-neutral-400">Usuários</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{userCount}</p>
        </Link>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Últimos eventos</h2>
          <Link
            href="/admin/events"
            className="text-sm text-green-400 hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="rounded-lg border border-neutral-700 overflow-hidden">
          {recentEvents.length === 0 ? (
            <p className="px-4 py-8 text-neutral-500 text-center text-sm">
              Nenhum evento ainda.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Data/Hora</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">IP</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((e) => (
                  <tr key={e.id} className="border-t border-neutral-700">
                    <td className="px-4 py-2 text-neutral-300">
                      {e.createdAt.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 font-medium">{e.eventType}</td>
                    <td className="px-4 py-2 text-neutral-400">{e.ip ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
