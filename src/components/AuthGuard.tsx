"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("isAuthenticated");
      const isAuth = stored === "true";
      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (!isAuth) {
        router.replace("/register");
      }
    }
  }, [router]);

  const login = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "false");
      setIsAuthenticated(false);
      router.replace("/register");
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 flex items-center justify-center font-sans transition-colors duration-200">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-mono text-sm bg-white dark:bg-[#0b1329] px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span>Redirecting to registration...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
