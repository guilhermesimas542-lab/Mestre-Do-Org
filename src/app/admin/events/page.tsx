import { prisma } from "@/lib/prisma";

const LIMIT = 200;

export default async function AdminEventsPage() {
  const eventos = await prisma.adminEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: LIMIT,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Eventos (tracking)</h1>
      <p className="text-sm text-neutral-400">
        Últimos {eventos.length} eventos do funil (PageView, InitiateCheckout, etc.).
      </p>
      <div className="overflow-x-auto rounded-lg border border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-2">Data/Hora</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">User-Agent (resumo)</th>
              <th className="px-4 py-2">Metadata</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((e) => (
              <tr key={e.id} className="border-t border-neutral-700">
                <td className="px-4 py-2 text-neutral-300">
                  {e.createdAt.toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-2 font-medium">{e.eventType}</td>
                <td className="px-4 py-2 text-neutral-300">{e.ip ?? "—"}</td>
                <td className="px-4 py-2 text-neutral-300 max-w-[200px] truncate">
                  {e.userAgent ?? "—"}
                </td>
                <td className="px-4 py-2 text-neutral-400 max-w-[280px] truncate">
                  {e.metadata ? JSON.stringify(e.metadata) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
