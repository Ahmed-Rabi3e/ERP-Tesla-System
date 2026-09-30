import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AppShell } from "@/components/erp/app-shell";
import { QueryProvider } from "@/components/erp/query-provider";

export const dynamic = "force-dynamic";

export default async function ErpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <QueryProvider>
      <AppShell user={session}>{children}</AppShell>
    </QueryProvider>
  );
}
