"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
}

export default function AdminLoginScreen({ onLoginSuccess }: AdminLoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    setTimeout(() => {
      // Validate credentials (default: admin / admin123 or admin@dfmhub.com)
      const validUser =
        username.trim().toLowerCase() === "admin" ||
        username.trim().toLowerCase() === "admin@dfmhub.com";
      const validPass = password === "admin123" || password === "dfmhub2026";

      if (validUser && validPass) {
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("dfm_admin_session", "authenticated");
            localStorage.setItem("dfm_admin_username", username.trim());
          }
        } catch (e) {}
        onLoginSuccess();
      } else {
        setErrorMsg("Invalid Admin Username or Password. Please try again.");
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMsg("");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#070d19] text-slate-100 font-poppins">
      <Card className="max-w-md w-full !bg-slate-900 border-slate-800 space-y-6 relative overflow-hidden text-slate-100">
        {/* Subtle Accent Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
          </div>
          <span className="text-amber-500 text-[11px] font-bold uppercase tracking-widest block">
            RESTRICTED ADMIN CONSOLE
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            DFMHUB Admin Login
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Authorized admin credentials required to access User Registrations &amp; Tool Projects database.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form using Shadcn UI Form Primitives */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label required className="!text-slate-300">Admin Username / Email</Label>
            <Input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<User className="w-4 h-4 text-slate-500" />}
              className="!bg-slate-950 !text-white !placeholder-slate-600 !border-slate-800 focus:!border-amber-500 focus:!bg-slate-950"
            />
          </div>

          <div className="space-y-1.5">
            <Label required className="!text-slate-300">Password</Label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-slate-500" />}
                className="pr-10 !bg-slate-950 !text-white !placeholder-slate-600 !border-slate-800 focus:!border-amber-500 focus:!bg-slate-950"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
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
            className="w-full mt-2 font-extrabold text-xs tracking-wider"
          >
            <span>{isSubmitting ? "AUTHENTICATING..." : "LOGIN TO ADMIN CONSOLE"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Demo Credentials Hint using Shadcn Button */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleQuickDemoFill}
            className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer lowercase"
          >
            <span>Auto-fill demo credentials</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 border border-slate-700">
              admin / admin123
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
