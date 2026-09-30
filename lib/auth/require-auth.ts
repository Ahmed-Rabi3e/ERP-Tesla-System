import { getSession, type SessionPayload } from "@/lib/auth/session";
import {
  hasPermission,
  type Permission,
} from "@/lib/auth/permissions";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }
  return session;
}

export async function requirePermission(
  permission: Permission | Permission[]
): Promise<SessionPayload> {
  const session = await requireSession();
  if (!hasPermission(session.permissions, permission)) {
    throw new ForbiddenError();
  }
  return session;
}
