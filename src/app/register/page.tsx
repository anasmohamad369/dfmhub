"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tool");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 flex items-center justify-center font-sans transition-colors duration-200">
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm bg-white dark:bg-[#0b1329] px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span>Loading assessment tool...</span>
      </div>
    </div>
  );
}
