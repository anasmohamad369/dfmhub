import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, Phone, Mail, Package, MessageCircle, FileText } from "lucide-react";
import { Select, SelectOption } from "@/components/ui/select";
import { AssignedToCell } from "../components/AssignedToCell";
import { ProductInquiryRecord } from "@/hooks/useAdminQueries";
import { getProductUrl } from "@/lib/products";

interface ProductInquiryColumnsProps {
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onUpdateAssigned: (id: string, assignedTo: string) => Promise<void>;
}

export function getProductInquiryColumns({
  onUpdateStatus,
  onUpdateAssigned,
}: ProductInquiryColumnsProps): ColumnDef<ProductInquiryRecord>[] {
  return [
    {
      accessorKey: "id",
      header: "Ref ID",
      cell: ({ row }) => (
        <span className="font-semibold uppercase text-slate-900 dark:text-white flex flex-col gap-1">
          <span className="text-amber-600 font-bold">{row.original.id}</span>
          <p className="text-xs text-slate-500">{new Date(row.original.createdAt).toLocaleDateString()}</p>
        </span>
      ),
    },
    {
      accessorKey: "productTitle",
      header: "Product Inquired",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Link
            href={row.original.productSlug ? getProductUrl({ slug: row.original.productSlug, category: row.original.category }) : "/product"}
            target="_blank"
            className="font-bold text-slate-900 dark:text-white text-xs hover:text-amber-600 flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{row.original.productTitle}</span>
          </Link>
          {row.original.category && (
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {row.original.category}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "companyName",
      header: "Company Name",
      cell: ({ row }) => (
        <span className="text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {row.original.companyName}
        </span>
      ),
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      cell: ({ row }) => (
        <span className="font-bold text-slate-900 dark:text-white text-xs">
          {row.original.contactPerson}
        </span>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone & WhatsApp",
      cell: ({ row }) => {
        const cleanPhone = row.original.phoneNumber.replace(/[^\d+]/g, "");
        const formattedWaPhone = cleanPhone.startsWith("+")
          ? cleanPhone.replace("+", "")
          : cleanPhone.length === 10
            ? `91${cleanPhone}`
            : cleanPhone;

        const waText = encodeURIComponent(
          `Hello ${row.original.contactPerson}, thank you for your inquiry on DFMHUB regarding *${row.original.productTitle}*. How can we assist you with technical specs and quotation?`
        );

        return (
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-200">
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
              <a href={`tel:${row.original.phoneNumber}`} className="hover:text-amber-700">
                {row.original.phoneNumber}
              </a>
            </div>
            <a
              href={`https://wa.me/${formattedWaPhone}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              <MessageCircle className="w-3 h-3 text-emerald-500" />
              <span>WhatsApp Customer</span>
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium text-xs">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <a href={`mailto:${row.original.email}`} className="hover:underline">
            {row.original.email}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: "Details / Notes",
      cell: ({ row }) => (
        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium max-w-[200px] truncate block" title={row.original.message || ""}>
          {row.original.message || "No additional requirements specified"}
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
          { value: "CLOSED", label: "CLOSED", badgeClass: "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-400" },
          { value: "REJECTED", label: "REJECTED", badgeClass: "bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border-rose-400" },
        ];

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
