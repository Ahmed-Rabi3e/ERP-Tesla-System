import { PageHeader } from "@/components/erp/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requirePermission } from "@/lib/auth/require-auth";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { connectDb } from "@/lib/db/mongoose";
import { User } from "@/models/user.model";

export default async function DashboardPage() {
  const session = await requirePermission(PERMISSIONS.DASHBOARD_READ);

  let userCount: number | null = null;
  let dbError: string | null = null;
  try {
    await connectDb();
    userCount = await User.countDocuments({ deletedAt: null, isActive: true });
  } catch (error) {
    dbError =
      error instanceof Error
        ? error.message
        : "Database is not available yet.";
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session.name}. Operational KPIs will appear here as inventory, sales, and service data is added.`}
      />

      {dbError ? (
        <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {dbError} Confirm MongoDB is running and `.env.local` is configured.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{userCount ?? "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inventory value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">—</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ledger-based. Available after Phase 2.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receivables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">—</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Derived from customer ledger in Phase 3.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Engineer custody
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">—</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Company stock at engineer locations. Phase 2.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
