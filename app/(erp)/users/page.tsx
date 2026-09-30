import { PageHeader } from "@/components/erp/page-header";
import { EmptyState } from "@/components/erp/empty-state";
import { CreateUserDialog } from "@/components/erp/create-user-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listUsers } from "@/services/auth.service";
import { requirePermission } from "@/lib/auth/require-auth";
import { hasPermission, PERMISSIONS } from "@/lib/auth/permissions";

export default async function UsersPage() {
  const session = await requirePermission(PERMISSIONS.USERS_READ);
  const users = await listUsers();
  const canWrite = hasPermission(session.permissions, PERMISSIONS.USERS_WRITE);

  return (
    <div>
      <PageHeader
        title="Users"
        description="Staff accounts for Tesla Medical ERP. Soft-deleted users are hidden from this list."
        actions={canWrite ? <CreateUserDialog /> : null}
      />

      {users.length === 0 ? (
        <EmptyState
          title="No users yet"
          description="Run npm run seed to create the first administrator, then sign in."
        />
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "secondary" : "outline"}>
                      {user.isActive ? "Active" : "Disabled"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
