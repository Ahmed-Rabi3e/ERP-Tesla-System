import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { login, logout } from "@/services/auth.service";
import { toErrorMessage, UnauthorizedError } from "@/lib/errors";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: session });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await login(body);
    return NextResponse.json({ user: session });
  } catch (error) {
    const status = error instanceof UnauthorizedError ? 401 : 400;
    return NextResponse.json({ error: toErrorMessage(error) }, { status });
  }
}

export async function DELETE() {
  await logout();
  return NextResponse.json({ ok: true });
}
