"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createUserAction, type ActionState } from "@/lib/auth/actions";
import { createUserSchema, type CreateUserInput } from "@/validations/auth";
import { USER_ROLES } from "@/lib/auth/permissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateUserDialog() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createUserAction,
    {}
  );

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "SALES",
      isActive: true,
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success("User created");
      form.reset();
    }
  }, [state.success, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Passwords are hashed on the server. Role permissions are enforced on
            every server action, not only in the UI.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              {...form.register("role")}
            >
              {USER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Create user"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
