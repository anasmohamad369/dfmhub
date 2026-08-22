"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import {
  Users,
  RefreshCw,
  Search,
  Sun,
  Moon,
  FolderCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  useRegistrationsQuery,
  useProjectsQuery,
  useUpdateRegistrationMutation,
} from "@/hooks/useAdminQueries";
import { getRegistrationColumns } from "@/modules/dashboard/columns/registrationColumns";
import { getProjectColumns } from "@/modules/dashboard/columns/projectColumns";
import AdminLoginScreen from "@/modules/dashboard/components/AdminLoginScreen";

function TablePaginationBar({ table }: { table: ReactTableInstance<any> }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount() || 1;
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-slate-600 dark:text-slate-400 font-medium">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-1 font-semibold outline-none text-slate-900 dark:text-white focus:border-amber-500 cursor-pointer"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1 font-mono text-slate-600 dark:text-slate-400">
        <span>Page</span>
        <strong className="text-slate-900 dark:text-white font-bold">
          {pageIndex + 1} of {pageCount}
        </strong>
        <span className="text-slate-500">({totalRows} total entries)</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="h-8 w-8 p-0 flex items-center justify-center border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 w-8 p-0 flex items-center justify-center border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 w-8 p-0 flex items-center justify-center border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="h-8 w-8 p-0 flex items-center justify-center border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </Button>
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";

export default function EarthLineApp() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"registrations" | "projects">("registrations");

  // Admin Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("dfm_admin_session");
        if (session === "authenticated") {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      }
    } catch (e) {}
    setAuthChecking(false);
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

  // TanStack Query Hooks for Data & Mutations (only enabled when authenticated)
  const {
    data: registrations = [],
    isLoading: loadingRegs,
    refetch: refetchRegistrations,
  } = useRegistrationsQuery();

  const {
    data: projects = [],
    isLoading: loadingProjects,
    refetch: refetchProjects,
  } = useProjectsQuery();

  const updateRegMutation = useUpdateRegistrationMutation();

  // Registration Handlers (memoized)
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

  // Imported Modular TanStack Table Columns
  const regColumns = useMemo(
    () =>
      getRegistrationColumns({
        onUpdateStatus: handleUpdateRegStatus,
        onUpdateAssigned: handleUpdateRegAssigned,
      }),
    [handleUpdateRegStatus, handleUpdateRegAssigned]
  );

  const projColumns = useMemo(() => getProjectColumns(), []);

  // TanStack Table Instance for Registrations with Pagination
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

  // TanStack Table Instance for Projects with Pagination
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
  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#070d19] text-amber-500 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>VERIFYING ADMIN SESSION...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-200">
      {/* Top Header & 2-Table Tab Switcher */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-300 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>DFMHUB EXECUTIVE CONSOLE (AUTHENTICATED)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Admin Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Main 2 Tabs: User Registrations & Tool Projects using Shadcn Button */}
          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
            <Button
              variant={activeTab === "registrations" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("registrations")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 ${
                activeTab === "registrations" ? "" : "text-slate-700 dark:text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Registrations ({registrations.length})</span>
            </Button>

            <Button
              variant={activeTab === "projects" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 ${
                activeTab === "projects" ? "" : "text-slate-700 dark:text-slate-400 hover:text-white"
              }`}
            >
              <FolderCheck className="w-4 h-4" />
              <span>Tool Projects ({projects.length})</span>
            </Button>
          </div>

          {/* Landing Page Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="h-10 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
            title="Back to Landing Page"
          >
            <Globe className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            <span className="hidden sm:inline">Landing Page</span>
          </Button>

          {/* Light / Dark Mode Toggle using Shadcn Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-2.5 h-10 w-10 min-w-0 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800" />
            )}
          </Button>

          {/* Admin Logout Button using Shadcn Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="h-10 border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/80 font-bold text-xs"
            title="Log out of Admin Console"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* TABLE 1: USER REGISTRATIONS */}
      {activeTab === "registrations" && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Card using Shadcn Card */}
          <Card className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-slate-300 dark:border-slate-800 relative z-30 overflow-visible">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                User Registrations Database ({filteredRegistrations.length})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                All registered users and contact form submissions from website visitors.
              </p>
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

              <Button
                variant="secondary"
                size="sm"
                onClick={() => refetchRegistrations()}
                disabled={loadingRegs}
                className="text-xs font-bold shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingRegs ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </Card>

          {/* Registrations Table Container Card */}
          <Card className="p-0 overflow-hidden border-slate-300 dark:border-slate-800 relative z-10">
            {loadingRegs ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                <span>Loading User Registrations via TanStack Query...</span>
              </div>
            ) : regTable.getRowModel().rows.length === 0 ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-400 font-semibold text-xs">
                No user registrations match the selected criteria.
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    {regTable.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {regTable.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePaginationBar table={regTable} />
              </>
            )}
          </Card>
        </div>
      )}

      {/* TABLE 2: TOOL PROJECTS */}
      {activeTab === "projects" && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Card using Shadcn Card */}
          <Card className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-slate-300 dark:border-slate-800 relative z-30 overflow-visible">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderCheck className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                Tool Calculation Projects Database ({filteredProjects.length})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Project site details, building dimensions, soil &amp; earth resistance calculations submitted from /tool page.
              </p>
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

              <Button
                variant="secondary"
                size="sm"
                onClick={() => refetchProjects()}
                disabled={loadingProjects}
                className="text-xs font-bold shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingProjects ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </Card>

          {/* Tool Projects Table Container Card */}
          <Card className="p-0 overflow-hidden border-slate-300 dark:border-slate-800 relative z-10">
            {loadingProjects ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-400 font-semibold text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                <span>Loading Tool Projects via TanStack Query...</span>
              </div>
            ) : projTable.getRowModel().rows.length === 0 ? (
              <div className="p-12 text-center text-slate-600 dark:text-slate-400 font-semibold text-xs">
                No tool calculation projects recorded yet. Submissions from /tool page will appear here.
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    {projTable.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {projTable.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePaginationBar table={projTable} />
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
