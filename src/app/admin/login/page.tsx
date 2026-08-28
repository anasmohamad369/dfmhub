"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to /dashboard automatically
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("dfm_admin_session");
        if (session === "authenticated") {
          router.push("/admin");
        }
      }
    } catch (e) {}
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("dfm_admin_session", "authenticated");
          localStorage.setItem("dfm_admin_username", username.trim());
          localStorage.setItem("dfm_admin_token", data.token);
        }
        router.push("/admin");
      } else {
        setErrorMsg(data.error || "Invalid Admin credentials. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error. Failed to connect to authentication server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoFill = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 font-poppins transition-colors duration-200 relative">
      {/* Top Bar Navigation Actions */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
          className="h-10 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5"
          title="Back to Landing Page"
        >
          <Globe className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          <span>Landing Page</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="p-2.5 h-10 w-10 min-w-0 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-800" />
          )}
        </Button>
      </div>

      <Card className="max-w-md w-full border-slate-300 dark:border-slate-800 space-y-6 relative overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* Subtle Accent Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-amber-600 dark:text-amber-500 text-[11px]  font-semibold uppercase tracking-widest block">
            RESTRICTED ADMIN CONSOLE
          </span>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            DFMHUB Admin Portal
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
            Validate backend admin credentials to access User Registrations &amp; Tool Projects database.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form using Shadcn UI Form Primitives */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label required>Admin Username / Email</Label>
            <Input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<User className="w-4 h-4 text-slate-400" />}
            />
          </div>

          <div className="space-y-1.5">
            <Label required>Password</Label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-slate-400" />}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full mt-2 font-semibold text-xs tracking-wider"
          >
            <span>{isSubmitting ? "VALIDATING ..." : "LOGIN TO ADMIN CONSOLE"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleQuickDemoFill}
            className="text-[11px]  text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer lowercase"
          >
            <span>Auto-fill demo credentials</span>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-amber-700 dark:text-amber-300 border border-slate-300 dark:border-slate-700 ">
              admin / admin123
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
