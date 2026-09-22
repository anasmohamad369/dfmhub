"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  CornerDownLeft,
  List,
  Pilcrow,
  RemoveFormatting,
  RotateCcw,
  RotateCw,
  Eye,
  Edit3,
  Sun,
  Moon,
  Info,
  Maximize2,
  Minimize2,
  Link2,
  Unlink,
  Check,
  X,
} from "lucide-react";
import { RichDescription } from "../product/RichDescription";

export interface RichDescriptionEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  mode?: "product" | "blog" | "general";
  minHeight?: string;
}

// Helper to check if selection or cursor is inside or directly encompasses tags
function isTagActive(
  text: string,
  start: number,
  end: number,
  openTag: string,
  closeTag: string
): {
  active: boolean;
  openStart?: number;
  openEnd?: number;
  closeStart?: number;
  closeEnd?: number;
} {
  if (!text) return { active: false };

  // 1. Direct enclosing of tags: e.g. selected "<b>hello</b>"
  const selected = text.slice(start, end);
  if (
    selected.toLowerCase().startsWith(openTag.toLowerCase()) &&
    selected.toLowerCase().endsWith(closeTag.toLowerCase())
  ) {
    return {
      active: true,
      openStart: start,
      openEnd: start + openTag.length,
      closeStart: end - closeTag.length,
      closeEnd: end,
    };
  }

  // 2. Selection/cursor inside tags: text before has unclosed openTag, text after has closeTag
  const before = text.slice(0, start);
  const after = text.slice(end);

  const lastOpenIndex = before.toLowerCase().lastIndexOf(openTag.toLowerCase());
  if (lastOpenIndex !== -1) {
    const interveningClose = before.toLowerCase().indexOf(closeTag.toLowerCase(), lastOpenIndex);
    if (interveningClose === -1) {
      const nextClose = after.toLowerCase().indexOf(closeTag.toLowerCase());
      const nextOpen = after.toLowerCase().indexOf(openTag.toLowerCase());
      if (nextClose !== -1 && (nextOpen === -1 || nextClose < nextOpen)) {
        return {
          active: true,
          openStart: lastOpenIndex,
          openEnd: lastOpenIndex + openTag.length,
          closeStart: end + nextClose,
          closeEnd: end + nextClose + closeTag.length,
        };
      }
    }
  }

  return { active: false };
}

// Helper to check if cursor or selection is inside or around an <a> tag
function isLinkTagActive(
  text: string,
  start: number,
  end: number
): {
  active: boolean;
  href?: string;
  linkText?: string;
  openStart?: number;
  closeEnd?: number;
} {
  if (!text) return { active: false };

  // Check if selection or cursor is inside <a ...>...</a>
  const before = text.slice(0, start);
  const after = text.slice(end);

  const lastOpenIndex = before.toLowerCase().lastIndexOf("<a ");
  if (lastOpenIndex !== -1) {
    const interveningClose = before.toLowerCase().indexOf("</a>", lastOpenIndex);
    if (interveningClose === -1) {
      const nextClose = after.toLowerCase().indexOf("</a>");
      if (nextClose !== -1) {
        const fullLinkStr = text.slice(lastOpenIndex, end + nextClose + 4);
        const match = fullLinkStr.match(/^<a\s+[^>]*href\s*=\s*(['"])([\s\S]*?)\1[^>]*>([\s\S]*?)<\/a>$/i);
        if (match) {
          return {
            active: true,
            href: match[2],
            linkText: match[3],
            openStart: lastOpenIndex,
            closeEnd: end + nextClose + 4,
          };
        }
      }
    }
  }

  // Check if selection directly encloses <a ...>...</a>
  const selected = text.slice(start, end);
  const directMatch = selected.match(/^<a\s+[^>]*href\s*=\s*(['"])([\s\S]*?)\1[^>]*>([\s\S]*?)<\/a>$/i);
  if (directMatch) {
    return {
      active: true,
      href: directMatch[2],
      linkText: directMatch[3],
      openStart: start,
      closeEnd: end,
    };
  }

  return { active: false };
}

export function RichDescriptionEditor({
  value = "",
  onChange,
  disabled = false,
  placeholder = "Write a compelling description...",
  rows = 6,
  mode = "product",
}: RichDescriptionEditorProps) {
  // Tabs: only clean Write vs Preview
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active state for formatting buttons (highlighted when active)
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    highlight: false,
    link: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Hyperlink insertion state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkIsEditing, setLinkIsEditing] = useState(false);
  const [linkTargetRange, setLinkTargetRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const linkUrlInputRef = useRef<HTMLInputElement>(null);
  const linkTextInputRef = useRef<HTMLInputElement>(null);

  // Undo / Redo History Stack
  const historyRef = useRef<string[]>([value || ""]);
  const historyIndexRef = useRef<number>(0);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update undo/redo availability
  const updateUndoRedoState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Push new state into history stack
  const pushToHistory = useCallback(
    (newVal: string) => {
      if (historyRef.current[historyIndexRef.current] === newVal) return;
      // Truncate any future redo history
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      newHistory.push(newVal);
      // Keep max 50 history steps to conserve memory
      if (newHistory.length > 50) newHistory.shift();
      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;
      updateUndoRedoState();
    },
    [updateUndoRedoState]
  );

  // Undo action
  const handleUndo = useCallback(() => {
    if (disabled || !onChange || historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    const prevVal = historyRef.current[historyIndexRef.current];
    onChange(prevVal);
    updateUndoRedoState();
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      checkActiveFormatting();
    });
  }, [disabled, onChange, updateUndoRedoState]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (
      disabled ||
      !onChange ||
      historyIndexRef.current >= historyRef.current.length - 1
    )
      return;
    historyIndexRef.current += 1;
    const nextVal = historyRef.current[historyIndexRef.current];
    onChange(nextVal);
    updateUndoRedoState();
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      checkActiveFormatting();
    });
  }, [disabled, onChange, updateUndoRedoState]);

  // Check which formatting tags are active at current selection
  const checkActiveFormatting = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const text = el.value || "";

    const boldInfo = isTagActive(text, start, end, "<b>", "</b>");
    const italicInfo = isTagActive(text, start, end, "<em>", "</em>");
    const underlineInfo = isTagActive(text, start, end, "<u>", "</u>");
    const highlightInfo = isTagActive(text, start, end, "<mark>", "</mark>");
    const linkInfo = isLinkTagActive(text, start, end);

    setActiveStyles({
      bold: boldInfo.active,
      italic: italicInfo.active,
      underline: underlineInfo.active,
      highlight: highlightInfo.active,
      link: linkInfo.active,
    });
  }, []);

  // Open Hyperlink Dialog / Bar
  const openLinkModal = useCallback(() => {
    if (disabled || activeTab !== "edit") return;
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const text = el.value || "";

    const linkInfo = isLinkTagActive(text, start, end);
    if (linkInfo.active && linkInfo.openStart !== undefined && linkInfo.closeEnd !== undefined) {
      setLinkIsEditing(true);
      setLinkUrl(linkInfo.href || "");
      setLinkText(linkInfo.linkText || "");
      setLinkTargetRange({ start: linkInfo.openStart, end: linkInfo.closeEnd });
    } else {
      const selected = text.slice(start, end);
      setLinkIsEditing(false);
      setLinkText(selected);
      setLinkUrl("");
      setLinkTargetRange({ start, end });
    }

    setIsLinkModalOpen(true);
    requestAnimationFrame(() => {
      if (text.slice(start, end)) {
        linkUrlInputRef.current?.focus();
      } else {
        linkTextInputRef.current?.focus();
      }
    });
  }, [disabled, activeTab]);

  // Save / Apply Hyperlink
  const handleSaveLink = useCallback(() => {
    if (!onChange) return;
    const el = textareaRef.current;
    if (!el) return;

    const rawUrl = linkUrl.trim();
    if (!rawUrl) {
      setIsLinkModalOpen(false);
      return;
    }

    // Auto-prefix https:// if missing protocol and not relative/anchor
    let cleanUrl = rawUrl;
    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const displayText = linkText.trim() || cleanUrl;
    const linkHtml = `<a href="${cleanUrl}">${displayText}</a>`;

    const text = el.value || "";
    const { start, end } = linkTargetRange;
    const newText = text.slice(0, start) + linkHtml + text.slice(end);

    onChange(newText);
    pushToHistory(newText);
    setIsLinkModalOpen(false);

    requestAnimationFrame(() => {
      el.focus();
      const newPos = start + linkHtml.length;
      el.setSelectionRange(start, newPos);
      checkActiveFormatting();
    });
  }, [linkUrl, linkText, linkTargetRange, onChange, pushToHistory, checkActiveFormatting]);

  // Remove Hyperlink (keep display text)
  const handleRemoveLink = useCallback(() => {
    if (!onChange) return;
    const el = textareaRef.current;
    if (!el) return;

    const text = el.value || "";
    const { start, end } = linkTargetRange;
    const replacement = linkText || "";
    const newText = text.slice(0, start) + replacement + text.slice(end);

    onChange(newText);
    pushToHistory(newText);
    setIsLinkModalOpen(false);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + replacement.length);
      checkActiveFormatting();
    });
  }, [linkText, linkTargetRange, onChange, pushToHistory, checkActiveFormatting]);

  // Handle ESC key for Link Modal and Fullscreen
  useEffect(() => {
    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLinkModalOpen) {
          setIsLinkModalOpen(false);
          textareaRef.current?.focus();
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [isFullscreen, isLinkModalOpen]);

  // Toggle formatting tag: if active, unwrap it; if inactive, wrap selection
  const toggleFormattingTag = useCallback(
    (openTag: string, closeTag: string, defaultPlaceholder = "text") => {
      if (disabled || !onChange) return;
      const el = textareaRef.current;
      if (!el) return;

      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const text = el.value || "";

      const tagInfo = isTagActive(text, start, end, openTag, closeTag);

      let newText = "";
      let newSelectionStart = start;
      let newSelectionEnd = end;

      if (tagInfo.active && tagInfo.openStart !== undefined && tagInfo.closeEnd !== undefined) {
        // UNWRAP: Remove existing open and close tags
        const beforeOpen = text.slice(0, tagInfo.openStart);
        const innerContent = text.slice(tagInfo.openEnd, tagInfo.closeStart);
        const afterClose = text.slice(tagInfo.closeEnd);

        newText = beforeOpen + innerContent + afterClose;

        // Position selection around the un-tagged inner content
        newSelectionStart = tagInfo.openStart;
        newSelectionEnd = tagInfo.openStart + innerContent.length;
      } else {
        // WRAP: Add open and close tags around selected text (or placeholder)
        const selected = text.slice(start, end);
        const contentToWrap = selected || defaultPlaceholder;
        const replacement = `${openTag}${contentToWrap}${closeTag}`;

        newText = text.slice(0, start) + replacement + text.slice(end);

        if (selected) {
          newSelectionStart = start;
          newSelectionEnd = start + replacement.length;
        } else {
          newSelectionStart = start + openTag.length;
          newSelectionEnd = start + openTag.length + contentToWrap.length;
        }
      }

      onChange(newText);
      pushToHistory(newText);

      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(newSelectionStart, newSelectionEnd);
        checkActiveFormatting();
      });
    },
    [disabled, onChange, pushToHistory, checkActiveFormatting]
  );

  // Insert standalone snippet (e.g. line break or bullet)
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
      pushToHistory(newText);

      requestAnimationFrame(() => {
        el.focus();
        const nextPos = start + snippet.length;
        el.setSelectionRange(nextPos, nextPos);
        checkActiveFormatting();
      });
    },
    [disabled, onChange, pushToHistory, checkActiveFormatting]
  );

  // Clear formatting from selection
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
    pushToHistory(newText);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + cleaned.length);
      checkActiveFormatting();
    });
  }, [disabled, onChange, pushToHistory, checkActiveFormatting]);

  // Handle typing inside textarea (100% native & rock-solid)
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange?.(val);

    // Debounce history push while typing
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      pushToHistory(val);
    }, 400);

    checkActiveFormatting();
  };

  // Keyboard Shortcuts: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z, Ctrl+Y
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      const key = e.key.toLowerCase();
      if (key === "b") {
        e.preventDefault();
        toggleFormattingTag("<b>", "</b>", "bold text");
      } else if (key === "i") {
        e.preventDefault();
        toggleFormattingTag("<em>", "</em>", "italic text");
      } else if (key === "u") {
        e.preventDefault();
        toggleFormattingTag("<u>", "</u>", "underlined text");
      } else if (key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (key === "y") {
        e.preventDefault();
        handleRedo();
      } else if (key === "k") {
        e.preventDefault();
        openLinkModal();
      }
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div
      className={`w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-all flex flex-col ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 overflow-hidden"
          : "focus-within:border-amber-500/70 dark:focus-within:border-amber-400/70 focus-within:ring-2 focus-within:ring-amber-500/20"
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 shrink-0">
        
        {/* Left: Clean Formatting Controls */}
        <div className="flex flex-wrap items-center gap-1">
          
          {/* Bold Button (Highlighted if bold is active) */}
          <button
            type="button"
            onClick={() => toggleFormattingTag("<b>", "</b>", "bold text")}
            disabled={disabled || activeTab !== "edit"}
            title="Bold (Ctrl+B / Cmd+B) - Click again to unbold"
            className={`p-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer border ${
              activeStyles.bold
                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 shadow-xs ring-1 ring-amber-400/50"
                : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
            } disabled:opacity-40`}
          >
            <Bold className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Bold</span>
          </button>

          {/* Highlight Marker Button (Highlighted if mark is active) */}
          <button
            type="button"
            onClick={() => toggleFormattingTag("<mark>", "</mark>", "highlighted key detail")}
            disabled={disabled || activeTab !== "edit"}
            title="Highlight text - Click again to remove highlight"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
              activeStyles.highlight
                ? "bg-amber-300 dark:bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs ring-1 ring-amber-500/50"
                : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/60"
            } disabled:opacity-40`}
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Highlight</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Hyperlink Button */}
          <button
            type="button"
            onClick={openLinkModal}
            disabled={disabled || activeTab !== "edit"}
            title="Insert or Edit Hyperlink (Ctrl+K / Cmd+K)"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
              activeStyles.link || isLinkModalOpen
                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 shadow-xs ring-1 ring-amber-400/50"
                : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400"
            } disabled:opacity-40`}
          >
            <Link2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Link</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

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

          {/* Paragraph Break */}
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

          {/* Italic Button (Highlighted if italic is active) */}
          <button
            type="button"
            onClick={() => toggleFormattingTag("<em>", "</em>", "italic text")}
            disabled={disabled || activeTab !== "edit"}
            title="Italic (Ctrl+I / Cmd+I)"
            className={`p-1.5 rounded-lg transition-all cursor-pointer border ${
              activeStyles.italic
                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 shadow-xs"
                : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            } disabled:opacity-40`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          {/* Underline Button (Highlighted if underline is active) */}
          <button
            type="button"
            onClick={() => toggleFormattingTag("<u>", "</u>", "underlined text")}
            disabled={disabled || activeTab !== "edit"}
            title="Underline (Ctrl+U / Cmd+U)"
            className={`p-1.5 rounded-lg transition-all cursor-pointer border ${
              activeStyles.underline
                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 shadow-xs"
                : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            } disabled:opacity-40`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

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

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Undo Button */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={disabled || activeTab !== "edit" || !canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Undo</span>
          </button>

          {/* Redo Button */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={disabled || activeTab !== "edit" || !canRedo}
            title="Redo (Ctrl+Y / Cmd+Y)"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Redo</span>
          </button>
        </div>

        {/* Right: Write vs Preview & Fullscreen */}
        <div className="flex items-center gap-1.5">
          {/* View Mode Toggle: Write vs Preview */}
          <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
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
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "preview"
                  ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Inline Hyperlink Editor Bar */}
      {isLinkModalOpen && activeTab === "edit" && (
        <div className="px-3.5 py-2.5 bg-amber-50/95 dark:bg-slate-800/95 border-b border-amber-200/80 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs animate-in fade-in duration-150 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100 shrink-0">
            <Link2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{linkIsEditing ? "Edit Link:" : "Insert Link:"}</span>
          </div>

          <div className="flex-1 min-w-[150px]">
            <input
              ref={linkTextInputRef}
              type="text"
              placeholder="Display text (e.g. DFMHUB Catalog)..."
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveLink();
                if (e.key === "Escape") setIsLinkModalOpen(false);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <input
              ref={linkUrlInputRef}
              type="text"
              placeholder="URL (e.g. https://www.dfmhub.com or /contact-us)..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveLink();
                if (e.key === "Escape") setIsLinkModalOpen(false);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleSaveLink}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{linkIsEditing ? "Update" : "Add Link"}</span>
            </button>

            {linkIsEditing && (
              <button
                type="button"
                onClick={handleRemoveLink}
                title="Remove link and keep text"
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Unlink className="w-3.5 h-3.5" />
                <span>Unlink</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsLinkModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Cancel (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      {activeTab === "edit" ? (
        <div className={`relative flex-1 flex flex-col ${isFullscreen ? "min-h-0" : ""}`}>
          <textarea
            ref={textareaRef}
            rows={isFullscreen ? 25 : rows}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={handleTextareaChange}
            onSelect={checkActiveFormatting}
            onKeyUp={checkActiveFormatting}
            onClick={checkActiveFormatting}
            onKeyDown={handleKeyDown}
            className="w-full flex-1 p-4 text-sm text-slate-800 dark:text-slate-100 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden font-normal leading-relaxed resize-y border-none"
          />

          {/* Quick Add Helper Chips */}
          <div className="px-3.5 pb-2.5 pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
            <span className="font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Info className="w-3 h-3" /> Quick Add:
            </span>

            {mode === "blog" ? (
              <>
                <button
                  type="button"
                  onClick={() => insertSnippet("<mark>Key Insight</mark>")}
                  className="px-2 py-0.5 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200/80 dark:hover:bg-amber-900/60 transition-colors cursor-pointer border border-amber-300/60 dark:border-amber-700/50 font-medium"
                >
                  + Highlight Insight
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n<b>Key Takeaway:</b> ")}
                  className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  + Key Takeaway
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
                  onClick={() => insertSnippet("\n• Pro Tip: ")}
                  className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-800 font-medium"
                >
                  + Pro Tip Bullet
                </button>
                <button
                  type="button"
                  onClick={openLinkModal}
                  className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer border border-amber-200 dark:border-amber-800 font-medium flex items-center gap-1"
                >
                  <Link2 className="w-2.5 h-2.5" />
                  <span>+ Link</span>
                </button>
              </>
            ) : (
              <>
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
                <button
                  type="button"
                  onClick={openLinkModal}
                  className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer border border-amber-200 dark:border-amber-800 font-medium flex items-center gap-1"
                >
                  <Link2 className="w-2.5 h-2.5" />
                  <span>+ Link</span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Preview Tab */
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
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
      <div className="px-3.5 py-1.5 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <span className="hidden sm:inline">
          Tip: Select text and click <code className="bg-amber-100 dark:bg-amber-950 px-1 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-[10px]">Bold</code> or <code className="bg-amber-100 dark:bg-amber-950 px-1 py-0.5 rounded text-amber-800 dark:text-amber-300 font-mono text-[10px]">Highlight</code>. Click again to remove.
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
