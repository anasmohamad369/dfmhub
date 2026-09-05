"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Zap,
  Menu,
  X,
  Shield,
  ChevronRight,
  Sun,
  Moon,
  UserCheck,
  LogOut,
  Wrench,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        setIsAuth(localStorage.getItem("isAuthenticated") === "true");
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
    return null;
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "false");
      setIsAuth(false);
    }
    router.push("/tool");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    // { name: "About Us", href: "/about-us" },
    {
      name: "Products",
      href: "/product",
      dropdown: [
    
        {
          name: "Lightning Protection System",
          state: "ESE Terminals, Conductors & SPDs",
          url: "/product?category=LIGHTNING_PROTECTION",
        },
        {
          name: "Structural Earthing",
          state: "Chemical Electrodes & Copper Rods",
          url: "/product?category=STRUCTURAL_EARTHING",
        },
      ],
    },
    {
      name: "Lightning Protection",
      href: "/lightning-protection-system",
      dropdown: [
        {
          name: "Bengaluru",
          state: "Karnataka · South India",
          url: "/lightning-protection-system/bengaluru",
        },
        {
          name: "Chennai",
          state: "Tamil Nadu · South India",
          url: "/lightning-protection-system/chennai",
        },
        {
          name: "Hyderabad",
          state: "Telangana · South India",
          url: "/lightning-protection-system/hyderabad",
        },
        {
          name: "Pune",
          state: "Maharashtra · West India",
          url: "/lightning-protection-system/pune",
        },
      ],
    },
    {
      name: "Structural Earthing",
      href: "/structural-earthing",
      dropdown: [
        {
          name: "Bengaluru",
          state: "Karnataka · South India",
          url: "/structural-earthing/bengaluru",
        },
        {
          name: "Chennai",
          state: "Tamil Nadu · South India",
          url: "/structural-earthing/chennai",
        },
        {
          name: "Hyderabad",
          state: "Telangana · South India",
          url: "/structural-earthing/hyderabad",
        },
        {
          name: "Pune",
          state: "Maharashtra · West India",
          url: "/structural-earthing/pune",
        },
      ],
    },
    { name: "Installation", href: "/installation-services" },
    // { name: "Certification", href: "/certification" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative h-12 w-auto flex items-center">
              <Image
                src="/image.png"
                alt="DFMHUB Logo"
                width={160}
                height={48}
                priority
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all inline-flex items-center gap-1 ${
                    isActive(link.href)
                      ? "text-amber-700 dark:text-amber-400 bg-amber-500/10 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                    <div className="space-y-1">
                      {link.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.url}
                          className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                            {dropItem.name}
                          </span>
                          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            {dropItem.state}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Action: Risk Assessment Tool Button + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <Link
              href="/tool"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer border border-amber-400/60"
            >
              <Wrench className="w-3.5 h-3.5 text-slate-950" />
              <span>Risk Calculator</span>
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle White/Black Theme"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>

          {/* Mobile buttons: Theme Switcher & Mobile menu */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle White/Black Theme"
              className="p-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-amber-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-8 space-y-1.5 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                  isActive(link.href)
                    ? "text-amber-700 dark:text-amber-400 bg-slate-200 dark:bg-slate-800 font-bold border border-slate-300 dark:border-slate-700"
                    : "text-slate-800 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-6 space-y-1 mt-1 mb-2">
                  {link.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.name}
                      href={dropItem.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="block font-bold text-slate-900 dark:text-slate-200">
                        {dropItem.name}
                      </span>
                      <span className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                        {dropItem.state}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4 text-slate-800" />
                  <span>Switch to Dark Theme</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light Theme</span>
                </>
              )}
            </button>

            {pathname !== "/tool" && (
              <Link
                href="/tool"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm uppercase py-3 rounded-md shadow transition-colors cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>GO TO TOOL</span>
              </Link>
            )}

            {isAuth ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm uppercase py-3 rounded-md shadow transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>
            ) : (
              <Link
                href="/tool"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-bold text-sm uppercase py-3 rounded-md shadow transition-colors"
              >
                <UserCheck className="w-4 h-4 text-amber-500" />
                <span>RISK ASSESSMENT TOOL</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

