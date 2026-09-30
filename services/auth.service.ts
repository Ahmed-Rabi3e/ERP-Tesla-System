import { headers } from "next/headers";
import { connectDb } from "@/lib/db/mongoose";
import { User } from "@/models/user.model";
import { Role } from "@/models/role.model";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  ROLE_PERMISSIONS,
  resolvePermissions,
  type UserRole,
} from "@/lib/auth/permissions";
import {
  clearSessionCookie,
  setSessionCookie,
  signSession,
  type SessionPayload,
} from "@/lib/auth/session";
import { requirePermission } from "@/lib/auth/require-auth";
import { writeAuditLog } from "@/lib/audit";
import { AppError, UnauthorizedError } from "@/lib/errors";
import {
  createUserSchema,
  loginSchema,
  type CreateUserInput,
} from "@/validations/auth";
import { PERMISSIONS } from "@/lib/auth/permissions";

function publicUser(user: {
  _id: { toString(): string };
  email: string;
  name: string;
  role: UserRole;
  extraPermissions?: string[];
  deniedPermissions?: string[];
  isActive: boolean;
  lastLoginAt?: Date | null;
  createdAt?: Date;
}) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    extraPermissions: user.extraPermissions ?? [],
    deniedPermissions: user.deniedPermissions ?? [],
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt ?? null,
    createdAt: user.createdAt,
    permissions: resolvePermissions(
      user.role,
      user.extraPermissions,
      user.deniedPermissions
    ),
  };
}

async function clientIp(): Promise<string | undefined> {
  const headerList = await headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    undefined
  );
}

export async function login(raw: unknown): Promise<SessionPayload> {
  const input = loginSchema.parse(raw);
  await connectDb();

  const user = await User.findOne({
    email: input.email,
    deletedAt: null,
  }).select("+passwordHash");

  if (!user || !user.passwordHash) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  if (!user.isActive) {
    throw new UnauthorizedError("This account is disabled.");
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  const permissions = resolvePermissions(
    user.role,
    user.extraPermissions,
    user.deniedPermissions
  );

  const session: SessionPayload = {
    sub: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    permissions,
  };

  const token = await signSession(session);
  await setSessionCookie(token);

  user.lastLoginAt = new Date();
  await user.save();

  return session;
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
}

export async function listUsers() {
  await requirePermission(PERMISSIONS.USERS_READ);
  await connectDb();
  const users = await User.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .lean();
  return users.map((user) => publicUser(user as never));
}

export async function listRoles() {
  await requirePermission(PERMISSIONS.ROLES_READ);
  await connectDb();
  const roles = await Role.find({ deletedAt: null }).sort({ code: 1 }).lean();

  if (roles.length > 0) {
    return roles.map((role) => ({
      id: role._id.toString(),
      code: role.code,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      isSystem: role.isSystem,
    }));
  }

  return Object.entries(ROLE_PERMISSIONS).map(([code, permissions]) => ({
    id: code,
    code,
    name: code,
    description: "Built-in role",
    permissions: [...permissions],
    isSystem: true,
  }));
}

export async function createUser(raw: unknown) {
  const actor = await requirePermission(PERMISSIONS.USERS_WRITE);
  const input: CreateUserInput = createUserSchema.parse(raw);
  await connectDb();

  const existing = await User.findOne({
    email: input.email,
    deletedAt: null,
  });
  if (existing) {
    throw new AppError("A user with this email already exists.", 409);
  }

  const passwordHash = await hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: input.role,
    isActive: input.isActive,
  });

  await writeAuditLog({
    userId: actor.sub,
    action: "user.create",
    entityType: "User",
    entityId: user._id.toString(),
    newData: {
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    },
    ipAddress: await clientIp(),
  });

  return publicUser(user);
}
