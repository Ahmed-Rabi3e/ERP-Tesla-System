"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";
import { ErpSidebarNav } from "@/components/erp/sidebar-nav";
import { Breadcrumbs } from "@/components/erp/breadcrumbs";
import type { SessionPayload } from "@/lib/auth/session";

function crumbsFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [{ href: "/dashboard", label: "ERP" }];
  let href = "";
  for (const part of parts) {
    href += `/${part}`;
    items.push({
      href,
      label: part.replace(/-/g, " "),
    });
  }
  return items;
}

type Props = {
  user: SessionPayload;
  children: React.ReactNode;
};

export function AppShell({ user, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const breadcrumbs = crumbsFromPath(pathname);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="font-heading text-sm font-semibold">
            Tesla Medical ERP
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ErpSidebarNav permissions={user.permissions} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                {user.email}
                <div className="mt-0.5 font-medium text-foreground">{user.role}</div>
              </div>
              <form action={logoutAction}>
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full text-left">
                    Sign out
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-sidebar text-sidebar-foreground shadow-xl">
            <div className="flex h-14 items-center border-b px-4 font-semibold">
              Tesla Medical ERP
            </div>
            <ErpSidebarNav
              permissions={user.permissions}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
