import { prisma } from "@/lib/prisma";

const LIMIT = 100;

export default async function AdminPaymentsPage() {
  const pagamentos = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: LIMIT,
    include: { user: { select: { email: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Pagamentos</h1>
      <p className="text-sm text-neutral-400">
        Compras registradas via webhook PerfectPay.
      </p>
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
    </div>
  );
}
