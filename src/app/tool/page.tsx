"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ShieldAlert,
  Zap,
  Globe,
  FileCheck2,
  FileText,
  Printer,
  RotateCcw,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  Layers,
  Activity,
  Info,
  Sliders,
  Compass,
  Sparkles,
  Lock,
  LogOut,
  KeyRound,
  ShieldCheck,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import AuthGuard, { useAuth } from "@/components/AuthGuard";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

/* ---------------- Data Interfaces ---------------- */
export interface SoilType {
  name: string;
  low: number;
  high: number;
  corrosion: string;
  note: string;
}

export interface ClimateZone {
  name: string;
  factor: number;
  corrosion: string;
  note: string;
}

export interface OccupancyType {
  name: string;
  target: number;
  lb: number;
}

export interface StepItem {
  id: "site" | "earth" | "strike" | "report";
  label: string;
  num: string;
  description: string;
  icon: React.ElementType;
}

export type NgMode = "direct" | "td";
export type LpsClass = "none" | "4" | "3" | "2" | "1";
export type StatusKind = "pass" | "marginal" | "fail" | "nodata";

/* ---------------- Reference Data ---------------- */
const soilTypes: SoilType[] = [
  { name: "Marshy / wet organic soil", low: 5, high: 50, corrosion: "Low–Moderate", note: "Excellent conductivity. Watch for organic-acid corrosion on ferrous electrodes." },
  { name: "Clay (moist)", low: 50, high: 100, corrosion: "Moderate", note: "Good, stable conductivity if moisture is retained year-round." },
  { name: "Clay & loam mix", low: 100, high: 200, corrosion: "Moderate", note: "Reliable general-purpose soil for standard rod electrodes." },
  { name: "Black cotton soil", low: 100, high: 250, corrosion: "High (expansive/saline pockets)", note: "Seasonal shrink–swell can loosen electrode contact — re-torque connections annually." },
  { name: "Sandy clay", low: 150, high: 300, corrosion: "Moderate", note: "Resistivity rises sharply on drying; a chemical backfill compound helps." },
  { name: "Wet sand / gravel", low: 200, high: 500, corrosion: "Low", note: "Conductivity is highly dependent on residual moisture content." },
  { name: "Dry sand", low: 500, high: 2500, corrosion: "Low", note: "Poor conductor. Use deep-driven or multiple electrodes with conductive backfill." },
  { name: "Gravel / stony soil", low: 1000, high: 3000, corrosion: "Low", note: "Difficult driving conditions — plate or mat electrodes are usually preferred." },
  { name: "Rock / hard rock", low: 3000, high: 10000, corrosion: "Very low", note: "Requires a surface earth mat with chemical backfill, or blasted electrode pits." },
];

const climateZones: ClimateZone[] = [
  { name: "Tropical monsoon (high rainfall)", factor: 0.7, corrosion: "Moderate", note: "Resistivity drops in the monsoon and rises markedly in the dry season — audit both seasons." },
  { name: "Humid subtropical", factor: 0.9, corrosion: "Moderate", note: "Moderate, fairly stable seasonal variation." },
  { name: "Temperate", factor: 1.2, corrosion: "Moderate", note: "Moderate seasonal swing; frost can affect shallow electrodes in winter." },
  { name: "Arid / desert", factor: 1.8, corrosion: "Low (unless saline)", note: "High and unstable resistivity — drive electrodes below the residual moisture table." },
  { name: "Coastal / saline", factor: 0.6, corrosion: "High (chloride)", note: "Low resistivity but accelerated galvanic corrosion — inspect connections yearly." },
  { name: "Cold / alpine (frost-prone)", factor: 2.5, corrosion: "Low", note: "Frozen top layer spikes resistivity in winter — drive electrodes below the frost line." },
  { name: "Semi-arid", factor: 1.4, corrosion: "Low–Moderate", note: "Notable dry-season rise; consider chemical (GEM) earthing." },
];

const occupancyTypes: OccupancyType[] = [
  { name: "Residential", target: 5, lb: 0.5 },
  { name: "Commercial / office", target: 5, lb: 0.6 },
  { name: "Industrial / factory", target: 2, lb: 1.0 },
  { name: "Hospital / critical care", target: 1, lb: 2.0 },
  { name: "Data center / telecom", target: 1, lb: 1.2 },
  { name: "School / educational", target: 2, lb: 1.4 },
  { name: "Public assembly (stadium, hall)", target: 2, lb: 1.6 },
  { name: "Fuel / chemical storage", target: 1, lb: 3.0 },
  { name: "Substation / utility yard", target: 0.5, lb: 1.0 },
];

const checklistItems: string[] = [
  "Earth pit inspection cover intact and accessible",
  "No visible corrosion on electrode or strip at test point",
  "All connections bolted / clamped — not twisted or taped",
  "Bonding conductor continuity verified with a continuity tester",
  "Minimum spacing between electrodes ≥ 2× electrode length maintained",
  "Test link / disconnecting joint provided and accessible for periodic testing",
  "Moisture-maintenance arrangement present (conventional pipe earthing)",
  "Electrical, LPS and electronic earths bonded at a single reference point",
  "Earth conductor route protected from mechanical damage",
  "Signage / identification label present at the earth pit",
];

const pbByLps: Record<LpsClass, number> = {
  none: 1,
  "4": 0.2,
  "3": 0.1,
  "2": 0.05,
  "1": 0.02,
};

const STEPS: StepItem[] = [
  { id: "site", label: "Site & Climate", num: "01", description: "Structure, soil & lightning flash data", icon: Building2 },
  { id: "earth", label: "Earthing Audit", num: "02", description: "Electrode readings & physical inspection", icon: Activity },
  { id: "strike", label: "Lightning Risk", num: "03", description: "IEC 62305-2 risk assessment & LPL", icon: Zap },
  { id: "report", label: "Consolidated Report", num: "04", description: "Engineering report & export PDF", icon: FileText },
];

/* ---------------- Custom Shadcn-Style Dropdown Select ---------------- */
interface CustomSelectOption<T extends string | number> {
  value: T;
  label: string;
  sublabel?: string;
}

interface CustomSelectProps<T extends string | number> {
  value: T;
  onChange: (val: T) => void;
  options: CustomSelectOption<T>[];
  placeholder?: string;
  className?: string;
}

function CustomSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  className = "",
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-left text-slate-900 dark:text-slate-100 flex items-center justify-between gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer"
      >
        <span className="truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-amber-500" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-64 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 space-y-0.5 animate-in fade-in-80 zoom-in-95 backdrop-blur-md">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate">{opt.label}</div>
                  {opt.sublabel && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
                      {opt.sublabel}
                    </div>
                  )}
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- Utility Helpers ---------------- */
const fmt = (n: number | null | undefined, d = 2): string => {
  if (n === null || n === undefined || !isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 });
};

const clampPct = (p: number): number => Math.max(0, Math.min(100, p));

function statusWord(s: StatusKind): string {
  switch (s) {
    case "pass":
      return "Compliant";
    case "marginal":
      return "Marginal — action required";
    case "fail":
      return "Non-compliant — immediate action required";
    default:
      return "—";
  }
}

/* ---------------- Main Component ---------------- */
export default function EarthLineConsolePage() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  // Navigation State
  const [tab, setTab] = useState<StepItem["id"]>("site");

  // Step 1 State (Clean empty placeholders - not predefined!)
  const [siteName, setSiteName] = useState<string>("");
  const [siteLoc, setSiteLoc] = useState<string>("");
  const [occIdx, setOccIdx] = useState<number>(0);
  const [dimL, setDimL] = useState<number | string>("");
  const [dimW, setDimW] = useState<number | string>("");
  const [dimH, setDimH] = useState<number | string>("");
  const [cd, setCd] = useState<string>("0.5");
  const [soilIdx, setSoilIdx] = useState<number>(0);
  const [climateIdx, setClimateIdx] = useState<number>(0);
  const [ngMode, setNgMode] = useState<NgMode>("direct");
  const [ngDirect, setNgDirect] = useState<number | string>("");
  const [ngTd, setNgTd] = useState<number | string>("");
  const [lpsClass, setLpsClass] = useState<LpsClass>("none");

  // Step 2 State
  const [electrodeType, setElectrodeType] = useState<string>("Pipe / rod electrode");
  const [electrodeCount, setElectrodeCount] = useState<number | string>("");
  const [r1, setR1] = useState<string>("");
  const [r2, setR2] = useState<string>("");
  const [r3, setR3] = useState<string>("");
  const [checks, setChecks] = useState<boolean[]>(Array(checklistItems.length).fill(false));

  // Project submission state
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  // Select Options Maps
  const occupancyOptions = useMemo(
    () =>
      occupancyTypes.map((o, i) => ({
        value: i,
        label: o.name,
        sublabel: `Target Earth Resistance: ≤ ${o.target} Ω (Loss Weighting Lb: ${o.lb})`,
      })),
    []
  );

  const cdOptions = useMemo(
    () => [
      { value: "0.25", label: "Cd = 0.25 — Structure surrounded by taller objects or trees" },
      { value: "0.5", label: "Cd = 0.50 — Structure surrounded by objects of same or lower height" },
      { value: "1", label: "Cd = 1.00 — Isolated structure (no surrounding objects nearby)" },
      { value: "2", label: "Cd = 2.00 — Isolated structure situated on a hilltop, knoll or ridge" },
    ],
    []
  );

  const soilOptions = useMemo(
    () =>
      soilTypes.map((s, i) => ({
        value: i,
        label: s.name,
        sublabel: `Resistivity: ${s.low}–${s.high} Ω·m · Corrosion: ${s.corrosion}`,
      })),
    []
  );

  const climateOptions = useMemo(
    () =>
      climateZones.map((c, i) => ({
        value: i,
        label: c.name,
        sublabel: `Seasonal multiplier: ×${c.factor} · Corrosion: ${c.corrosion}`,
      })),
    []
  );

  const lpsOptions = useMemo<CustomSelectOption<LpsClass>[]>(
    () => [
      { value: "none", label: "None installed (Pb = 1.0)" },
      { value: "4", label: "Class IV — Basic LPS (Pb = 0.20)" },
      { value: "3", label: "Class III — Standard LPS (Pb = 0.10)" },
      { value: "2", label: "Class II — Enhanced LPS (Pb = 0.05)" },
      { value: "1", label: "Class I — Maximum Protection LPS (Pb = 0.02)" },
    ],
    []
  );

  const electrodeOptions = useMemo(
    () => [
      { value: "Pipe / rod electrode", label: "Pipe / rod electrode" },
      { value: "Plate electrode", label: "Plate electrode" },
      { value: "Strip / buried conductor", label: "Strip / buried conductor" },
      { value: "Earth mat / grid", label: "Earth mat / grid" },
      { value: "Chemical (GEM / backfill compound) electrode", label: "Chemical (GEM / backfill compound) electrode" },
    ],
    []
  );

  /* -------- Form Validation Checks -------- */
  const parseNum = (v: number | string): number => (typeof v === "number" ? v : parseFloat(v) || 0);

  const isStep1Valid = useMemo(() => {
    const hasName = siteName.trim().length > 0;
    const hasLoc = siteLoc.trim().length > 0;
    const L = parseNum(dimL);
    const W = parseNum(dimW);
    const H = parseNum(dimH);
    const hasValidDims = L > 0 && W > 0 && H > 0;

    let hasValidNg = false;
    if (ngMode === "direct") {
      hasValidNg = ngDirect !== "" && parseNum(ngDirect) >= 0;
    } else {
      hasValidNg = ngTd !== "" && parseNum(ngTd) >= 0;
    }

    return hasName && hasLoc && hasValidDims && hasValidNg;
  }, [siteName, siteLoc, dimL, dimW, dimH, ngMode, ngDirect, ngTd]);

  const isStep2Valid = useMemo(() => {
    const rawReadings = [r1, r2, r3].map((v) => parseFloat(v)).filter((v) => !isNaN(v) && v >= 0);
    const hasReading = rawReadings.length > 0;
    const validCount = electrodeCount !== "" && parseNum(electrodeCount) >= 1;
    return isStep1Valid && hasReading && validCount;
  }, [isStep1Valid, r1, r2, r3, electrodeCount]);

  const isStep3Valid = useMemo(() => {
    return isStep1Valid && isStep2Valid;
  }, [isStep1Valid, isStep2Valid]);

  const isStepLocked = (stepId: StepItem["id"]) => {
    if (stepId === "site") return false;
    if (stepId === "earth") return !isStep1Valid;
    if (stepId === "strike") return !isStep1Valid || !isStep2Valid;
    if (stepId === "report") return !isStep1Valid || !isStep2Valid;
    return false;
  };

  const toggleCheck = (i: number) => {
    setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));
  };

  const toggleAllChecks = () => {
    const allChecked = checks.every(Boolean);
    setChecks(Array(checklistItems.length).fill(!allChecked));
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && window.confirm("Are you sure you want to clear all form fields?")) {
      setSiteName("");
      setSiteLoc("");
      setOccIdx(0);
      setDimL("");
      setDimW("");
      setDimH("");
      setCd("0.5");
      setSoilIdx(0);
      setClimateIdx(0);
      setNgMode("direct");
      setNgDirect("");
      setNgTd("");
      setLpsClass("none");
      setElectrodeType("Pipe / rod electrode");
      setElectrodeCount("");
      setR1("");
      setR2("");
      setR3("");
      setChecks(Array(checklistItems.length).fill(false));
      setTab("site");
    }
  };

  /* -------- Derived Calculations -------- */
  const data = useMemo(() => {
    const occ = occupancyTypes[occIdx] || occupancyTypes[0];
    const soil = soilTypes[soilIdx] || soilTypes[0];
    const climate = climateZones[climateIdx] || climateZones[0];
    const L = parseNum(dimL);
    const W = parseNum(dimW);
    const H = parseNum(dimH);
    const Cd = parseFloat(cd) || 0.5;
    const Ng = ngMode === "direct" ? parseNum(ngDirect) : parseNum(ngTd) * 0.1;

    // Earthing calculations
    const rawReadings = [r1, r2, r3].map((v) => parseFloat(v)).filter((v) => !isNaN(v) && v >= 0);
    const rAvg = rawReadings.length ? rawReadings.reduce((a, b) => a + b, 0) / rawReadings.length : null;
    const target = occ.target;
    const marginalMax = target * 1.5;
    const scaleMax = Math.max(marginalMax * 1.8, rAvg || 0, 1);

    let rStatus: StatusKind = "nodata";
    if (rAvg !== null) {
      if (rAvg <= target) rStatus = "pass";
      else if (rAvg <= marginalMax) rStatus = "marginal";
      else rStatus = "fail";
    }
    const needlePct = rAvg !== null ? clampPct((rAvg / scaleMax) * 100) : 0;

    const checklistPct = (checks.filter(Boolean).length / checklistItems.length) * 100;

    let earthOverall: StatusKind = "fail";
    if (rStatus === "pass" && checklistPct >= 80) earthOverall = "pass";
    else if (rStatus !== "fail" && checklistPct >= 50) earthOverall = "marginal";

    // Lightning Risk (IEC 62305-2)
    const Ad = L * W + 2 * 3 * H * (L + W) + Math.PI * Math.pow(3 * H, 2);
    const Nd = Ng * Ad * Cd * 1e-6;
    const Pb = pbByLps[lpsClass] ?? 1;
    const LbBase = 0.01 * occ.lb;
    const R1 = Nd * Pb * LbBase;
    const RT = 1e-5;
    const ratio = RT > 0 ? R1 / RT : 0;
    const riskNeedlePct = clampPct((ratio / 10) * 100);

    let lightningOverall: StatusKind;
    let lplText: string;
    let effText: string;

    if (R1 <= RT) {
      lightningOverall = "pass";
      effText = "0 (not required)";
      lplText = "No mandatory LPS — basic bonding & SPDs still advised";
    } else {
      const E = 1 - RT / R1;
      effText = E.toFixed(3);
      let lpl: string;
      if (E >= 0.98) lpl = "Class I (highest protection)";
      else if (E >= 0.95) lpl = "Class II";
      else if (E >= 0.9) lpl = "Class III";
      else lpl = "Class IV (minimum)";
      lplText = lpl;
      lightningOverall = ratio > 3 ? "fail" : "marginal";
    }

    return {
      occ,
      soil,
      climate,
      L,
      W,
      H,
      Cd,
      Ng,
      rAvg,
      target,
      scaleMax,
      rStatus,
      needlePct,
      checklistPct,
      earthOverall,
      Ad,
      Nd,
      R1,
      RT,
      ratio,
      riskNeedlePct,
      lightningOverall,
      lplText,
      effText,
    };
  }, [occIdx, soilIdx, climateIdx, dimL, dimW, dimH, cd, ngMode, ngDirect, ngTd, lpsClass, r1, r2, r3, checks]);

  /* -------- Tailored Recommendations -------- */
  const recs = useMemo(() => {
    const d = data;
    const list: { t: string; c: "crit" | "ok" | "warn" }[] = [];

    if (d.rAvg === null) {
      list.push({ t: "Take at least one fall-of-potential earth resistance reading before finalizing this audit.", c: "crit" });
    } else if (d.earthOverall === "fail") {
      list.push({
        t: `Measured resistance (${fmt(d.rAvg, 2)} Ω) exceeds target for ${d.occ.name.toLowerCase()} occupancy (${fmt(
          d.target,
          1
        )} Ω). Add electrodes, deepen existing rods, or apply a chemical backfill compound.`,
        c: "crit",
      });
    } else if (d.earthOverall === "marginal") {
      list.push({
        t: `Resistance is above target but within marginal band. Re-test at end of dry season given site's ${d.climate.name.toLowerCase()} climate.`,
        c: "warn",
      });
    } else {
      list.push({ t: "Measured earth resistance meets target for this occupancy type.", c: "ok" });
    }

    if (d.checklistPct < 80) {
      list.push({
        t: `Only ${fmt(d.checklistPct, 0)}% of physical inspection items pass. Review unchecked items in Step 02 and close out before sign-off.`,
        c: d.checklistPct < 50 ? "crit" : "warn",
      });
    }

    if (d.climate.factor >= 1.4) {
      list.push({
        t: `${d.climate.name} conditions can raise soil resistivity substantially in dry season (×${d.climate.factor} vs wet-season baseline) — verify readings across both seasons.`,
        c: "warn",
      });
    }
    if (d.soil.corrosion.toLowerCase().includes("high")) {
      list.push({
        t: `${d.soil.name} carries high corrosion risk (${d.soil.corrosion}). Inspect electrode connections and cathodic protection annually.`,
        c: "warn",
      });
    }

    if (d.lightningOverall === "fail") {
      list.push({
        t: `Lightning risk R1 is ${fmt(d.ratio, 1)}× tolerable limit. A certified LPS design (${d.lplText}) with surge protective devices is strongly recommended.`,
        c: "crit",
      });
    } else if (d.lightningOverall === "marginal") {
      list.push({
        t: `Lightning risk exceeds tolerable threshold. Install or upgrade LPS to ${d.lplText.toLowerCase()} and add coordinated surge protection.`,
        c: "warn",
      });
    } else {
      list.push({
        t: "Structure lightning risk is within tolerable limit for assumptions entered. Maintain existing bonding and SPD provisions.",
        c: "ok",
      });
    }

    list.push({
      t: "This tool provides preliminary screening only. Final earthing and lightning protection system design must be certified by a qualified engineer against applicable codes (IEC 62305, IS 3043 / IS 2309, NFPA 780).",
      c: "warn",
    });

    return list;
  }, [data]);

  const activeStepIdx = STEPS.findIndex((s) => s.id === tab);

  return (
    <div className={`${poppins.className} el-poppins-scope min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300`}>
      {/* ---------------- Global & Print Styles ---------------- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .el-poppins-scope,
        .el-poppins-scope *,
        .el-poppins-scope input,
        .el-poppins-scope select,
        .el-poppins-scope button,
        .el-poppins-scope textarea {
          font-family: ${poppins.style.fontFamily}, 'Poppins', sans-serif !important;
        }

        @media print {
          header,
          footer,
          nav,
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-full {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* ---------------- Main Layout ---------------- */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Step Navigation (Sticky on Left Side) */}
        <aside className="no-print md:w-72 shrink-0 flex flex-col gap-6 md:sticky md:top-40 md:self-start">
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-sm">
            {/* Header controls inside sidebar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-sm">
                  ARK
                </div>
                <span className="text-xs font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100">
                  EarthLine Console
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Clear Form"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer"
                  title="Logout (Clear Auth)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Audit Workflow
              </h2>
              <span className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
                Step {activeStepIdx + 1} of {STEPS.length}
              </span>
            </div>

            <nav className="flex flex-col gap-2">
              {STEPS.map((s, idx) => {
                const Icon = s.icon;
                const isActive = tab === s.id;
                const locked = isStepLocked(s.id);
                const isPassed = activeStepIdx > idx && !locked;

                return (
                  <button
                    key={s.id}
                    disabled={locked}
                    onClick={() => {
                      if (!locked) setTab(s.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3.5 group ${
                      locked
                        ? "opacity-50 cursor-not-allowed bg-slate-100/50 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-800/40 text-slate-400 dark:text-slate-600"
                        : isActive
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 shadow-sm"
                        : isPassed
                        ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-amber-500/30"
                        : "bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-colors ${
                        locked
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700"
                          : isActive
                          ? "bg-amber-500 text-slate-950"
                          : isPassed
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 group-hover:border-slate-300"
                      }`}
                    >
                      {locked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        s.num
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold leading-snug flex items-center justify-between">
                        <span className="truncate">{s.label}</span>
                        {locked ? (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500">
                            Locked
                          </span>
                        ) : isActive ? (
                          <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                        ) : null}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{s.description}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Summary Card in Sidebar */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-lg border border-slate-800 hidden md:block">
            <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Live Status
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Target Earth Resistance:</span>
                <span className="font-mono font-semibold text-slate-100">{fmt(data.target, 1)} Ω</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Avg Measured Resistance:</span>
                <span className="font-mono font-semibold text-slate-100">
                  {data.rAvg !== null ? `${fmt(data.rAvg, 2)} Ω` : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Checklist Score:</span>
                <span className="font-mono font-semibold text-slate-100">{fmt(data.checklistPct, 0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lightning Risk (R1):</span>
                <span className="font-mono font-semibold text-slate-100">{data.R1.toExponential(2)}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Overall Status:</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                  data.earthOverall === "pass"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : data.earthOverall === "marginal"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
              >
                {statusWord(data.earthOverall)}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 print-full min-w-0">
          {/* STEP 01: SITE & CLIMATE PROFILE */}
          {tab === "site" && (
            <section className="space-y-6">
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" /> Step 01 Configuration
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Site &amp; Climate Profile
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  Configure structure geometry, location risk factors, soil parameters, and local thunder/lightning data
                  which drive downstream compliance checks. All fields in this section are required.
                </p>
              </div>

              {/* Project Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Globe className="w-4 h-4 text-amber-500" /> Project &amp; Occupancy Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Site / Project Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      placeholder="e.g. Riverside Warehouse, Plant 3"
                      className={`w-full bg-slate-50 dark:bg-slate-800/60 border rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                        siteName.trim() === ""
                          ? "border-amber-400/60 dark:border-amber-500/40"
                          : "border-slate-300 dark:border-slate-700/80"
                      }`}
                    />
                    {siteName.trim() === "" && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Project name is required.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Location (City, Region) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={siteLoc}
                      onChange={(e) => setSiteLoc(e.target.value)}
                      placeholder="e.g. Chennai, Tamil Nadu"
                      className={`w-full bg-slate-50 dark:bg-slate-800/60 border rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none transition-colors ${
                        siteLoc.trim() === ""
                          ? "border-amber-400/60 dark:border-amber-500/40"
                          : "border-slate-300 dark:border-slate-700/80"
                      }`}
                    />
                    {siteLoc.trim() === "" && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Location is required.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Occupancy / Structure Classification
                  </label>
                  <CustomSelect
                    value={occIdx}
                    onChange={(val) => setOccIdx(val)}
                    options={occupancyOptions}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    Determines target earthing resistance limit per IS 3043 and loss-of-life weighting (Lb) for IEC 62305 risk model.
                  </p>
                </div>
              </div>

              {/* Geometry Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Layers className="w-4 h-4 text-amber-500" /> Structure Dimensions &amp; Surroundings Factor
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Length L (m) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={dimL}
                      placeholder="e.g. 30"
                      onChange={(e) => setDimL(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Width W (m) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={dimW}
                      placeholder="e.g. 20"
                      onChange={(e) => setDimW(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Height H (m) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={dimH}
                      placeholder="e.g. 10"
                      onChange={(e) => setDimH(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Location Factor Cd (Environmental Surroundings)
                  </label>
                  <CustomSelect
                    value={cd}
                    onChange={(val) => setCd(val)}
                    options={cdOptions}
                  />
                </div>
              </div>

              {/* Soil & Climate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Soil Card */}
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <Sliders className="w-4 h-4 text-amber-500" /> Soil Type &amp; Resistivity
                    </h3>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Predominant Soil at Electrode Depth
                    </label>
                    <CustomSelect
                      value={soilIdx}
                      onChange={(val) => setSoilIdx(val)}
                      options={soilOptions}
                    />
                  </div>

                  <div className="mt-4 p-3.5 bg-amber-500/10 border-l-4 border-amber-500 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">{data.soil.name}</p>
                    <p className="mb-1 text-slate-600 dark:text-slate-400">
                      Resistivity Range: <span className="font-mono font-medium">{data.soil.low}–{data.soil.high} Ω·m</span> · Corrosion Risk: <span className="font-medium">{data.soil.corrosion}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 italic">{data.soil.note}</p>
                  </div>
                </div>

                {/* Climate Card */}
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <Compass className="w-4 h-4 text-amber-500" /> Climate Zone Classification
                    </h3>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Regional Climate Zone
                    </label>
                    <CustomSelect
                      value={climateIdx}
                      onChange={(val) => setClimateIdx(val)}
                      options={climateOptions}
                    />
                  </div>

                  <div className="mt-4 p-3.5 bg-sky-500/10 border-l-4 border-sky-500 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-sky-700 dark:text-sky-400 mb-1">{data.climate.name}</p>
                    <p className="mb-1 text-slate-600 dark:text-slate-400">
                      Dry-season Multiplier: <span className="font-mono font-medium">×{data.climate.factor}</span> · Corrosion: <span className="font-medium">{data.climate.corrosion}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 italic">{data.climate.note}</p>
                  </div>
                </div>
              </div>

              {/* Lightning Flash Density Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Zap className="w-4 h-4 text-amber-500" /> Lightning Ground Flash Density (Ng) &amp; LPS Class
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    <input
                      type="radio"
                      name="ngMode"
                      checked={ngMode === "direct"}
                      onChange={() => setNgMode("direct")}
                      className="accent-amber-500"
                    />
                    Enter Ng directly
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    <input
                      type="radio"
                      name="ngMode"
                      checked={ngMode === "td"}
                      onChange={() => setNgMode("td")}
                      className="accent-amber-500"
                    />
                    Derive from Thunderstorm Days (Td)
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                  {ngMode === "direct" ? (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Ng — Flashes / km² / year <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={ngDirect}
                        placeholder="e.g. 5.0"
                        onChange={(e) => setNgDirect(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Td — Thunderstorm days / year (Isokeraunic Level) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={ngTd}
                        placeholder="e.g. 40"
                        onChange={(e) => setNgTd(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Existing Lightning Protection System (LPS) Class
                    </label>
                    <CustomSelect
                      value={lpsClass}
                      onChange={(val) => setLpsClass(val)}
                      options={lpsOptions}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Typical Ng values in India: Inland temperate 1–4, humid subtropical 4–8, tropical monsoon / coastal 8–14+.
                </p>
              </div>

              {/* Navigation Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                {!isStep1Valid ? (
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please fill in Site Name, Location, dimensions (L, W, H &gt; 0) and Ng/Td value to unlock Step 02.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Site &amp; climate details complete.</span>
                  </div>
                )}

                <button
                  disabled={!isStep1Valid}
                  onClick={() => {
                    if (isStep1Valid) setTab("earth");
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    isStep1Valid
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  {!isStep1Valid && <Lock className="w-4 h-4" />}
                  <span>Proceed to Step 02: Earthing Audit</span>
                  {isStep1Valid && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </section>
          )}

          {/* STEP 02: EARTHING AUDIT */}
          {tab === "earth" && (
            <section className="space-y-6">
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" /> Step 02 Audit Logging
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Earthing System Audit
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  Log earth electrode type, pit resistance readings (fall-of-potential method), and complete the physical
                  inspection checklist. At least one earth resistance reading is required.
                </p>
              </div>

              {/* Electrode Configuration Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Sliders className="w-4 h-4 text-amber-500" /> Electrode System Parameters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Electrode Type
                    </label>
                    <CustomSelect
                      value={electrodeType}
                      onChange={(val) => setElectrodeType(val)}
                      options={electrodeOptions}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Number of Electrodes / Earth Pits <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={electrodeCount}
                      placeholder="e.g. 4"
                      onChange={(e) => setElectrodeCount(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Resistance Readings Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-500" /> Measured Earth Resistance (Fall-of-Potential)
                  </span>
                  <span className="text-xs font-normal text-amber-600 dark:text-amber-400 font-mono">
                    * At least 1 reading required
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Pit 1 Reading (Ω)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={r1}
                      placeholder="e.g. 3.20"
                      onChange={(e) => setR1(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Pit 2 Reading (Ω)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={r2}
                      placeholder="optional"
                      onChange={(e) => setR2(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Pit 3 Reading (Ω)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={r3}
                      placeholder="optional"
                      onChange={(e) => setR3(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Meter Readout Box */}
                <div className="bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Average Earth Resistance
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
                          {data.rAvg !== null ? fmt(data.rAvg, 2) : "—"}
                        </span>
                        <span className="text-sm font-mono text-slate-500 dark:text-slate-400">Ω (Ohms)</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide ${
                          data.rStatus === "pass"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                            : data.rStatus === "marginal"
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                            : data.rStatus === "fail"
                            ? "bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {data.rStatus === "pass" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {data.rStatus === "marginal" && <AlertTriangle className="w-3.5 h-3.5" />}
                        {data.rStatus === "fail" && <XCircle className="w-3.5 h-3.5" />}
                        {data.rStatus === "nodata" ? "NO READINGS ENTERED" : statusWord(data.rStatus).toUpperCase()}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                        Occupancy Target: ≤ {fmt(data.target, 1)} Ω
                      </p>
                    </div>
                  </div>

                  {/* Meter Needle Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="relative h-3.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500" />
                      {data.rAvg !== null && (
                        <div
                          className="absolute top-0 bottom-0 w-1.5 bg-slate-950 dark:bg-white border border-white dark:border-slate-950 shadow-md transition-all duration-500 -ml-0.75"
                          style={{ left: `${data.needlePct}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>0.00 Ω</span>
                      <span>Target: {fmt(data.target, 1)} Ω</span>
                      <span>Max Scale: {fmt(data.scaleMax, 0)} Ω</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Inspection Checklist */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-amber-500" /> Physical Installation &amp; Maintenance Checklist
                  </h3>
                  <button
                    onClick={toggleAllChecks}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {checks.every(Boolean) ? "Uncheck All" : "Check All"}
                  </button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {checklistItems.map((itemText, i) => (
                    <label
                      key={i}
                      className="py-3 flex items-start gap-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-2 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checks[i]}
                        onChange={() => toggleCheck(i)}
                        className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-500 accent-amber-500 border-slate-300 dark:border-slate-700 shrink-0"
                      />
                      <span
                        className={`text-sm transition-colors ${
                          checks[i]
                            ? "text-slate-900 dark:text-slate-100 font-medium"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {itemText}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Score Bar */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Checklist Compliance</span>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(data.checklistPct, 0)}%
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          data.checklistPct >= 80 ? "bg-emerald-500" : data.checklistPct >= 50 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${data.checklistPct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-right font-mono text-slate-500 mt-1">
                      {checks.filter(Boolean).length} / {checklistItems.length} verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setTab("site")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Step 01
                </button>

                {!isStep2Valid ? (
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Enter electrode count &amp; at least 1 earth pit reading to unlock Step 03.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Earthing readings verified.</span>
                  </div>
                )}

                <button
                  disabled={!isStep2Valid}
                  onClick={() => {
                    if (isStep2Valid) setTab("strike");
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    isStep2Valid
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  {!isStep2Valid && <Lock className="w-4 h-4" />}
                  <span>Proceed to Step 03: Lightning Risk</span>
                  {isStep2Valid && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </section>
          )}

          {/* STEP 03: LIGHTNING RISK */}
          {tab === "strike" && (
            <section className="space-y-6">
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" /> Step 03 Risk Assessment
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Lightning Protection Risk (IEC 62305-2)
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  Evaluates equivalent collection area (Ad), direct strikes to structure (Nd), loss of life risk (R1), and
                  derives required LPS protection level (LPL).
                </p>
              </div>

              {/* Calculated Parameters Table */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Activity className="w-4 h-4 text-amber-500" /> Collection Area &amp; Annual Strike Frequency
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Equivalent Collection Area (Ad)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {fmt(data.Ad, 0)} m²
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Ground Flash Density (Ng)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {fmt(data.Ng, 2)} flashes/km²/yr
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Location Surroundings Factor (Cd)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {data.Cd}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Expected Direct Annual Strikes (Nd)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {fmt(data.Nd, 4)} strikes/yr
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risk Comparison Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> Risk Evaluation R1 vs Tolerable Risk RT
                </h3>

                <div className="bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        R1 — Loss of Human Life Risk
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
                          {data.R1.toExponential(2)}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">/ year</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide ${
                          data.lightningOverall === "pass"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                            : data.lightningOverall === "marginal"
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {data.lightningOverall === "pass" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {data.lightningOverall === "marginal" && <AlertTriangle className="w-3.5 h-3.5" />}
                        {data.lightningOverall === "fail" && <XCircle className="w-3.5 h-3.5" />}
                        {data.lightningOverall === "pass"
                          ? "WITHIN TOLERABLE LIMIT"
                          : data.lightningOverall === "fail"
                          ? "CRITICAL RISK EXCEEDED"
                          : "EXCEEDS TOLERABLE LIMIT"}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                        Tolerable Standard Limit (RT): 1.00×10⁻⁵ / yr
                      </p>
                    </div>
                  </div>

                  {/* Meter Needle Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="relative h-3.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500" />
                      <div
                        className="absolute top-0 bottom-0 w-1.5 bg-slate-950 dark:bg-white border border-white dark:border-slate-950 shadow-md transition-all duration-500 -ml-0.75"
                        style={{ left: `${data.riskNeedlePct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Below RT</span>
                      <span>RT = 1.0×10⁻⁵</span>
                      <span>10× RT</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Tolerable Risk Threshold (RT)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          1.00 × 10⁻⁵ / year
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          R1 / RT Risk Ratio
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {fmt(data.ratio, 1)}×
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Required LPS Efficiency (E)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                          {data.effText}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                          Recommended Protection Level (LPL)
                        </th>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {data.lplText}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setTab("earth")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Step 02
                </button>

                <button
                  disabled={!isStep3Valid}
                  onClick={() => {
                    if (isStep3Valid) setTab("report");
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    isStep3Valid
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  <span>View Consolidated Report</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 04: CONSOLIDATED AUDIT REPORT */}
          {tab === "report" && (
            <section className="space-y-6 print-full">
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm print-card">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                      <FileText className="w-4 h-4" /> Step 04 · DFMHUB EarthLine Report
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      Consolidated Audit Report
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                      Live recalculation of site specifications, earthing compliance, lightning risk, and engineering recommendations.
                    </p>
                  </div>

                  <div className="no-print">
                    <button
                      onClick={() => window.print()}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" /> Print Report / Save PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Printable Header Notice */}
              <div className="hidden print:block mb-6 p-4 border border-slate-300 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">DFMHUB — ARK Make Systems</h1>
                    <p className="text-xs text-slate-600">EarthLine Earthing &amp; Lightning Protection Audit Report</p>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    Date: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Site Summary Card */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm print-card">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Building2 className="w-4 h-4 text-amber-500" /> Site Specifications &amp; Environmental Factors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Project Site</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{siteName || "(Unnamed Site)"}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Location</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{siteLoc || "(Not Entered)"}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Occupancy Type</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{data.occ.name}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Dimensions (L × W × H)</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                      {data.L} × {data.W} × {data.H} m
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Soil Classification</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{data.soil.name}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Climate Zone</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{data.climate.name}</span>
                  </div>
                </div>
              </div>

              {/* Audit Findings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Earthing Result */}
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm print-card">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <Activity className="w-4 h-4 text-amber-500" /> Earthing System Audit
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Avg Measured Resistance</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        {data.rAvg !== null ? `${fmt(data.rAvg, 2)} Ω` : "Not recorded"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Target Standard Limit</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(data.target, 1)} Ω</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Physical Inspection Score</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(data.checklistPct, 0)}%</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-500 dark:text-slate-400">Earthing Status</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          data.earthOverall === "pass"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                            : data.earthOverall === "marginal"
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {statusWord(data.earthOverall)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lightning Result */}
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm print-card">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <Zap className="w-4 h-4 text-amber-500" /> Lightning Risk Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Collection Area (Ad)</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(data.Ad, 0)} m²</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Calculated Risk (R1)</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{data.R1.toExponential(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Risk Ratio (R1 / RT)</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(data.ratio, 1)}×</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-500 dark:text-slate-400">Recommended LPS Level</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">{data.lplText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tailored Recommendations */}
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm print-card space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <FileCheck2 className="w-4 h-4 text-amber-500" /> Engineering Recommendations &amp; Action Plan
                </h3>

                <div className="space-y-3">
                  {recs.map((r, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                        r.c === "crit"
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300"
                          : r.c === "ok"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
                      }`}
                    >
                      {r.c === "crit" && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
                      {r.c === "ok" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                      {r.c === "warn" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                      <p className="text-xs leading-relaxed font-medium">{r.t}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Action Bar */}
              <div className="no-print flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                <button
                  onClick={() => setTab("strike")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Step 03
                </button>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={async () => {
                      if (submittingProject || projectSubmitted) return;
                      setSubmittingProject(true);
                      try {
                        let userInfo: any = null;
                        try {
                          if (typeof window !== "undefined") {
                            const saved = localStorage.getItem("dfm_user_info");
                            if (saved) userInfo = JSON.parse(saved);
                          }
                        } catch (e) {}

                        // 1. Save project details linked with user info in project_details table
                        await fetch("/api/projects", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            userFullName: userInfo?.fullName || "Guest User",
                            userPhone: userInfo?.phone || "N/A",
                            userEmail: userInfo?.email || "N/A",
                            siteName: siteName || "Unnamed Project",
                            location: siteLoc || "Unspecified Location",
                            occupancy: data.occ.name,
                            dimensions: `${data.L}m × ${data.W}m × ${data.H}m`,
                            soilType: data.soil.name,
                            climateZone: data.climate.name,
                            avgResistance: data.rAvg !== null ? `${fmt(data.rAvg, 2)} Ω` : "Not recorded",
                            targetResistance: `${fmt(data.target, 1)} Ω`,
                            checklistScore: `${fmt(data.checklistPct, 0)}%`,
                            lplClass: data.lplText,
                            riskR1: data.R1.toExponential(2),
                            status: "NEW",
                          }),
                        });

                        // 2. Store same location in user registrations table
                        await fetch("/api/registrations", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            fullName: userInfo?.fullName || "Tool User",
                            phoneNumber: userInfo?.phone || "N/A",
                            email: userInfo?.email || "N/A",
                            companyName: userInfo?.company || siteName || "Tool Audit",
                            location: siteLoc || "Unspecified Location",
                            requirement: "Tool Audit BOQ Quote",
                            source: "TOOL_AUDIT",
                            status: "NEW",
                            remarks: `Tool Audit for ${siteName || "Project"} (${siteLoc || "N/A"})`,
                          }),
                        });
                      } catch (err) {
                        console.warn("Save project error:", err);
                      }
                      setSubmittingProject(false);
                      setProjectSubmitted(true);
                      setTimeout(() => {
                        logout();
                      }, 2000);
                    }}
                    disabled={submittingProject}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                      projectSubmitted
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    {submittingProject ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>SENDING QUOTE REQUEST...</span>
                      </>
                    ) : projectSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        <span>QUOTATION REQUEST SENT! LOGGING OUT... ✓</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-200" />
                        <span>REQUEST OFFICIAL BOQ &amp; QUOTE</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
