import { PageHeader } from "@/components/erp/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listRoles } from "@/services/auth.service";

export default async function RolesPage() {
  const roles = await listRoles();

  return (
    <div>
      <PageHeader
        title="Roles"
        description="Built-in roles. Custom permission overrides can be stored on each user. Server actions always re-check these permissions."
      />
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="align-top font-medium">
                  {role.name}
                  <div className="text-xs text-muted-foreground">{role.code}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="outline">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
