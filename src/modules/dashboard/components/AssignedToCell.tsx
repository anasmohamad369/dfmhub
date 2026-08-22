"use client";

import React, { useState, useEffect } from "react";

interface AssignedToCellProps {
  id: string;
  initialAssignedTo?: string;
  onSave: (id: string, val: string) => Promise<void>;
}

export function AssignedToCell({ id, initialAssignedTo, onSave }: AssignedToCellProps) {
  const [value, setValue] = useState(initialAssignedTo || "");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValue(initialAssignedTo || "");
  }, [initialAssignedTo]);

  const isChanged = value.trim() !== (initialAssignedTo || "").trim();

  const handleSave = async () => {
    setSaving(true);
    await onSave(id, value);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        placeholder="Unassigned"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:border-amber-500 outline-none w-28"
      />
      {(isChanged || saved || saving) && (
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-2.5 py-1.5 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer shrink-0 shadow-xs ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-slate-950"
          }`}
        >
          {saving ? "..." : saved ? "Saved!" : "Save"}
        </button>
      )}
    </div>
  );
}
