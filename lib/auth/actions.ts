"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createUser, login, logout } from "@/services/auth.service";
import { toErrorMessage } from "@/lib/errors";

export type ActionState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await login({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
  } catch (error) {
    return { error: toErrorMessage(error) };
  }

  const next = String(formData.get("next") || "/dashboard");
  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/login");
}

export async function createUserAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await createUser({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: String(formData.get("role") ?? ""),
      isActive: formData.get("isActive") !== "false",
    });
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    return { error: toErrorMessage(error) };
  }
}
