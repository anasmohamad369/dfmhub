import Link from "next/link";
import { Metadata } from "next";
import { ShieldAlert, ArrowLeft, Home, Package, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | DFMHUB",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist or has been relocated to another address.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all border border-slate-200 dark:border-slate-700"
          >
            <Package className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Need urgent assistance or technical support?{" "}
            <Link href="/contact-us" className="text-amber-600 hover:underline font-medium">
              Contact our engineering team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
