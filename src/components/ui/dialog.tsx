import * as React from "react";
import { X } from "lucide-react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/50 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`text-lg font-extrabold text-slate-900 dark:text-white tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function DialogDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={`text-xs text-slate-600 dark:text-slate-400 mt-1 ${className}`}>
      {children}
    </p>
  );
}

export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-140px)] ${className}`}>{children}</div>;
}

export function DialogFooter({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50 ${className}`}>
      {children}
    </div>
  );
}

export function DialogClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Close"
    >
      <X className="w-5 h-5" />
    </button>
  );
}
