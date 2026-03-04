import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const EVENTOS_LIMIT = 100;
const PAGAMENTOS_LIMIT = 50;

export default async function AdminLogsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/admin/logs");
  }

  const [eventos, pagamentos] = await Promise.all([
    prisma.adminEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: EVENTOS_LIMIT,
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: PAGAMENTOS_LIMIT,
      include: { user: { select: { email: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Logs (eventos + pagamentos)</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Visão consolidada dos últimos eventos e pagamentos.
        </p>
      </div>

      <section>
          <h2 className="text-lg font-semibold mb-3 text-green-400">
            Últimos eventos ({eventos.length})
          </h2>
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
                      {e.metadata
                        ? JSON.stringify(e.metadata)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-amber-400">
            Últimos pagamentos ({pagamentos.length})
          </h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Plano</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Gateway ID</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((p) => (
                  <tr key={p.id} className="border-t border-neutral-700">
                    <td className="px-4 py-2 text-neutral-300">
                      {p.createdAt.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-2">{p.user.email}</td>
                    <td className="px-4 py-2">{p.subscriptionType}</td>
                    <td className="px-4 py-2">R$ {p.amount.toFixed(2)}</td>
                    <td className="px-4 py-2">{p.status}</td>
                    <td className="px-4 py-2 text-neutral-400 text-xs">
                      {p.gatewayId ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      <p className="text-xs text-neutral-500">
        Atualize a página para ver novos eventos e pagamentos.
      </p>
    </div>
  );
}
