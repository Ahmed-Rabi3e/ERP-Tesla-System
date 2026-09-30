import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";

loadEnv({ path: resolve(process.cwd(), ".env.local") });
loadEnv({ path: resolve(process.cwd(), ".env") });

import { connectDb } from "@/lib/db/mongoose";
import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { hashPassword } from "@/lib/auth/password";
import { ROLE_PERMISSIONS, USER_ROLES } from "@/lib/auth/permissions";

const ROLE_META: Record<
  (typeof USER_ROLES)[number],
  { name: string; description: string }
> = {
  ADMIN: {
    name: "Administrator",
    description: "Full access to configuration, ledgers, and inventory.",
  },
  MANAGER: {
    name: "Manager",
    description: "Operational oversight across sales, service, and inventory.",
  },
  ACCOUNTANT: {
    name: "Accountant",
    description: "Financial documents, payments, and reports.",
  },
  WAREHOUSE: {
    name: "Warehouse",
    description: "Stock locations, transfers, and purchase receipts.",
  },
  ENGINEER: {
    name: "Engineer",
    description: "Custody inventory and service-order consumption.",
  },
  SALES: {
    name: "Sales",
    description: "Customers, quotations, and sales invoices.",
  },
};

async function seed() {
  if (!process.env.MONGODB_URI || !process.env.AUTH_SECRET) {
    throw new Error("Set MONGODB_URI and AUTH_SECRET in .env.local before seeding.");
  }

  await connectDb();

  for (const code of USER_ROLES) {
    await Role.findOneAndUpdate(
      { code },
      {
        code,
        name: ROLE_META[code].name,
        description: ROLE_META[code].description,
        permissions: [...ROLE_PERMISSIONS[code]],
        isSystem: true,
        isActive: true,
        deletedAt: null,
      },
      { upsert: true, new: true }
    );
  }

  const email = (
    process.env.SEED_ADMIN_EMAIL || "admin@teslamedical.local"
  ).toLowerCase();
  const name = process.env.SEED_ADMIN_NAME || "System Administrator";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMeNow!23";

  const existing = await User.findOne({ email, deletedAt: null });
  if (!existing) {
    await User.create({
      email,
      name,
      passwordHash: await hashPassword(password),
      role: "ADMIN",
      isActive: true,
    });
    console.log(`Created admin user: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
