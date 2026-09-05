"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import {
  BarChart3,
  ShoppingBag,
  Users,
  FolderCheck,
  BookOpen,
  Sparkles,
  Search,
  RefreshCw,
  LogOut,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sliders,
  Package,
} from "lucide-react";
import AdminBlogManager from "@/components/AdminBlogManager";
import ProductsClient from "@/app/admin/products/ProductsClient";
import SeoManagerClient from "@/components/admin/SeoManagerClient";
import AdminAnalyticsView from "@/components/admin/AdminAnalyticsView";
import { DataTable } from "@/components/DataTable";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useRegistrationsQuery,
  useProductInquiriesQuery,
  useProjectsQuery,
  useUpdateRegistrationMutation,
  useUpdateProductInquiryMutation,
} from "@/hooks/useAdminQueries";
import { getRegistrationColumns } from "@/modules/dashboard/columns/registrationColumns";
import { getProductInquiryColumns } from "@/modules/dashboard/columns/productInquiryColumns";
import { getProjectColumns } from "@/modules/dashboard/columns/projectColumns";

const ADMIN_NAV_ITEMS = [
  { id: "analytics", label: "Analytics & Traffic", icon: BarChart3, category: "Overview" },
  { id: "product-inquiries", label: "Product Inquiries", icon: ShoppingBag, category: "Leads" },
  { id: "registrations", label: "General Registrations", icon: Users, category: "Leads" },
  { id: "projects", label: "Tool Projects", icon: FolderCheck, category: "Calculations" },
  { id: "products", label: "Products Catalog", icon: Package, category: "Management" },
  { id: "blog", label: "Blog Articles", icon: BookOpen, category: "Management" },
  { id: "seo", label: "SEO Portal", icon: Sliders, category: "Management" },
] as const;

export default function EarthLineApp() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("analytics");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    router.push("/admin/login");
  };

  // Filter States
  const [inqSearchQuery, setInqSearchQuery] = useState("");
  const [inqStatusFilter, setInqStatusFilter] = useState("ALL");
  const [regStatusFilter, setRegStatusFilter] = useState("ALL");
  const [regSearchQuery, setRegSearchQuery] = useState("");
  const [projSearchQuery, setProjSearchQuery] = useState("");

  // TanStack Query Hooks
  const { data: productInquiries = [], isLoading: loadingInquiries } = useProductInquiriesQuery();
  const { data: registrations = [], isLoading: loadingRegs } = useRegistrationsQuery();
  const { data: projects = [], isLoading: loadingProjects } = useProjectsQuery();

  const updateInquiryMutation = useUpdateProductInquiryMutation();
  const updateRegMutation = useUpdateRegistrationMutation();

  const handleUpdateInquiryStatus = useCallback(
    async (id: string, newStatus: string) => {
      await updateInquiryMutation.mutateAsync({ id, status: newStatus });
    },
    [updateInquiryMutation]
  );

  const handleUpdateInquiryAssigned = useCallback(
    async (id: string, assignedTo: string) => {
      await updateInquiryMutation.mutateAsync({ id, assignedTo });
    },
    [updateInquiryMutation]
  );

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

  // Column definitions
  const inquiryColumns = useMemo(
    () =>
      getProductInquiryColumns({
        onUpdateStatus: handleUpdateInquiryStatus,
        onUpdateAssigned: handleUpdateInquiryAssigned,
      }),
    [handleUpdateInquiryStatus, handleUpdateInquiryAssigned]
  );

  const regColumns = useMemo(
    () =>
      getRegistrationColumns({
        onUpdateStatus: handleUpdateRegStatus,
        onUpdateAssigned: handleUpdateRegAssigned,
      }),
    [handleUpdateRegStatus, handleUpdateRegAssigned]
  );

  const projectColumns = useMemo(
    () =>
      getProjectColumns({
        onViewDetails: (project) => {
          router.push(`/admin/projects/${project.id}`);
        },
      }),
    [router]
  );


  // Filtered Lists
  const filteredInquiries = useMemo(() => {
    return productInquiries.filter((inq: any) => {
      const matchesStatus = inqStatusFilter === "ALL" || inq.status === inqStatusFilter;
      const q = inqSearchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        inq.contactPerson?.toLowerCase().includes(q) ||
        inq.companyName?.toLowerCase().includes(q) ||
        inq.phoneNumber?.includes(q) ||
        inq.email?.toLowerCase().includes(q) ||
        inq.productTitle?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [productInquiries, inqStatusFilter, inqSearchQuery]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg: any) => {
      const matchesStatus = regStatusFilter === "ALL" || reg.status === regStatusFilter;
      const q = regSearchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        reg.fullName?.toLowerCase().includes(q) ||
        reg.companyName?.toLowerCase().includes(q) ||
        reg.phoneNumber?.includes(q) ||
        reg.email?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [registrations, regStatusFilter, regSearchQuery]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj: any) => {
      const q = projSearchQuery.toLowerCase();
      return (
        q === "" ||
        proj.siteName?.toLowerCase().includes(q) ||
        proj.userFullName?.toLowerCase().includes(q) ||
        proj.userEmail?.toLowerCase().includes(q) ||
        proj.location?.toLowerCase().includes(q)
      );
    });
  }, [projects, projSearchQuery]);

  // Tables
  const inquiryTable = useReactTable({
    data: filteredInquiries,
    columns: inquiryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const regTable = useReactTable({
    data: filteredRegistrations,
    columns: regColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const projectTable = useReactTable({
    data: filteredProjects,
    columns: projectColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-400">Verifying Admin Access...</span>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex overflow-x-hidden font-poppins">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Sidebar Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <Image
              src="/image.png"
              alt="DFMHUB Logo"
              width={140}
              height={40}
              priority
              className="h-9 w-auto object-contain shrink-0"
            />
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </div>
            )}

            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              let badgeCount = 0;
              if (item.id === "product-inquiries") badgeCount = productInquiries.length;
              if (item.id === "registrations") badgeCount = registrations.length;
              if (item.id === "projects") badgeCount = projects.length;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && badgeCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          {!sidebarCollapsed && (
            <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">DFMHUB Admin</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">admin@dfmhub.com</div>
            </div>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className={`w-full h-9 text-xs rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              sidebarCollapsed ? "p-0" : ""
            }`}
            title="Logout Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Right Content Panel */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="hidden sm:inline">Admin Console</span>
              <span className="hidden sm:inline">&gt;</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold capitalize">
                {ADMIN_NAV_ITEMS.find((i) => i.id === activeTab)?.label || activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
              className="h-9 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 hover:border-amber-500 rounded-xl cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">View Site</span>
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
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 w-full space-y-8">
          {/* TAB 1: Analytics */}
          {activeTab === "analytics" && <AdminAnalyticsView />}

          {/* TAB 2: Product Inquiries */}
          {activeTab === "product-inquiries" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Inquiries</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    B2B customer quotes and product inquiry submissions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search inquiries..."
                      value={inqSearchQuery}
                      onChange={(e) => setInqSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs w-60 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>
                  <Select
                    value={inqStatusFilter}
                    onChange={(val) => setInqStatusFilter(val)}
                    options={[
                      { value: "ALL", label: "All Statuses" },
                      { value: "NEW", label: "New" },
                      { value: "IN_PROGRESS", label: "In Progress" },
                      { value: "RESOLVED", label: "Resolved" },
                    ]}
                    className="h-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <DataTable table={inquiryTable} isLoading={loadingInquiries} />
            </div>
          )}

          {/* TAB 3: General Registrations */}
          {activeTab === "registrations" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">General Registrations</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Calculations and risk assessment registration submissions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search registrations..."
                      value={regSearchQuery}
                      onChange={(e) => setRegSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs w-60 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>
                  <Select
                    value={regStatusFilter}
                    onChange={(val) => setRegStatusFilter(val)}
                    options={[
                      { value: "ALL", label: "All Statuses" },
                      { value: "NEW", label: "New" },
                      { value: "IN_PROGRESS", label: "In Progress" },
                      { value: "RESOLVED", label: "Resolved" },
                    ]}
                    className="h-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <DataTable table={regTable} isLoading={loadingRegs} />
            </div>
          )}

          {/* TAB 4: Tool Projects */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tool Projects</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Saved engineering calculations & site audits.
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search projects..."
                    value={projSearchQuery}
                    onChange={(e) => setProjSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-xs w-60 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <DataTable table={projectTable} isLoading={loadingProjects} />
            </div>
          )}


          {/* TAB 5: Products Catalog */}
          {activeTab === "products" && <ProductsClient />}

          {/* TAB 6: Blog Management */}
          {activeTab === "blog" && <AdminBlogManager />}

          {/* TAB 7: SEO Management */}
          {activeTab === "seo" && <SeoManagerClient />}
        </main>
      </div>
    </div>
  );
}
