import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  MONGODB_DB_NAME: z.string().min(1).default("tesla_erp"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_COOKIE_NAME: z.string().min(1).default("tesla_erp_session"),
  AUTH_COOKIE_MAX_AGE: z.coerce.number().int().positive().default(60 * 60 * 24 * 7),
  SEED_ADMIN_EMAIL: z.string().optional(),
  SEED_ADMIN_NAME: z.string().optional(),
  SEED_ADMIN_PASSWORD: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

export type ServerEnv = z.infer<typeof envSchema>;

export function getServerEnv(): ServerEnv {
  const parsed = envSchema.safeParse({
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
    AUTH_COOKIE_MAX_AGE: process.env.AUTH_COOKIE_MAX_AGE,
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
    SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return parsed.data;
}

export function getAuthCookieName(): string {
  return process.env.AUTH_COOKIE_NAME || "tesla_erp_session";
}
