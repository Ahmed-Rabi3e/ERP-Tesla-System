"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/30 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
        style={{ height: "90px" }}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/">
              <Image
                src="/assets/tesla.png"
                alt="logo"
                width={110}
                height={110}
                className="object-cover"
              />
            </Link>
            <nav
              className="hidden md:flex items-center gap-8 font-heading"
              role="navigation"
              aria-label="Main navigation"
            >
              {[
                { id: "/", label: "HOME" },
                { id: "/products", label: "PRODUCTS" },
                { id: "/about", label: "ABOUT" },
                { id: "/login", label: "STAFF" },
              ].map((link) => (
                <Link
                  key={link.id}
                  href={link.id}
                  className={`text-sm font-medium transition-all ${
                    pathname === link.id
                      ? "text-black underline underline-offset-4"
                      : "text-foreground hover:text-black/80"
                  }`}
                  aria-current={pathname === link.id ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/"
                className="rounded-full bg-black text-white hover:bg-black/90 px-4 py-1.5 text-[12px] transition-all"
              >
                Start NOW
              </Link>
            </nav>
            {/* Mobile: hamburger */}
            <div className="md:hidden flex items-center gap-4">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-md bg-white/10 hover:bg-white/20"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop search link (kept for larger screens) */}
            <Link
              href="/products"
              className="hidden md:flex text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70 pr-0 md:pr-8 items-center gap-1"
            >
              <CiSearch size={26} />
              <span>SEARCH</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
        >
          <div className="absolute right-0 top-0 w-80 max-w-full h-full bg-white shadow-xl p-6">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image
                  src="/assets/tesla.png"
                  alt="logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2"
              >
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium"
                >
                  PRODUCTS
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium"
                >
                  ABOUT
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium"
                >
                  HOME
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium"
                >
                  STAFF
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
