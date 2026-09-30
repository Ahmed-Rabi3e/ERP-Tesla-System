import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tesla Medical",
    template: "%s | Tesla Medical",
  },
  description:
    "Tesla Medical Company — reliable biomedical devices, service, and training for hospitals and clinics.",
  keywords: [
    "medical devices",
    "biomedical equipment",
    "clinical devices",
    "hospital equipment",
    "TESLA Medical",
  ],
  metadataBase: new URL("https://teslamedical.com"),
  openGraph: {
    title: "Tesla Medical",
    description:
      "Trusted biomedical devices and service for hospitals and clinics.",
    url: "https://teslamedical.com",
    siteName: "Tesla Medical",
    images: [
      {
        url: "/assets/tesla.png",
        width: 1200,
        height: 630,
        alt: "Tesla Medical logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tesla Medical",
    description:
      "Trusted biomedical devices and service for hospitals and clinics.",
    images: ["/assets/tesla.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
