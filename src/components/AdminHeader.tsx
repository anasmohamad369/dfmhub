"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Globe, Sun, Moon, LogOut } from "lucide-react";
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
    <div className="max-w-7xl mx-auto mb-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px] font-mono font-semibold tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DFMHUB EXECUTIVE CONSOLE (AUTHENTICATED)</span>
        </div>
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title || "Admin Management Console"}
        </h1>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
          className="h-9 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 hover:border-amber-500 transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
          <span>Landing Page</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="p-2 h-9 w-9 min-w-0 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-amber-500"
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
          className="h-9 border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/80 font-semibold text-xs flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
