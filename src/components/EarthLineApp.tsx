"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import {
  Users,
  Search,
  Sun,
  Moon,
  FolderCheck,
  LogOut,
  ShieldCheck,
  Globe,
  BookOpen,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import AdminBlogManager from "@/components/AdminBlogManager";
import AdminHeader from "@/components/AdminHeader";
import ProductsClient from "@/app/admin/products/ProductsClient";
import { DataTable } from "@/components/DataTable";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useRegistrationsQuery,
  useProjectsQuery,
  useUpdateRegistrationMutation,
  ProjectRecord,
} from "@/hooks/useAdminQueries";
import { getRegistrationColumns } from "@/modules/dashboard/columns/registrationColumns";
import { getProjectColumns } from "@/modules/dashboard/columns/projectColumns";

export default function EarthLineApp() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("registrations");

  // Admin Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState(true);

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

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("dfm_admin_session");
        localStorage.removeItem("dfm_admin_token");
        localStorage.removeItem("dfm_admin_username");
      }
    } catch (e) {}
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // Filter States
  const [regStatusFilter, setRegStatusFilter] = useState("ALL");
  const [regSearchQuery, setRegSearchQuery] = useState("");
  const [projSearchQuery, setProjSearchQuery] = useState("");

  // TanStack Query Hooks for Data & Mutations
  const {
    data: registrations = [],
    isLoading: loadingRegs,
  } = useRegistrationsQuery();

  const {
    data: projects = [],
    isLoading: loadingProjects,
  } = useProjectsQuery();

  const updateRegMutation = useUpdateRegistrationMutation();

  // Registration Handlers
  const handleUpdateRegStatus = useCallback(
    async (id: string, newStatus: string) => {
      await updateRegMutation.mutateAsync({ id, status: newStatus });
    },
    [updateRegMutation]
  );

  const handleUpdateRegAssigned = useCallback(
    async (id: string, assignedTo: string) => {
      await updateRegMutation.mutateAsync({ id, assignedTo });
    },
    [updateRegMutation]
  );

  // Filtered Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchesStatus =
        regStatusFilter === "ALL" || (r.status || "NEW") === regStatusFilter;
      const q = regSearchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        r.fullName?.toLowerCase().includes(q) ||
        r.companyName?.toLowerCase().includes(q) ||
        r.phoneNumber?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.location?.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [registrations, regStatusFilter, regSearchQuery]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = projSearchQuery.toLowerCase();
      return (
        !q ||
        p.siteName?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.occupancy?.toLowerCase().includes(q) ||
        p.userFullName?.toLowerCase().includes(q) ||
        p.userPhone?.toLowerCase().includes(q)
      );
    });
  }, [projects, projSearchQuery]);

  // Navigation handler to navigate to dedicated project detail page
  const handleOpenProjectDetails = useCallback(
    (project: ProjectRecord) => {
      router.push(`/admin/projects/${project.id}`);
    },
    [router]
  );

  // TanStack Table Columns
  const regColumns = useMemo(
    () =>
      getRegistrationColumns({
        onUpdateStatus: handleUpdateRegStatus,
        onUpdateAssigned: handleUpdateRegAssigned,
      }),
    [handleUpdateRegStatus, handleUpdateRegAssigned]
  );

  const projColumns = useMemo(
    () => getProjectColumns({ onViewDetails: handleOpenProjectDetails }),
    [handleOpenProjectDetails]
  );

  // TanStack Table Instance for Registrations
  const regTable = useReactTable({
    data: filteredRegistrations,
    columns: regColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  // TanStack Table Instance for Projects
  const projTable = useReactTable({
    data: filteredProjects,
    columns: projColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const statusFilterOptions: SelectOption[] = [
    { value: "ALL", label: "All Statuses" },
    { value: "NEW", label: "New" },
    { value: "CONTACTED", label: "Contacted" },
    { value: "QUOTATION_SENT", label: "Quotation Sent" },
    { value: "PAID", label: "Paid" },
    { value: "DID_NOT_BUY", label: "Did Not Buy" },
  ];

  // Auth Protection Check
  if (authChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070d19] text-amber-400 text-xs font-mono tracking-widest">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>AUTHENTICATING EXECUTIVE CONSOLE...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-poppins transition-colors duration-200 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Sleek Executive Navbar */}
        <AdminHeader />

        {/* Clean Modern Navigation Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <TabsList className="w-full sm:w-auto justify-start p-1 bg-slate-100 dark:bg-slate-900/90 rounded-full border border-slate-200 dark:border-slate-800">
            <TabsTrigger value="registrations" className="flex items-center gap-1.5 py-1.5 px-4 rounded-full font-semibold text-xs">
              <Users className="w-3.5 h-3.5" />
              <span>User Registrations</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1.5 py-1.5 px-4 rounded-full font-semibold text-xs">
              <FolderCheck className="w-3.5 h-3.5" />
              <span>Tool Projects</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1.5 py-1.5 px-4 rounded-full font-semibold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog Management</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1.5 py-1.5 px-4 rounded-full font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Products Management</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB CONTENT 1: USER REGISTRATIONS */}
        <TabsContent value="registrations">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span>User Registrations Database</span>
                </h2>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search user, email, phone..."
                  value={regSearchQuery}
                  onChange={(e) => setRegSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  className="w-full sm:w-64 text-xs"
                />

                <Select
                  value={regStatusFilter}
                  onChange={setRegStatusFilter}
                  options={statusFilterOptions}
                  className="w-36"
                />
              </div>
            </Card>

            <DataTable
              table={regTable}
              isLoading={loadingRegs}
              loadingText="Loading User Registrations..."
              emptyText="No user registrations match the selected criteria."
            />
          </div>
        </TabsContent>

        {/* TAB CONTENT 2: TOOL PROJECTS */}
        <TabsContent value="projects">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FolderCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Tool Calculation Projects Database</span>
                </h2>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search customer, site, city..."
                  value={projSearchQuery}
                  onChange={(e) => setProjSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  className="w-full sm:w-64 text-xs"
                />
              </div>
            </Card>

            <DataTable
              table={projTable}
              isLoading={loadingProjects}
              loadingText="Loading Tool Projects..."
              emptyText="No tool calculation projects recorded yet. Submissions from /tool page will appear here."
            />
          </div>
        </TabsContent>

        {/* TAB CONTENT 3: BLOG POST MANAGEMENT */}
        <TabsContent value="blog">
          <div className="max-w-7xl mx-auto">
            <AdminBlogManager />
          </div>
        </TabsContent>

        {/* TAB CONTENT 4: PRODUCTS MANAGEMENT */}
        <TabsContent value="products">
          <div className="max-w-7xl mx-auto">
            <ProductsClient />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
