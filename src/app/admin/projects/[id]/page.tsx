"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldAlert,
  Activity,
  Printer,
  RefreshCw,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Zap,
  Globe,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectRecord } from "@/hooks/useAdminQueries";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Check Admin Authentication
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("dfm_admin_session");
        if (session === "authenticated") {
          setIsAuthenticated(true);
          setAuthChecking(false);
        } else {
          router.replace("/admin/login");
        }
      }
    } catch (e) {
      router.replace("/admin/login");
    }
  }, [router]);

  // Fetch Project Details by ID
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchProjectDetail() {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setProject(json.data);
        } else {
          setError(json.error || "Project not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load project details");
      } finally {
        setLoading(false);
      }
    }

    fetchProjectDetail();
  }, [projectId, isAuthenticated]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (authChecking || (loading && isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070d19] text-amber-700 dark:text-amber-500 text-xs transition-colors duration-200">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>LOADING PROJECT SPECIFICATIONS...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] p-6 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center border-slate-300 dark:border-slate-800 space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold">Project Details Unavailable</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {error || `Unable to locate project record with Ref ID: ${projectId}`}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="w-full text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-poppins transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="w-fit text-xs font-bold border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-amber-500" />
            Back to Executive Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs font-bold border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
              title="Print Specification Report"
            >
              <Printer className="w-4 h-4 mr-1.5 text-slate-600 dark:text-slate-300" />
              <span>Print / Export PDF</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-2.5 h-9 w-9 min-w-0 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-800" />
              )}
            </Button>
          </div>
        </div>

        {/* Page Hero Header */}
        <Card className="p-6 border-slate-300 dark:border-slate-800 bg-gradient-to-r from-amber-500/5 via-slate-100/50 to-slate-200/50 dark:from-amber-500/10 dark:via-slate-900/50 dark:to-slate-950/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>DFMHUB TOOL CALCULATION AUDIT</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 flex items-center gap-2">
                <Building2 className="w-7 h-7 text-amber-500" />
                {project.siteName}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{project.location}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Submitted {new Date(project.createdAt).toLocaleString()}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">
                  Project Ref Code
                </span>
                <strong className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                  {project.id}
                </strong>
              </div>
            </div>
          </div>
        </Card>

        {/* 2-Column Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Customer & Building Specs (1 col) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Customer Details Card */}
            <Card className="p-5 border-slate-300 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <User className="w-4 h-4" />
                <span>Customer Contact Details</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                    Full Name
                  </span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{project.userFullName || "Guest User"}</span>
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                    Phone Number
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    {project.userPhone || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                    Email Address
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    {project.userEmail || "N/A"}
                  </span>
                </div>

                {project.registrationId && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-medium">
                      Linked Registration Ref
                    </span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-0.5 block">
                      {project.registrationId}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Building Specs Card */}
            <Card className="p-5 border-slate-300 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Building2 className="w-4 h-4" />
                <span>Facility &amp; Dimensions</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 font-medium">Dimensions (L×W×H)</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {project.dimensions}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 font-medium">Occupancy Classification</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {project.occupancy}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 font-medium">Soil Type</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {project.soilType}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Climate Zone</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {project.climateZone}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Engineering Calculations & Technical Results (2 cols) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Section 1: Earthing & Resistance Calculations */}
            <Card className="p-6 border-slate-300 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Activity className="w-5 h-5 text-amber-500" />
                <span>1. Structural Earthing Calculations (IS 3043:2018)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-xs text-amber-800 dark:text-amber-300 font-medium block">
                    Calculated Average Earth Resistance (R_avg)
                  </span>
                  <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-1 block">
                    {project.avgResistance}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                    Based on Wenner 4-pin soil resistivity test and soil profile.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium block">
                    Target Earth Resistance Specification
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 block">
                    {project.targetResistance}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                    Recommended target for sensitive electrical equipment &amp; transformers.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 2: Lightning Protection System (IEC 62305) */}
            <Card className="p-6 border-slate-300 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>2. Lightning Protection System Risk Audit (IEC 62305)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium block">LPL Protection Class</span>
                  <strong className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 block">
                    {project.lplClass}
                  </strong>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Rolling sphere radius &amp; mesh width tier
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium block">Lightning Risk (R1)</span>
                  <strong className="text-xl font-extrabold text-sky-600 dark:text-sky-400 mt-1 block">
                    {project.riskR1}
                  </strong>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Loss of human life probability index
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium block">Compliance Score</span>
                  <strong className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">
                    {project.checklistScore}
                  </strong>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Audit checklist pass percentage
                  </span>
                </div>
              </div>
            </Card>

            {/* Section 3: Engineering Recommendation Notes */}
            <Card className="p-6 border-slate-300 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <FileText className="w-5 h-5 text-amber-500" />
                <span>3. Recommended Procurement &amp; Installation Steps</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">
                      ARK Make Pure Copper Bonded Earth Electrodes
                    </strong>
                    <span>
                      Install UL 467 &amp; IS 3043 compliant 250 micron copper-bonded steel earth rods around perimeter grounding ring.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">
                      Surge Protection Devices (Type 1 + Type 2 SPD)
                    </strong>
                    <span>
                      Install coordinated SPDs at main incoming distribution panels as required by IEC 62305-4 for Class {project.lplClass} installations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">
                      Pan-India Engineering &amp; Installation Support
                    </strong>
                    <span>
                      Connect with DFMHUB technical engineers for site inspection, fall-of-potential testing, and turnkey erection.
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
