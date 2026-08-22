import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { ProjectRecord } from "@/hooks/useAdminQueries";

export function getProjectColumns(): ColumnDef<ProjectRecord>[] {
  return [
    {
      accessorKey: "id",
      header: "Project Ref",
      cell: ({ row }) => (
        <span className="font-mono font-extrabold text-slate-900 dark:text-white">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-mono">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "userFullName",
      header: "Linked Customer",
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white text-xs block">
            👤 {row.original.userFullName || "Guest User"}
          </span>
          {row.original.userPhone && row.original.userPhone !== "N/A" && (
            <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] block">
              📞 {row.original.userPhone}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "siteName",
      header: "Site Name",
      cell: ({ row }) => (
        <span className="font-bold text-slate-900 dark:text-white text-xs">
          🏢 {row.original.siteName}
        </span>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-amber-700 dark:text-amber-400 font-semibold text-xs flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {row.original.location}
        </span>
      ),
    },
    {
      accessorKey: "occupancy",
      header: "Occupancy",
      cell: ({ row }) => (
        <span className="text-slate-900 dark:text-slate-100 font-medium text-xs">
          {row.original.occupancy}
        </span>
      ),
    },
    {
      accessorKey: "dimensions",
      header: "Dimensions (L×W×H)",
      cell: ({ row }) => (
        <span className="text-slate-700 dark:text-slate-300 font-mono text-xs">
          {row.original.dimensions}
        </span>
      ),
    },
    {
      accessorKey: "soilType",
      header: "Soil Type",
      cell: ({ row }) => (
        <span className="text-slate-800 dark:text-slate-200 text-xs">
          {row.original.soilType}
        </span>
      ),
    },
    {
      accessorKey: "climateZone",
      header: "Climate Zone",
      cell: ({ row }) => (
        <span className="text-slate-800 dark:text-slate-200 text-xs">
          {row.original.climateZone}
        </span>
      ),
    },
    {
      accessorKey: "avgResistance",
      header: "Avg Resistance (R_avg)",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
          {row.original.avgResistance}
        </span>
      ),
    },
    {
      accessorKey: "targetResistance",
      header: "Target Resistance",
      cell: ({ row }) => (
        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 text-xs">
          {row.original.targetResistance}
        </span>
      ),
    },
    {
      accessorKey: "checklistScore",
      header: "Checklist Score",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-slate-800 dark:text-slate-200">
          {row.original.checklistScore}
        </span>
      ),
    },
    {
      accessorKey: "lplClass",
      header: "LPL Class",
      cell: ({ row }) => (
        <span className="font-bold text-amber-600 dark:text-amber-400 text-xs font-mono">
          {row.original.lplClass}
        </span>
      ),
    },
    {
      accessorKey: "riskR1",
      header: "Lightning Risk (R1)",
      cell: ({ row }) => (
        <span className="font-mono text-sky-700 dark:text-sky-400 font-semibold text-xs">
          {row.original.riskR1}
        </span>
      ),
    },
  ];
}
