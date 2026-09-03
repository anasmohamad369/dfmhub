"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Globe,
  PlusCircle,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  ExternalLink,
  RefreshCw,
  Sliders,
  FileText,
  Tag,
  Shield,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ImageUploader from "@/components/ImageUploader";

interface SeoRecord {
  id?: string;
  path: string;
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: any;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_PRESET_PAGES = [
  { path: "/", name: "Home Page", defaultTitle: "ARK Make Lightning Protection & Earthing Systems | DFMHUB" },
  { path: "/about-us", name: "About Us", defaultTitle: "About Us | DFMHUB Premier Earthing & Protection" },
  { path: "/contact-us", name: "Contact Us", defaultTitle: "Contact Us | DFMHUB Customer Support & Sales" },
  { path: "/lightning-protection-system", name: "Lightning Protection", defaultTitle: "Lightning Protection Systems | DFMHUB" },
  { path: "/structural-earthing", name: "Structural Earthing", defaultTitle: "Structural Earthing Systems | DFMHUB" },
  { path: "/installation-services", name: "Installation Services", defaultTitle: "Professional Installation Services | DFMHUB" },
  { path: "/product", name: "Products Catalog", defaultTitle: "Products & Components Catalog | DFMHUB" },
  { path: "/blog", name: "Engineering Blog", defaultTitle: "Earthing & Protection Blog | DFMHUB" },
];

export default function SeoManagerClient() {
  const [seoRecords, setSeoRecords] = useState<SeoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState<string>("/");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  // Form State
  const [formData, setFormData] = useState<SeoRecord>({
    path: "/",
    title: "ARK Make Lightning Protection & Earthing Systems | DFMHUB",
    description: "DFMHUB is India's premier manufacturer of ARK Make Lightning Protection and Structural Earthing Systems in Bengaluru.",
    keywords: "Lightning Protection, Structural Earthing, Earth Rods, DFMHUB",
    ogTitle: "",
    ogDescription: "",
    ogImage: "/images/lps-hero.png",
    canonicalUrl: "https://www.dfmhub.com",
    noIndex: false,
  });

  useEffect(() => {
    fetchSeoRecords();
  }, []);

  const fetchSeoRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        setSeoRecords(data);
        // Load initial selection if available
        const matched = data.find((r: SeoRecord) => r.path === "/");
        if (matched) {
          setFormData(matched);
        }
      }
    } catch (err) {
      console.error("Error fetching SEO records:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPage = (path: string) => {
    setSelectedPath(path);
    const existing = seoRecords.find((r) => r.path === path);
    if (existing) {
      setFormData(existing);
    } else {
      const preset = DEFAULT_PRESET_PAGES.find((p) => p.path === path);
      setFormData({
        path: path,
        title: preset ? preset.defaultTitle : "DFMHUB | Engineering & Earthing",
        description: "",
        keywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        canonicalUrl: `https://www.dfmhub.com${path === "/" ? "" : path}`,
        noIndex: false,
      });
    }
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.path || !formData.title) {
      setMessage({ text: "Path and Title are required fields.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save SEO metadata");
      }

      const savedData = await res.json();
      setMessage({ text: `SEO metadata for "${formData.path}" saved successfully!`, type: "success" });
      
      // Update local state list
      setSeoRecords((prev) => {
        const idx = prev.findIndex((r) => r.path === savedData.path);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = savedData;
          return updated;
        }
        return [savedData, ...prev];
      });
      setFormData(savedData);
    } catch (err: any) {
      setMessage({ text: err.message || "Save failed", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      setMessage({ text: "No custom DB override exists to delete for this page.", type: "error" });
      return;
    }

    if (!confirm(`Are you sure you want to remove custom SEO override for "${formData.path}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/seo/${formData.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSeoRecords((prev) => prev.filter((r) => r.id !== formData.id));
        setMessage({ text: `SEO record for "${formData.path}" removed. Reverted to default metadata.`, type: "success" });
        handleSelectPage(formData.path);
      }
    } catch (err: any) {
      setMessage({ text: "Delete failed.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  const filteredPresets = DEFAULT_PRESET_PAGES.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const titleLength = formData.title.length;
  const descLength = (formData.description || "").length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 rounded-3xl border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search Engine Optimization</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dynamic SEO & Page Title Manager
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Configure dynamic page meta titles, meta descriptions, keywords, and OpenGraph tags for every route in real-time.
          </p>
        </div>
        <Button
          onClick={() => handleSelectPage("/custom-" + Date.now())}
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-2xl gap-2 px-5 py-6 shadow-md cursor-pointer shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Custom Route SEO</span>
        </Button>
      </div>

      {/* Main Grid: Sidebar List + Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Page Selector & Saved Routes */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-20">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-500" />
                  Site Pages & Routes
                </span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  {seoRecords.length} configured
                </span>
              </CardTitle>
              <CardDescription className="text-xs">
                Select a page route below to manage its dynamic title & meta tags.
              </CardDescription>

              <div className="relative mt-2">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Filter routes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs h-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-4 max-h-[520px] overflow-y-auto space-y-1.5">
              {filteredPresets.map((preset) => {
                const hasDbRecord = seoRecords.some((r) => r.path === preset.path);
                const isSelected = selectedPath === preset.path;
                return (
                  <button
                    key={preset.path}
                    onClick={() => handleSelectPage(preset.path)}
                    type="button"
                    className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-200 font-semibold shadow-xs"
                        : "bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{preset.name}</span>
                        {hasDbRecord && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Custom DB metadata set" />
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                        {preset.path}
                      </div>
                    </div>
                    {hasDbRecord ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 shrink-0">
                        Custom
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                        Default
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Custom Non-preset records in DB */}
              {(() => {
                const customRecords = seoRecords
                  .filter((r) => !DEFAULT_PRESET_PAGES.some((p) => p.path === r.path))
                  .filter(
                    (r) =>
                      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.path.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                if (customRecords.length === 0) return null;
                return (
                  <>
                    <div className="pt-3 pb-1 px-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <PlusCircle className="w-3 h-3" />
                        <span>Custom Routes ({customRecords.length})</span>
                      </div>
                    </div>
                    {customRecords.map((record) => {
                      const isSelected = selectedPath === record.path;
                      return (
                        <button
                          key={record.path}
                          onClick={() => handleSelectPage(record.path)}
                          type="button"
                          className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                            isSelected
                              ? "bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-200 font-semibold shadow-xs"
                              : "bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          <div className="space-y-0.5 truncate pr-2">
                            <div className="font-semibold flex items-center gap-1.5">
                              <span>{record.title}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                              {record.path}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                            Custom Path
                          </span>
                        </button>
                      );
                    })}
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dynamic Form & Live Google SERP Preview */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 border transition-all ${
                message.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Live SERP Google Search Preview */}
          <Card className="border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent dark:bg-slate-900 rounded-3xl shadow-sm overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Eye className="w-4 h-4" />
                  Live Google Search Snippet Preview
                </CardTitle>
                <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                  Real-time preview of how this page appears in Google search engine results.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    previewMode === "desktop"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                    previewMode === "mobile"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-5">
              <div
                className={`bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all ${
                  previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
                }`}
              >
                <div className="flex items-center gap-2 text-[12px] text-slate-600 dark:text-slate-400 mb-1 font-sans">
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-[9px]">
                    D
                  </div>
                  <span className="truncate">DFMHUB • {formData.canonicalUrl || `https://www.dfmhub.com${formData.path}`}</span>
                </div>
                <h3 className="text-lg text-[#1a0dab] dark:text-[#8ab4f8] hover:underline font-normal tracking-tight cursor-pointer line-clamp-1 leading-snug">
                  {formData.title || "Page Title Will Appear Here"}
                </h3>
                <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed font-sans">
                  {formData.description ||
                    "Enter a compelling meta description to improve click-through rates on search engine result pages."}
                </p>

                {formData.ogImage && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Social Media Card Preview (OpenGraph Banner)
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                      <div className="relative aspect-[1200/630] max-h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                        <img
                          src={formData.ogImage}
                          alt={formData.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="p-3 bg-slate-100/70 dark:bg-slate-850">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                          www.dfmhub.com
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                          {formData.ogTitle || formData.title}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {formData.ogDescription || formData.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form Editor Card */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-500" />
                <span>SEO Metadata Configuration</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Editing SEO settings for route:{" "}
                <code className="text-amber-600 dark:text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
                  {formData.path}
                </code>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSave} className="space-y-6">
                {/* Route Path */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-500" />
                    <span>Page Route Path</span>
                  </label>
                  <Input
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    placeholder="e.g. /about-us or /product/earth-rod"
                    className="h-10 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                    required
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    The relative URL path matching your Next.js route (e.g., <code>/</code>, <code>/contact-us</code>).
                  </p>
                </div>

                {/* Page Meta Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>Meta Page Title (Dynamic Title)</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                        titleLength >= 50 && titleLength <= 60
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : titleLength > 60
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {titleLength} / 60 chars (Optimal: 50-60)
                    </span>
                  </div>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. ARK Make Lightning Protection & Earthing Systems | DFMHUB"
                    className="h-10 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl font-medium"
                    required
                  />
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>Meta Description</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                        descLength >= 140 && descLength <= 160
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : descLength > 160
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {descLength} / 160 chars (Optimal: 140-160)
                    </span>
                  </div>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Write a clear, engaging summary of this page for search engines..."
                    className="min-h-[90px] text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed"
                  />
                </div>

                {/* Meta Keywords */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Meta Keywords (Comma Separated)</span>
                  </label>
                  <Input
                    value={formData.keywords || ""}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="Lightning Protection, Structural Earthing, DFMHUB, Bengaluru"
                    className="h-10 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                {/* Grid: OpenGraph & Canonical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      OpenGraph Title (Social Sharing)
                    </label>
                    <Input
                      value={formData.ogTitle || ""}
                      onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                      placeholder="Defaults to Meta Title if blank"
                      className="h-9 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Canonical URL
                    </label>
                    <Input
                      value={formData.canonicalUrl || ""}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://www.dfmhub.com/your-page"
                      className="h-9 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                    />
                  </div>
                </div>

                {/* OG Image Uploader / Input */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>OpenGraph Social Banner Image (OG Image)</span>
                    {formData.ogImage && (
                      <a
                        href={formData.ogImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Preview Image
                      </a>
                    )}
                  </label>
                  <div className="space-y-3">
                    <Input
                      value={formData.ogImage || ""}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="e.g. /images/lps-hero.png or full image URL"
                      className="h-9 text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl font-mono"
                    />
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <ImageUploader
                        label="Upload OG Banner Image"
                        value={formData.ogImage || ""}
                        onChange={(url) => setFormData({ ...formData, ogImage: url })}
                      />
                    </div>
                  </div>
                </div>

                {/* Indexing Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-500" />
                      Search Engine Indexing
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Enable <strong>NoIndex</strong> if you want search engines to hide this page from search results.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {formData.noIndex ? "NoIndex (Hidden)" : "Index (Visible)"}
                    </span>
                    <Switch
                      checked={formData.noIndex || false}
                      onCheckedChange={(checked: boolean) => setFormData({ ...formData, noIndex: checked })}
                    />
                  </div>
                </div>


                {/* Form Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  {formData.id ? (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="h-10 text-xs rounded-xl font-semibold gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{deleting ? "Deleting..." : "Delete DB Override"}</span>
                    </Button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSelectPage(formData.path)}
                      className="h-10 text-xs rounded-xl font-semibold border-slate-200 dark:border-slate-800 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset Form
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving}
                      className="h-10 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-6 rounded-xl shadow-md gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? "Saving Changes..." : "Save SEO Metadata"}</span>
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
