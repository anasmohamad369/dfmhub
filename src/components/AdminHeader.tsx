"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export default function AdminHeader({ title }: { title?: string }) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("dfm_admin_session");
        localStorage.removeItem("dfm_admin_token");
        localStorage.removeItem("dfm_admin_username");
      }
    } catch (e) {}
    router.push("/admin/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Logo & Context Title */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-12 w-auto flex items-center">
              <Image
                src="/image.png"
                alt="DFMHUB Logo"
                width={160}
                height={48}
                priority
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {title ? (
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          ) : null}

          {title && (
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Console</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="h-9 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 hover:border-amber-500 hover:text-amber-600 transition-all rounded-xl cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>Landing Page</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-2 h-9 w-9 min-w-0 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-amber-500 rounded-xl cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-800" />
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="h-9 border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/80 font-semibold text-xs flex items-center gap-1.5 rounded-xl cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
