import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { getAuthCookieName, getServerEnv } from "@/lib/env";
import type { Permission, UserRole } from "@/lib/auth/permissions";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
};

type SessionJwt = JWTPayload & SessionPayload;

function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(getServerEnv().AUTH_SECRET);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  const env = getServerEnv();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${env.AUTH_COOKIE_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const session = payload as SessionJwt;
    if (!session.sub || !session.email || !session.role) {
      return null;
    }
    return {
      sub: session.sub,
      email: session.email,
      name: session.name,
      role: session.role,
      permissions: session.permissions ?? [],
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(getAuthCookieName())?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const env = getServerEnv();
  const store = await cookies();
  store.set(env.AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: env.AUTH_COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(getAuthCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
