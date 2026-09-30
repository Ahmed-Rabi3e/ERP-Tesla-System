export const USER_ROLES = [
  "ADMIN",
  "MANAGER",
  "ACCOUNTANT",
  "WAREHOUSE",
  "ENGINEER",
  "SALES",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const PERMISSIONS = {
  DASHBOARD_READ: "dashboard:read",
  USERS_READ: "users:read",
  USERS_WRITE: "users:write",
  ROLES_READ: "roles:read",
  ROLES_WRITE: "roles:write",
  PRODUCTS_READ: "products:read",
  PRODUCTS_WRITE: "products:write",
  INVENTORY_READ: "inventory:read",
  INVENTORY_TRANSFER: "inventory:transfer",
  INVENTORY_ADJUST: "inventory:adjust",
  CUSTOMERS_READ: "customers:read",
  CUSTOMERS_WRITE: "customers:write",
  SALES_READ: "sales:read",
  SALES_WRITE: "sales:write",
  SALES_CONFIRM: "sales:confirm",
  PAYMENTS_WRITE: "payments:write",
  INSTALLMENTS_READ: "installments:read",
  SUPPLIERS_READ: "suppliers:read",
  SUPPLIERS_WRITE: "suppliers:write",
  PURCHASES_READ: "purchases:read",
  PURCHASES_WRITE: "purchases:write",
  PURCHASES_CONFIRM: "purchases:confirm",
  ENGINEERS_READ: "engineers:read",
  ENGINEERS_WRITE: "engineers:write",
  SERVICE_ORDERS_READ: "service-orders:read",
  SERVICE_ORDERS_WRITE: "service-orders:write",
  SERVICE_ORDERS_CONSUME: "service-orders:consume",
  REPORTS_READ: "reports:read",
  AUDIT_READ: "audit:read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ALL_PERMISSIONS = Object.values(PERMISSIONS);

export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  ADMIN: ALL_PERMISSIONS,
  MANAGER: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.ROLES_READ,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.PRODUCTS_WRITE,
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.CUSTOMERS_READ,
    PERMISSIONS.CUSTOMERS_WRITE,
    PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_WRITE,
    PERMISSIONS.SALES_CONFIRM,
    PERMISSIONS.PAYMENTS_WRITE,
    PERMISSIONS.INSTALLMENTS_READ,
    PERMISSIONS.SUPPLIERS_READ,
    PERMISSIONS.SUPPLIERS_WRITE,
    PERMISSIONS.PURCHASES_READ,
    PERMISSIONS.PURCHASES_WRITE,
    PERMISSIONS.PURCHASES_CONFIRM,
    PERMISSIONS.ENGINEERS_READ,
    PERMISSIONS.ENGINEERS_WRITE,
    PERMISSIONS.SERVICE_ORDERS_READ,
    PERMISSIONS.SERVICE_ORDERS_WRITE,
    PERMISSIONS.SERVICE_ORDERS_CONSUME,
    PERMISSIONS.REPORTS_READ,
    PERMISSIONS.AUDIT_READ,
  ],
  ACCOUNTANT: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.CUSTOMERS_READ,
    PERMISSIONS.SALES_READ,
    PERMISSIONS.PAYMENTS_WRITE,
    PERMISSIONS.INSTALLMENTS_READ,
    PERMISSIONS.SUPPLIERS_READ,
    PERMISSIONS.PURCHASES_READ,
    PERMISSIONS.REPORTS_READ,
  ],
  WAREHOUSE: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.INVENTORY_ADJUST,
    PERMISSIONS.PURCHASES_READ,
    PERMISSIONS.ENGINEERS_READ,
  ],
  ENGINEER: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.ENGINEERS_READ,
    PERMISSIONS.SERVICE_ORDERS_READ,
    PERMISSIONS.SERVICE_ORDERS_WRITE,
    PERMISSIONS.SERVICE_ORDERS_CONSUME,
  ],
  SALES: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.PRODUCTS_READ,
    PERMISSIONS.CUSTOMERS_READ,
    PERMISSIONS.CUSTOMERS_WRITE,
    PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_WRITE,
    PERMISSIONS.SALES_CONFIRM,
    PERMISSIONS.INSTALLMENTS_READ,
  ],
};

export function resolvePermissions(
  role: UserRole,
  extraPermissions: string[] = [],
  deniedPermissions: string[] = []
): Permission[] {
  const base = new Set<string>(ROLE_PERMISSIONS[role]);
  for (const permission of extraPermissions) {
    base.add(permission);
  }
  for (const permission of deniedPermissions) {
    base.delete(permission);
  }
  return [...base] as Permission[];
}

export function hasPermission(
  granted: readonly string[],
  required: Permission | Permission[]
): boolean {
  const needed = Array.isArray(required) ? required : [required];
  return needed.every((permission) => granted.includes(permission));
}
