import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex font-sans">
      <aside className="w-56 shrink-0 border-r border-neutral-700 bg-neutral-800/50 flex flex-col">
        <div className="p-4 border-b border-neutral-700">
          <p className="font-semibold text-white">Dashboard</p>
          <p className="text-xs text-neutral-400 mt-0.5 truncate">
            {session.user.email}
          </p>
        </div>
        <nav className="p-2 flex-1">
          <AdminNav />
        </nav>
        <div className="p-2 border-t border-neutral-700">
          <a
            href="/api/auth/signout"
            className="block px-3 py-2 rounded-md text-sm text-red-400 hover:bg-neutral-700 transition-colors"
          >
            Sair
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
