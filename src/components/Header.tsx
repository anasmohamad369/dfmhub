"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Zap, Menu, X, Shield, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Lightning Protection", href: "/lightning-protection-system" },
    { name: "Structural Earthing", href: "/structural-earthing" },
    { name: "Installation", href: "/installation-services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner Bar */}
      <div className="bg-[#0b1329] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-amber-400 font-medium">
              <Shield className="w-3.5 h-3.5 mr-1" />
              IS/IEC 62305 & IS 3043 Compliant Systems · ARK Make
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="tel:+919483564777"
              className="flex items-center hover:text-amber-400 transition-colors font-semibold text-white"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              +91 94835 64777
            </a>
            <a
              href="mailto:partner@dfmhub.com"
              className="hidden md:flex items-center hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              partner@dfmhub.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-[#0b1329] p-2.5 rounded-lg border border-amber-500/30 group-hover:border-amber-500 transition-colors">
              <Zap className="w-6 h-6 text-amber-500 fill-amber-500/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white leading-tight">
                DFMHUB
              </span>
              <span className="text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                ARK MAKE SYSTEMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/40 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons: Theme Switcher & CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle White/Black Theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title={theme === "light" ? "Switch to Dark (Black) Theme" : "Switch to Light (White) Theme"}
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden md:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Light</span>
                </>
              )}
            </button>

            <Link
              href="/contact-us"
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase px-5 py-3 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center tracking-wider"
            >
              GET A QUOTE
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Mobile buttons: Theme Switcher & Mobile menu */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle White/Black Theme"
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
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
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.href)
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>Switch to Dark Theme</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light Theme</span>
                </>
              )}
            </button>

            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm uppercase py-3 rounded-md shadow transition-colors"
            >
              GET A QUOTE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
