export class AppError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status = 400, code = "APP_ERROR") {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "You must be signed in to continue.") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource was not found.") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as { issues: { message?: string }[] }).issues)
  ) {
    return (
      (error as { issues: { message?: string }[] }).issues[0]?.message ||
      "Validation failed."
    );
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}
