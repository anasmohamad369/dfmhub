import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, Phone, Mail, MapPin } from "lucide-react";
import { Select, SelectOption } from "@/components/ui/select";
import { AssignedToCell } from "../components/AssignedToCell";
import { RegistrationRecord } from "@/hooks/useAdminQueries";

interface RegistrationColumnsProps {
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onUpdateAssigned: (id: string, assignedTo: string) => Promise<void>;
}

export function getRegistrationColumns({
  onUpdateStatus,
  onUpdateAssigned,
}: RegistrationColumnsProps): ColumnDef<RegistrationRecord>[] {
  return [
    {
      accessorKey: "id",
      header: "Ref ID",
      cell: ({ row }) => (
        <span className="font-mono font-extrabold text-slate-900 dark:text-white flex flex-col gap-2">
          {row.original.id}
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{new Date(row.original.createdAt).toLocaleDateString()}</p>
        </span>
      ),
    },
    
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
        <span className="font-bold text-slate-900 dark:text-white text-sm">
          {row.original.fullName}
        </span>
      ),
    },
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => (
        <span className="text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {row.original.companyName}
        </span>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-bold text-xs font-mono">
          <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
          <a href={`tel:${row.original.phoneNumber}`} className="hover:text-amber-700 dark:hover:text-amber-400">
            {row.original.phoneNumber}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium text-xs">
          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <a href={`mailto:${row.original.email}`} className="hover:text-slate-900 dark:hover:text-slate-100">
            {row.original.email}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-amber-700 dark:text-amber-400 font-extrabold text-xs flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {row.original.location || "—"}
        </span>
      ),
    },
    {
      accessorKey: "requirement",
      header: "Requirement",
      cell: ({ row }) => (
        <span className="text-slate-900 dark:text-slate-100 text-xs font-bold">
          {row.original.requirement || "General Registration"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "NEW";
        const statusOptions: SelectOption[] = [
          { value: "NEW", label: "NEW", badgeClass: "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-400" },
          { value: "CONTACTED", label: "CONTACTED", badgeClass: "bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 border-indigo-400" },
          { value: "QUOTATION_SENT", label: "QUOTATION SENT", badgeClass: "bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-300 border-sky-400" },
          { value: "PAID", label: "PAID", badgeClass: "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-400" },
          { value: "DID_NOT_BUY", label: "DID NOT BUY", badgeClass: "bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border-rose-400" },
        ];

        // Lower rows open dropdown upwards to prevent clipping under pagination
        const isLowerRow = row.index >= 2;

        return (
          <div className="w-[145px] shrink-0">
            <Select
              value={status}
              onChange={(newStatus) => onUpdateStatus(row.original.id, newStatus)}
              options={statusOptions}
              dropUp={isLowerRow}
              className="w-full"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      cell: ({ row }) => (
        <AssignedToCell
          id={row.original.id}
          initialAssignedTo={row.original.assignedTo}
          onSave={onUpdateAssigned}
        />
      ),
    },
  ];
}
