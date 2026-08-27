"use client";

import React from "react";
import {
  flexRender,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function TablePaginationBar({ table }: { table: ReactTableInstance<any> }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount() || 1;

  // Calculate visible page range for pagination links
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(0, pageIndex - Math.floor(maxVisible / 2));
    const end = Math.min(pageCount, start + maxVisible);

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }

    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3.5 bg-slate-50/80 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800/80 text-xs">
      {/* Rows Per Page Selector */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-slate-500 dark:text-slate-400 font-medium">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 font-semibold text-slate-800 dark:text-slate-200 focus:border-amber-500 outline-none cursor-pointer"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Official Shadcn UI Pagination */}
      <Pagination className="justify-center sm:justify-end w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>

          {getPageNumbers().map((pIndex) => (
            <PaginationItem key={pIndex}>
              <PaginationLink
                isActive={pIndex === pageIndex}
                onClick={() => table.setPageIndex(pIndex)}
              >
                {pIndex + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

interface DataTableProps {
  table: ReactTableInstance<any>;
  isLoading?: boolean;
  loadingText?: string;
  emptyText?: string;
}

export function DataTable({
  table,
  isLoading = false,
  loadingText = "Loading data...",
  emptyText = "No records found.",
}: DataTableProps) {
  const columnCount = table.getAllColumns().length || 1;

  return (
    <Card className="p-0 overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 rounded-2xl relative z-10">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/80"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 py-3.5"
                  >
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="h-44 text-center py-12 text-slate-600 dark:text-slate-400 font-semibold text-xs"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                    <span>{loadingText}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="h-44 text-center py-12 text-slate-600 dark:text-slate-400 font-semibold text-xs"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-xs font-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Embedded Table Pagination Bar */}
      <TablePaginationBar table={table} />
    </Card>
  );
}
