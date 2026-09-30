"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ERP_NAV } from "@/lib/erp-nav";
import { hasPermission, type Permission } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";

type Props = {
  permissions: Permission[];
  onNavigate?: () => void;
};

export function ErpSidebarNav({ permissions, onNavigate }: Props) {
  const pathname = usePathname();
  const items = ERP_NAV.filter((item) =>
    hasPermission(permissions, item.permission)
  );

  return (
    <nav className="flex flex-col gap-1 px-3 py-4" aria-label="ERP">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        const className = cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          item.comingSoon && "opacity-70"
        );

        if (item.comingSoon) {
          return (
            <span key={item.href} className={className} title="Coming in a later phase">
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px] uppercase tracking-wide">Soon</span>
            </span>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={className}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
