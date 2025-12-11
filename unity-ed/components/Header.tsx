"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Game", href: "/about_game" },
    { label: "For Student", href: "/for_students" },
    { label: "For Teacher", href: "/for_teachers" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-6 py-3 shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="UnityED Logo"
              width={60}
              height={60}
              priority
              className="object-contain"
            />
          </Link>

          {/* Mobile Toggle Button */}
          <button className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 rounded-full bg-gray-100 px-2 py-1.5 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {session && (
              <Link
                href={`/dashboard/${session?.user?.role?.toLowerCase()}`}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  pathname.startsWith("/dashboard")
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right section (desktop) */}
          <div className="hidden min-w-[150px] justify-end md:flex">
            {session === undefined ? (
              <div className="h-10 w-[150px] rounded-full" />
            ) : session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-red-600"
              >
                <FaUser className="text-lg" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-700"
              >
                <FaUser className="text-lg" />
                LogIn / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-auto max-w-7xl px-6 pt-4 md:hidden">
          <div className="rounded-2xl bg-gray-50 px-6 py-4 shadow-sm">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {session && (
                <Link
                  href={`/dashboard/${session?.user?.role?.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    pathname.startsWith("/dashboard")
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {/* Auth button (mobile) */}
              <div className="mt-3 border-t border-gray-200 pt-3">
                {session ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-red-600"
                  >
                    <FaUser className="text-lg" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-700"
                  >
                    <FaUser className="text-lg" />
                    LogIn / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
