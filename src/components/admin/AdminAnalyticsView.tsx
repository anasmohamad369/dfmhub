"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  TrendingUp,
  Users,
  ShoppingBag,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  ExternalLink,
  Clock,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PageMetric {
  path: string;
  title: string;
  views: number;
  percentage: number;
}

interface ActivityItem {
  id: string;
  path: string;
  title: string;
  device: string;
  createdAt: string;
  referrer: string;
}

interface AnalyticsData {
  summary: {
    totalViews: number;
    totalInquiries: number;
    totalRegistrations: number;
    timeframe: string;
  };
  pageBreakdown: PageMetric[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  referrers: { source: string; count: number }[];
  recentActivity: ActivityItem[];
}

export default function AdminAnalyticsView() {
  const [timeframe, setTimeframe] = useState<"all" | "today" | "7d" | "30d">("all");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?timeframe=${timeframe}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalDeviceCount =
    (data?.deviceStats.desktop || 0) +
    (data?.deviceStats.mobile || 0) +
    (data?.deviceStats.tablet || 0);

  const desktopPct = totalDeviceCount > 0 ? Math.round(((data?.deviceStats.desktop || 0) / totalDeviceCount) * 100) : 0;
  const mobilePct = totalDeviceCount > 0 ? Math.round(((data?.deviceStats.mobile || 0) / totalDeviceCount) * 100) : 0;
  const tabletPct = totalDeviceCount > 0 ? Math.round(((data?.deviceStats.tablet || 0) / totalDeviceCount) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner & Timeframe Selector */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-6 rounded-3xl border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Real-time Traffic & Visitor Analytics</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Website Views & Page Performance
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track live visitor counts, page breakdowns, traffic sources, and conversion metrics across your site.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {(["all", "today", "7d", "30d"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                timeframe === t
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {t === "all" ? "All Time" : t === "today" ? "Today" : t === "7d" ? "7 Days" : "30 Days"}
            </button>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2 h-8 w-8 min-w-0 text-slate-500 hover:text-amber-600 cursor-pointer"
            title="Refresh Analytics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Views */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Page Views</span>
            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? "..." : (data?.summary.totalViews || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{timeframe === "all" ? "Total accumulated views" : `Recorded in selected filter (${timeframe})`}</span>
            </div>
          </div>
        </Card>

        {/* Stat 2: Active Pages */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tracked Page Routes</span>
            <div className="p-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? "..." : (data?.pageBreakdown.length || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mt-1">
              Active routes with traffic
            </div>
          </div>
        </Card>

        {/* Stat 3: Product Inquiries */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product Inquiries</span>
            <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? "..." : (data?.summary.totalInquiries || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
              Direct B2B product quotes
            </div>
          </div>
        </Card>

        {/* Stat 4: Registrations */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">General Registrations</span>
            <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {loading ? "..." : (data?.summary.totalRegistrations || 0).toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-purple-600 dark:text-purple-400 mt-1">
              Project risk calculations & leads
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Page Breakdown Table + Right Column Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Page Breakdown Table */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  Top Viewed Pages Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Detailed view count breakdown per URL path across your website.
                </p>
              </div>
              <span className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono px-3 py-1 rounded-full border border-amber-500/30">
                Sorted by highest views
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Page Route Path</th>
                    <th className="py-3 px-5">Title / Context</th>
                    <th className="py-3 px-5 text-right">Views</th>
                    <th className="py-3 px-5">Traffic Share</th>
                    <th className="py-3 px-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        Loading page view analytics...
                      </td>
                    </tr>
                  ) : !data?.pageBreakdown || data.pageBreakdown.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No page views recorded yet for this timeframe. Visit public pages to generate live traffic data!
                      </td>
                    </tr>
                  ) : (
                    data.pageBreakdown.map((item) => (
                      <tr
                        key={item.path}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-5 font-mono font-semibold text-amber-600 dark:text-amber-400">
                          {item.path}
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-900 dark:text-slate-200 max-w-[220px] truncate" title={item.title}>
                          {item.title}
                        </td>
                        <td className="py-3.5 px-5 text-right font-extrabold text-slate-900 dark:text-white font-mono">
                          {item.views.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-5 w-44">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(item.percentage, 4)}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 w-8">
                              {item.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-500/10 transition-all"
                            title="Open page in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Device Stats & Real-Time Feed */}
        <div className="lg:col-span-4 space-y-6">
          {/* Device Breakdown Card */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Monitor className="w-4 h-4 text-amber-500" />
              Visitor Devices
            </h3>

            <div className="space-y-4">
              {/* Desktop */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Monitor className="w-3.5 h-3.5 text-blue-500" />
                    Desktop
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">
                    {data?.deviceStats.desktop || 0} ({desktopPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${desktopPct}%` }} />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                    Mobile
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">
                    {data?.deviceStats.mobile || 0} ({mobilePct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${mobilePct}%` }} />
                </div>
              </div>

              {/* Tablet */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Tablet className="w-3.5 h-3.5 text-purple-500" />
                    Tablet
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">
                    {data?.deviceStats.tablet || 0} ({tabletPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${tabletPct}%` }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Traffic Sources */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-amber-500" />
              Traffic Referrers
            </h3>

            <div className="space-y-2">
              {!data?.referrers || data.referrers.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No referrer data available yet.</p>
              ) : (
                data.referrers.map((ref, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/50 last:border-none"
                  >
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[180px]">
                      {ref.source}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      {ref.count} hits
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Recent Visitor Activity Log */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-3">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Live Visitor Activity Stream
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {!data?.recentActivity || data.recentActivity.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No recent page views recorded.</p>
              ) : (
                data.recentActivity.map((item) => {
                  const date = new Date(item.createdAt);
                  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 truncate max-w-[180px]">
                          {item.path}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{timeStr}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="truncate max-w-[180px]">{item.title || item.path}</span>
                        <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                          {item.device}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
