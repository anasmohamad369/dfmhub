"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  CornerDownLeft,
  List,
  Pilcrow,
  RemoveFormatting,
  Eye,
  Edit3,
  Sun,
  Moon,
  Info,
} from "lucide-react";
import { RichDescription } from "../product/RichDescription";

interface RichDescriptionEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

export function RichDescriptionEditor({
  value = "",
  onChange,
  disabled = false,
  placeholder = "Write a compelling description for this product...",
  rows = 5,
}: RichDescriptionEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert or wrap tags around current selection in textarea
  const wrapSelection = useCallback(
    (openTag: string, closeTag: string, defaultPlaceholder = "text") => {
      if (disabled || !onChange) return;
      const el = textareaRef.current;
      if (!el) return;

      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const text = el.value || "";

      const selected = text.slice(start, end);
      const contentToWrap = selected || defaultPlaceholder;
      const replacement = `${openTag}${contentToWrap}${closeTag}`;

      const newText = text.slice(0, start) + replacement + text.slice(end);
      onChange(newText);

      // Restore focus and selection
      requestAnimationFrame(() => {
        el.focus();
        if (selected) {
          el.setSelectionRange(start, start + replacement.length);
        } else {
          // Select the default placeholder so user can easily overwrite it
          el.setSelectionRange(start + openTag.length, start + openTag.length + contentToWrap.length);
        }
      });
    },
    [disabled, onChange]
  );

  // Helper to insert standalone snippet (e.g. line break or bullet)
  const insertSnippet = useCallback(
    (snippet: string) => {
      if (disabled || !onChange) return;
      const el = textareaRef.current;
      if (!el) return;

      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const text = el.value || "";

      const newText = text.slice(0, start) + snippet + text.slice(end);
      onChange(newText);

      requestAnimationFrame(() => {
        el.focus();
        const nextPos = start + snippet.length;
        el.setSelectionRange(nextPos, nextPos);
      });
    },
    [disabled, onChange]
  );

  // Helper to clear formatting from selection
  const clearFormattingFromSelection = useCallback(() => {
    if (disabled || !onChange) return;
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const text = el.value || "";

    if (start === end) return;

    const selected = text.slice(start, end);
    const cleaned = selected.replace(/<\/?[^>]+(>|$)/g, "");

    const newText = text.slice(0, start) + cleaned + text.slice(end);
    onChange(newText);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + cleaned.length);
    });
  }, [disabled, onChange]);

  // Handle keyboard shortcuts (e.g. Cmd+B / Ctrl+B for bold)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      wrapSelection("<b>", "</b>", "bold text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      wrapSelection("<em>", "</em>", "italic text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
      e.preventDefault();
      wrapSelection("<u>", "</u>", "underlined text");
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all focus-within:border-amber-500/70 dark:focus-within:border-amber-400/70 focus-within:ring-2 focus-within:ring-amber-500/20">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            onClick={() => wrapSelection("<b>", "</b>", "bold text")}
            disabled={disabled || activeTab !== "edit"}
            title="Bold (Ctrl+B / Cmd+B)"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <Bold className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bold</span>
          </button>

          {/* Highlight */}
          <button
            type="button"
            onClick={() => wrapSelection("<mark>", "</mark>", "highlighted key detail")}
            disabled={disabled || activeTab !== "edit"}
            title="Highlight Text"
            className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/60 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Highlight</span>
          </button>

          {/* Line Break */}
          <button
            type="button"
            onClick={() => insertSnippet("<br/>\n")}
            disabled={disabled || activeTab !== "edit"}
            title="Insert Line Break (<br/>)"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <CornerDownLeft className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">Break Line</span>
            <span className="sm:hidden">&lt;br&gt;</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Paragraph */}
          <button
            type="button"
            onClick={() => insertSnippet("\n\n")}
            disabled={disabled || activeTab !== "edit"}
            title="Insert Paragraph Break"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <Pilcrow className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Paragraph</span>
          </button>

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => insertSnippet("\n• ")}
            disabled={disabled || activeTab !== "edit"}
            title="Insert Bullet Point"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Bullet</span>
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => wrapSelection("<em>", "</em>", "italic text")}
            disabled={disabled || activeTab !== "edit"}
            title="Italic (Ctrl+I)"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => wrapSelection("<u>", "</u>", "underlined text")}
            disabled={disabled || activeTab !== "edit"}
            title="Underline (Ctrl+U)"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={clearFormattingFromSelection}
            disabled={disabled || activeTab !== "edit"}
            title="Clear formatting tags from selected text"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-rose-500 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Mode Toggle: Write vs Preview */}
        <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === "edit"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === "preview"
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === "edit" ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={rows}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden font-normal leading-relaxed resize-y border-none"
          />

          {/* Quick Formatting helper chips */}
          <div className="px-3.5 pb-2.5 pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800/60">
            <span className="font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Info className="w-3 h-3" /> Quick Add:
            </span>
            <button
              type="button"
              onClick={() => insertSnippet("<mark>High Conductivity Copper</mark>")}
              className="px-2 py-0.5 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200/80 dark:hover:bg-amber-900/60 transition-colors cursor-pointer border border-amber-300/60 dark:border-amber-700/50 font-medium"
            >
              + Highlight Key Spec
            </button>
            <button
              type="button"
              onClick={() => insertSnippet("<b>IS 3043 / IEC 62305</b>")}
              className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 font-semibold"
            >
              + Bold Certification
            </button>
            <button
              type="button"
              onClick={() => insertSnippet("<br/>\n")}
              className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors cursor-pointer border border-sky-200 dark:border-sky-800 font-medium"
            >
              + Line Break &lt;br/&gt;
            </button>
            <button
              type="button"
              onClick={() => insertSnippet("\n• Low soil electrical resistance")}
              className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-800 font-medium"
            >
              + Bullet Point
            </button>
          </div>
        </div>
      ) : (
        /* Preview Tab */
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Frontend Live Display Preview
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md">
              <button
                type="button"
                onClick={() => setPreviewTheme("light")}
                className={`p-1 rounded cursor-pointer ${
                  previewTheme === "light"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Preview Light Theme"
              >
                <Sun className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewTheme("dark")}
                className={`p-1 rounded cursor-pointer ${
                  previewTheme === "dark"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500 hover:text-white"
                }`}
                title="Preview Dark Theme"
              >
                <Moon className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors ${
              previewTheme === "dark"
                ? "bg-slate-950 text-slate-100 border-slate-800 dark"
                : "bg-slate-50/70 text-slate-900 border-slate-200"
            }`}
          >
            {value.trim() ? (
              <RichDescription content={value} className="text-xs sm:text-sm" />
            ) : (
              <p className="text-xs italic text-slate-400">
                No description entered yet. Switch to the Write tab and type content.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer Info Bar */}
      <div className="px-3.5 py-1.5 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span className="hidden sm:inline">
          Tip: Highlight words with <code className="bg-amber-100 dark:bg-amber-950 px-1 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-[10px]">&lt;mark&gt;</code>, bold with <code className="font-mono text-[10px]">&lt;b&gt;</code>, or break lines with <code className="font-mono text-[10px]">&lt;br/&gt;</code>
        </span>
        <span className="sm:hidden text-[10px]">Formatted description</span>
        <div className="flex items-center gap-3 font-mono text-[10px] shrink-0">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>
    </div>
  );
}

export default RichDescriptionEditor;
