"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useRegisterProjectMutation, useRegistrationsQuery } from "../../application/hooks/useRegistrationQueries";
import { RegistrationHeroSection } from "../components/RegistrationHeroSection";
import { RegistrationFormCard } from "../components/RegistrationFormCard";
import { RegistrationFormValues } from "../../domain/entities/ProjectRegistration";

export function RegistrationPageContainer() {
  const router = useRouter();

  // If user is already authenticated, redirect immediately to /tool
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      if (isAuth) {
        router.replace("/tool");
      }
    }
  }, [router]);

  // TanStack Query & Mutation Hooks
  const registerMutation = useRegisterProjectMutation();
  useRegistrationsQuery(); // Pre-fetches and caches registration records

  const handleSubmit = async (values: RegistrationFormValues) => {
    await registerMutation.mutateAsync(values);

    // Store authentication flag in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true");
    }

    // Direct navigation to tool page
    router.replace("/tool");
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 flex flex-col font-poppins relative overflow-hidden transition-colors duration-200">
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ---------------- Main Content Section ---------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Side: Hero Section */}
        <RegistrationHeroSection />

        {/* Right Side: Registration Form Card */}
        <div className="lg:col-span-6">
          <Card className="relative overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#09101f]/95 shadow-2xl shadow-slate-200/60 dark:shadow-slate-950/50 p-6 sm:p-8">
            <RegistrationFormCard
              onSubmit={handleSubmit}
              isSubmitting={registerMutation.isPending}
            />
          </Card>
        </div>
      </main>

      {/* EXPLICITLY NO FOOTER ON REGISTER PAGE */}
    </div>
  );
}
