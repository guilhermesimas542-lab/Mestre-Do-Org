"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Início" },
  { href: "/admin/events", label: "Eventos" },
  { href: "/admin/payments", label: "Pagamentos" },
  { href: "/admin/users", label: "Usuários" },
  { href: "/admin/logs", label: "Logs (tudo)" },
  { href: "/admin/meta", label: "Meus IDs Meta" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-neutral-700 text-white"
                : "text-neutral-300 hover:bg-neutral-700 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
