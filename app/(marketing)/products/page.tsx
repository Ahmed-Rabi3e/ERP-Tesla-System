import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products — Tesla Medical",
    description:
      "Browse Tesla Medical's catalog of diagnostic devices and spare parts.",
    alternates: { canonical: "/products" },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
