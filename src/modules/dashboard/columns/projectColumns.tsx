import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin, Eye, Building2, User, Calendar, ShieldAlert, Smartphone } from "lucide-react";
import { ProjectRecord } from "@/hooks/useAdminQueries";
import { Button } from "@/components/ui/button";

export function getProjectColumns({
  onViewDetails,
}: {
  onViewDetails?: (project: ProjectRecord) => void;
} = {}): ColumnDef<ProjectRecord>[] {
  return [
    {
      accessorKey: "id",
      header: "Project Ref",
      cell: ({ row }) => (
        <div>
          <span className="font-semibold uppercase text-slate-900 dark:text-white text-xs block">
            {row.original.id}
          </span>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-amber-500" />
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "userFullName",
      header: "Linked Customer",
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            {row.original.userFullName || "Guest User"}
          </span>
          {row.original.userPhone && row.original.userPhone !== "N/A" && (
            <span className="text-slate-600 dark:text-slate-400 flex gap-2 text-[11px] block mt-0.5">
              < Smartphone className="w-3 h-3 shrink-0" /> {row.original.userPhone}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "siteName",
      header: "Site & Location",
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            {row.original.siteName}
          </span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            {row.original.location}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "occupancy",
      header: "Occupancy",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
          {row.original.occupancy}
        </span>
      ),
    },
    {
      accessorKey: "lplClass",
      header: "LPL Class",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
          <ShieldAlert className="w-3 h-3" />
          {row.original.lplClass}
        </span>
      ),
    },
    {
      accessorKey: "targetResistance",
      header: "Target Resistance",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
          {row.original.targetResistance}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Link href={`/admin/projects/${row.original.id}`} className="inline-block">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails?.(row.original)}
            className="h-8 px-3 text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 hover:border-amber-500/50 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Button>
        </Link>
      ),
    },
  ];
}
