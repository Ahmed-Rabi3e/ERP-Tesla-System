import {
  LayoutDashboard,
  Package,
  Warehouse,
  Users,
  ShoppingCart,
  CalendarClock,
  Truck,
  ClipboardList,
  Wrench,
  HardHat,
  BarChart3,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { Permission } from "@/lib/auth/permissions";
import { PERMISSIONS } from "@/lib/auth/permissions";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  permission: Permission;
  comingSoon?: boolean;
};

export const ERP_NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD_READ,
  },
  {
    href: "/products",
    label: "Products",
    icon: Package,
    permission: PERMISSIONS.PRODUCTS_READ,
    comingSoon: true,
  },
  {
    href: "/inventory",
    label: "Inventory",
    icon: Warehouse,
    permission: PERMISSIONS.INVENTORY_READ,
    comingSoon: true,
  },
  {
    href: "/customers",
    label: "Customers",
    icon: Users,
    permission: PERMISSIONS.CUSTOMERS_READ,
    comingSoon: true,
  },
  {
    href: "/sales",
    label: "Sales",
    icon: ShoppingCart,
    permission: PERMISSIONS.SALES_READ,
    comingSoon: true,
  },
  {
    href: "/installments",
    label: "Installments",
    icon: CalendarClock,
    permission: PERMISSIONS.INSTALLMENTS_READ,
    comingSoon: true,
  },
  {
    href: "/suppliers",
    label: "Suppliers",
    icon: Truck,
    permission: PERMISSIONS.SUPPLIERS_READ,
    comingSoon: true,
  },
  {
    href: "/purchases",
    label: "Purchases",
    icon: ClipboardList,
    permission: PERMISSIONS.PURCHASES_READ,
    comingSoon: true,
  },
  {
    href: "/engineers",
    label: "Engineers",
    icon: HardHat,
    permission: PERMISSIONS.ENGINEERS_READ,
    comingSoon: true,
  },
  {
    href: "/service-orders",
    label: "Service orders",
    icon: Wrench,
    permission: PERMISSIONS.SERVICE_ORDERS_READ,
    comingSoon: true,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: BarChart3,
    permission: PERMISSIONS.REPORTS_READ,
    comingSoon: true,
  },
  {
    href: "/users",
    label: "Users",
    icon: Users,
    permission: PERMISSIONS.USERS_READ,
  },
  {
    href: "/roles",
    label: "Roles",
    icon: Shield,
    permission: PERMISSIONS.ROLES_READ,
  },
];
