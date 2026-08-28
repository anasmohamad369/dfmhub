"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import {
  Users,
  Search,
  FolderCheck,
  BookOpen,
  Sparkles,
  RefreshCw,
  ShoppingBag,
  Package,
} from "lucide-react";
import AdminBlogManager from "@/components/AdminBlogManager";
import AdminHeader from "@/components/AdminHeader";
import ProductsClient from "@/app/admin/products/ProductsClient";
import { DataTable } from "@/components/DataTable";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

const ADMIN_NAV_TABS = [
  { id: "product-inquiries", label: "Product Inquiries", icon: ShoppingBag },
  { id: "registrations", label: "General Registrations", icon: Users },
  { id: "projects", label: "Tool Projects", icon: FolderCheck },
  { id: "blog", label: "Blog Management", icon: BookOpen },
  { id: "products", label: "Products Catalog", icon: Sparkles },
] as const;

export default function EarthLineApp() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("product-inquiries");

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

  // Filter States
  const [inqSearchQuery, setInqSearchQuery] = useState("");
  const [inqStatusFilter, setInqStatusFilter] = useState("ALL");
  const [regStatusFilter, setRegStatusFilter] = useState("ALL");
  const [regSearchQuery, setRegSearchQuery] = useState("");
  const [projSearchQuery, setProjSearchQuery] = useState("");

  // TanStack Query Hooks
  const {
    data: productInquiries = [],
    isLoading: loadingInquiries,
  } = useProductInquiriesQuery();

  const {
    data: registrations = [],
    isLoading: loadingRegs,
  } = useRegistrationsQuery();

  const {
    data: projects = [],
    isLoading: loadingProjects,
  } = useProjectsQuery();

  const updateInquiryMutation = useUpdateProductInquiryMutation();
  const updateRegMutation = useUpdateRegistrationMutation();

  // Product Inquiry Handlers
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

  // General Registration Handlers
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

  // Columns Configuration
  const productInquiryColumns = useMemo(
    () =>
      getProductInquiryColumns({
        onUpdateStatus: handleUpdateInquiryStatus,
        onUpdateAssigned: handleUpdateInquiryAssigned,
      }),
    [handleUpdateInquiryStatus, handleUpdateInquiryAssigned]
  );

  const registrationColumns = useMemo(
    () =>
      getRegistrationColumns({
        onUpdateStatus: handleUpdateRegStatus,
        onUpdateAssigned: handleUpdateRegAssigned,
      }),
    [handleUpdateRegStatus, handleUpdateRegAssigned]
  );

  const projectColumns = useMemo(() => getProjectColumns(), []);

  // Filtered Product Inquiries
  const filteredProductInquiries = useMemo(() => {
    return productInquiries.filter((inq) => {
      const matchesStatus =
        inqStatusFilter === "ALL" || (inq.status || "NEW") === inqStatusFilter;
      const q = inqSearchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        inq.productTitle?.toLowerCase().includes(q) ||
        inq.contactPerson?.toLowerCase().includes(q) ||
        inq.companyName?.toLowerCase().includes(q) ||
        inq.phoneNumber?.toLowerCase().includes(q) ||
        inq.email?.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [productInquiries, inqStatusFilter, inqSearchQuery]);

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
        p.userFullName?.toLowerCase().includes(q) ||
        p.userPhone?.toLowerCase().includes(q)
      );
    });
  }, [projects, projSearchQuery]);

  // Table Instances
  const inqTable = useReactTable({
    data: filteredProductInquiries,
    columns: productInquiryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const regTable = useReactTable({
    data: filteredRegistrations,
    columns: registrationColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const projTable = useReactTable({
    data: filteredProjects,
    columns: projectColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 font-poppins transition-colors duration-200 relative overflow-hidden pb-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Full-width Executive Navbar */}
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Clean Navigation Tabs */}
          <div>
            <TabsList className="w-full sm:w-auto inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
              {ADMIN_NAV_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-1.5 py-2 px-4 rounded-full font-semibold text-xs transition-all cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* TAB CONTENT 1: PRODUCT INQUIRIES */}
          <TabsContent value="product-inquiries">
            <div className="space-y-6">
              <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <span>Product Quotation Requests (/api/product-inquiries)</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search product, company, person..."
                    value={inqSearchQuery}
                    onChange={(e) => setInqSearchQuery(e.target.value)}
                    icon={<Search className="w-4 h-4" />}
                    className="w-full sm:w-64 text-xs"
                  />

                  <Select
                    value={inqStatusFilter}
                    onChange={(val) => setInqStatusFilter(val)}
                    placeholder="All Statuses"
                    options={[
                      { value: "ALL", label: "All Statuses" },
                      { value: "NEW", label: "New" },
                      { value: "CONTACTED", label: "Contacted" },
                      { value: "QUOTATION_SENT", label: "Quotation Sent" },
                      { value: "CLOSED", label: "Closed" },
                      { value: "REJECTED", label: "Rejected" },
                    ]}
                  />
                </div>
              </Card>

              <DataTable
                table={inqTable}
                isLoading={loadingInquiries}
                loadingText="Loading Product Inquiries..."
                emptyText="No product inquiries submitted yet. Submissions from product quotation forms will appear here."
              />
            </div>
          </TabsContent>

          {/* TAB CONTENT 2: GENERAL REGISTRATIONS */}
          <TabsContent value="registrations">
            <div className="space-y-6">
              <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>General Website Contact Registrations (/api/registrations)</span>
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
                    onChange={(val) => setRegStatusFilter(val)}
                    placeholder="All Statuses"
                    options={[
                      { value: "ALL", label: "All Statuses" },
                      { value: "NEW", label: "New" },
                      { value: "CONTACTED", label: "Contacted" },
                      { value: "QUOTATION_SENT", label: "Quotation Sent" },
                      { value: "PAID", label: "Paid" },
                      { value: "DID_NOT_BUY", label: "Did Not Buy" },
                    ]}
                  />
                </div>
              </Card>

              <DataTable
                table={regTable}
                isLoading={loadingRegs}
                loadingText="Loading Registrations..."
                emptyText="No general contact registrations found."
              />
            </div>
          </TabsContent>

          {/* TAB CONTENT 3: TOOL PROJECTS */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <FolderCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>Engineering Tool Projects Database</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search project, email..."
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
                emptyText="No tool calculation projects recorded yet."
              />
            </div>
          </TabsContent>

          {/* TAB CONTENT 4: BLOG POST MANAGEMENT */}
          <TabsContent value="blog">
            <div>
              <AdminBlogManager />
            </div>
          </TabsContent>

          {/* TAB CONTENT 5: PRODUCTS CATALOG MANAGEMENT */}
          <TabsContent value="products">
            <div>
              <ProductsClient />
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
