"use client";

import React, { useState, useMemo } from "react";

/* ---------------- reference data ---------------- */
const soilTypes = [
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

const climateZones = [
  { name: "Tropical monsoon (high rainfall)", factor: 0.7, corrosion: "Moderate", note: "Resistivity drops in the monsoon and rises markedly in the dry season — audit both seasons." },
  { name: "Humid subtropical", factor: 0.9, corrosion: "Moderate", note: "Moderate, fairly stable seasonal variation." },
  { name: "Temperate", factor: 1.2, corrosion: "Moderate", note: "Moderate seasonal swing; frost can affect shallow electrodes in winter." },
  { name: "Arid / desert", factor: 1.8, corrosion: "Low (unless saline)", note: "High and unstable resistivity — drive electrodes below the residual moisture table." },
  { name: "Coastal / saline", factor: 0.6, corrosion: "High (chloride)", note: "Low resistivity but accelerated galvanic corrosion — inspect connections yearly." },
  { name: "Cold / alpine (frost-prone)", factor: 2.5, corrosion: "Low", note: "Frozen top layer spikes resistivity in winter — drive electrodes below the frost line." },
  { name: "Semi-arid", factor: 1.4, corrosion: "Low–Moderate", note: "Notable dry-season rise; consider chemical (GEM) earthing." },
];

const occupancyTypes = [
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

const checklistItems = [
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

const pbByLps = { none: 1, "4": 0.2, "3": 0.1, "2": 0.05, "1": 0.02 };

const STEPS = [
  { id: "site", label: "Site & Climate", num: "01" },
  { id: "earth", label: "Earthing Audit", num: "02" },
  { id: "strike", label: "Lightning Risk", num: "03" },
  { id: "report", label: "Report", num: "04" },
];

/* ---------------- helpers ---------------- */
const fmt = (n: number, d = 2) =>
  isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 }) : "—";
const clampPct = (p: number) => Math.max(0, Math.min(100, p));

function statusWord(s: string) {
  return ({ pass: "Compliant", marginal: "Marginal — action required", fail: "Non-compliant — immediate action required" } as Record<string, string>)[s] || "—";
}

/* ---------------- component ---------------- */
export default function EarthLineApp() {
  const [tab, setTab] = useState("site");

  const [siteName, setSiteName] = useState("");
  const [siteLoc, setSiteLoc] = useState("");
  const [occIdx, setOccIdx] = useState(0);
  const [dimL, setDimL] = useState<number | string>(30);
  const [dimW, setDimW] = useState<number | string>(20);
  const [dimH, setDimH] = useState<number | string>(10);
  const [cd, setCd] = useState<number | string>(0.5);
  const [soilIdx, setSoilIdx] = useState(0);
  const [climateIdx, setClimateIdx] = useState(0);
  const [ngMode, setNgMode] = useState("direct");
  const [ngDirect, setNgDirect] = useState<number | string>(5);
  const [ngTd, setNgTd] = useState<number | string>(40);
  const [lpsClass, setLpsClass] = useState("none");

  const [electrodeType, setElectrodeType] = useState("Pipe / rod electrode");
  const [electrodeCount, setElectrodeCount] = useState<number | string>(4);
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [r3, setR3] = useState("");
  const [checks, setChecks] = useState(Array(checklistItems.length).fill(false));

  const toggleCheck = (i: number) => setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));

  /* -------- derived calculations (pure, recomputed each render) -------- */
  const data = useMemo(() => {
    const occ = occupancyTypes[occIdx];
    const soil = soilTypes[soilIdx];
    const climate = climateZones[climateIdx];
    const L = typeof dimL === 'string' ? parseFloat(dimL) || 0 : dimL;
    const W = typeof dimW === 'string' ? parseFloat(dimW) || 0 : dimW;
    const H = typeof dimH === 'string' ? parseFloat(dimH) || 0 : dimH;
    const Cd = typeof cd === 'string' ? parseFloat(cd) : cd;
    const Ng = ngMode === "direct" ? (typeof ngDirect === 'string' ? parseFloat(ngDirect) || 0 : ngDirect) : ((typeof ngTd === 'string' ? parseFloat(ngTd) || 0 : ngTd) * 0.1);

    // earthing
    const readings = [r1, r2, r3].map((v) => parseFloat(v)).filter((v) => !isNaN(v));
    const rAvg = readings.length ? readings.reduce((a, b) => a + b, 0) / readings.length : null;
    const target = occ.target;
    const marginalMax = target * 1.5;
    const scaleMax = Math.max(marginalMax * 1.8, rAvg || 0, 1);

    let rStatus = "nodata";
    if (rAvg !== null) {
      if (rAvg <= target) rStatus = "pass";
      else if (rAvg <= marginalMax) rStatus = "marginal";
      else rStatus = "fail";
    }
    const needlePct = rAvg !== null ? clampPct((rAvg / scaleMax) * 100) : 0;

    const checklistPct = (checks.filter(Boolean).length / checklistItems.length) * 100;

    let earthOverall = "fail";
    if (rStatus === "pass" && checklistPct >= 80) earthOverall = "pass";
    else if (rStatus !== "fail" && checklistPct >= 50) earthOverall = "marginal";

    // lightning
    const Ad = L * W + 2 * 3 * H * (L + W) + Math.PI * Math.pow(3 * H, 2);
    const Nd = Ng * Ad * Cd * 1e-6;
    const Pb = pbByLps[lpsClass as keyof typeof pbByLps] || 1;
    const LbBase = 0.01 * occ.lb;
    const R1 = Nd * Pb * LbBase;
    const RT = 1e-5;
    const ratio = RT > 0 ? R1 / RT : 0;
    const riskNeedlePct = clampPct((ratio / 10) * 100);

    let lightningOverall, lplText, effText;
    if (R1 <= RT) {
      lightningOverall = "pass";
      effText = "0 (not required)";
      lplText = "No mandatory LPS — basic bonding & SPDs still advised";
    } else {
      const E = 1 - RT / R1;
      effText = E.toFixed(3);
      let lpl;
      if (E >= 0.98) lpl = "Class I (highest protection)";
      else if (E >= 0.95) lpl = "Class II";
      else if (E >= 0.9) lpl = "Class III";
      else lpl = "Class IV (minimum)";
      lplText = lpl;
      lightningOverall = ratio > 3 ? "fail" : "marginal";
    }

    return {
      occ, soil, climate, L, W, H, Cd, Ng,
      rAvg, target, scaleMax, rStatus, needlePct,
      checklistPct, earthOverall,
      Ad, Nd, R1, RT, ratio, riskNeedlePct, lightningOverall, lplText, effText,
    };
  }, [occIdx, soilIdx, climateIdx, dimL, dimW, dimH, cd, ngMode, ngDirect, ngTd, lpsClass, r1, r2, r3, checks]);

  const recs = useMemo(() => {
    const d = data;
    const list = [];
    if (d.rAvg === null) list.push({ t: "Take at least one fall-of-potential earth resistance reading before finalizing this audit.", c: "crit" });
    else if (d.earthOverall === "fail") list.push({ t: `Measured resistance (${fmt(d.rAvg, 2)}Ω) exceeds the target for ${d.occ.name.toLowerCase()} occupancy (${fmt(d.target, 1)}Ω). Add electrodes, deepen existing rods, or apply a chemical backfill compound.`, c: "crit" });
    else if (d.earthOverall === "marginal") list.push({ t: `Resistance is above target but within a marginal band. Re-test at end of dry season given the site's ${d.climate.name.toLowerCase()} climate.`, c: "" });
    else list.push({ t: "Measured earth resistance meets the target for this occupancy type.", c: "ok" });

    if (d.checklistPct < 80) list.push({ t: `Only ${fmt(d.checklistPct, 0)}% of physical inspection items pass. Review unchecked items in Step 02 and close out before sign-off.`, c: d.checklistPct < 50 ? "crit" : "" });

    if (d.climate.factor >= 1.4) list.push({ t: `${d.climate.name} conditions can raise soil resistivity substantially in the dry season (×${d.climate.factor} vs. wet-season baseline) — verify readings across both seasons.`, c: "" });
    if (d.soil.corrosion.toLowerCase().includes("high")) list.push({ t: `${d.soil.name} carries a high corrosion risk (${d.soil.corrosion}). Inspect electrode connections and cathodic protection annually.`, c: "" });

    if (d.lightningOverall === "fail") list.push({ t: `Lightning risk R1 is ${fmt(d.ratio, 1)}× the tolerable limit. A certified LPS design (${d.lplText}) with surge protective devices is strongly recommended.`, c: "crit" });
    else if (d.lightningOverall === "marginal") list.push({ t: `Lightning risk exceeds the tolerable threshold. Install or upgrade the LPS to ${d.lplText.toLowerCase()} and add coordinated surge protection.`, c: "" });
    else list.push({ t: "Structure lightning risk is within the tolerable limit for the assumptions entered. Maintain existing bonding and SPD provisions.", c: "ok" });

    list.push({ t: "This tool provides a preliminary, simplified screening only. Final earthing and lightning protection system design must be certified by a qualified engineer against the applicable local standard (e.g. IEC 62305, IS 3043 / IS 2309, NFPA 780).", c: "" });
    return list;
  }, [data]);

  /* ---------------- styles ---------------- */
  const css = `
  .el-root{ --bg:#12151a; --panel:#1b2028; --panel-2:#222833; --line:#2e3540; --text:#eae7e0; --muted:#8b93a3;
    --amber:#f0a83a; --amber-soft:rgba(240,168,58,0.14); --cyan:#4fc3d9; --green:#4fbd85; --green-soft:rgba(79,189,133,0.14);
    --red:#e2555a; --red-soft:rgba(226,85,90,0.14);
    background:var(--bg); color:var(--text); font-family:'IBM Plex Sans',sans-serif; font-size:14.5px; line-height:1.5;
    display:flex; min-height:100vh; }
  .el-root *{box-sizing:border-box;}
  .el-mono{font-family:'IBM Plex Mono',monospace;}
  #el-sidebar{ width:230px; flex-shrink:0; background:linear-gradient(180deg,#161a20,#12151a); border-right:1px solid var(--line);
    padding:22px 0; display:flex; flex-direction:column; }
  .el-brand{ padding:0 20px 18px 20px; border-bottom:1px solid var(--line); margin-bottom:10px; }
  .el-brand .eyebrow{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.14em; color:var(--amber); text-transform:uppercase; }
  .el-brand h1{ font-family:'Space Grotesk',sans-serif; font-size:19px; margin:6px 0 4px 0; font-weight:700; letter-spacing:-.01em; }
  .el-brand p{ margin:0; font-size:11.5px; color:var(--muted); line-height:1.4; }
  .el-steps{display:flex;flex-direction:column;padding:8px 10px;gap:2px;}
  .el-step-btn{ display:flex; align-items:center; gap:12px; background:transparent; border:none; color:var(--muted);
    text-align:left; padding:11px 12px; border-radius:8px; cursor:pointer; font-family:'IBM Plex Sans',sans-serif; font-size:13.5px; }
  .el-step-btn:hover{background:var(--panel-2);color:var(--text);}
  .el-step-btn.active{background:var(--amber-soft);color:var(--amber);}
  .el-step-num{ font-family:'IBM Plex Mono',monospace; font-size:11px; width:22px;height:22px; border-radius:50%;
    border:1px solid currentColor; display:flex;align-items:center;justify-content:center; flex-shrink:0; opacity:.85; }
  .el-sidebar-foot{ margin-top:auto; padding:14px 20px 4px 20px; border-top:1px solid var(--line); font-size:10.5px; color:var(--muted); }
  .el-main{flex:1;min-width:0;padding:34px 40px 80px 40px;max-width:980px;}
  .el-panel-head{margin-bottom:22px;}
  .el-panel-head .eyebrow{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.14em; color:var(--cyan); text-transform:uppercase; }
  .el-panel-head h2{ font-family:'Space Grotesk',sans-serif; font-size:26px; margin:6px 0 6px 0; font-weight:700; }
  .el-panel-head p{color:var(--muted);max-width:640px;margin:0;}
  .el-card{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:20px 22px; margin-bottom:18px; }
  .el-card h3{ font-family:'Space Grotesk',sans-serif; font-size:15px; margin:0 0 14px 0; font-weight:600; display:flex;align-items:center;gap:8px; }
  .el-dot{width:7px;height:7px;border-radius:50%;background:var(--amber);}
  .el-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .el-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
  @media(max-width:700px){.el-grid2,.el-grid3{grid-template-columns:1fr;}}
  .el-root label{display:block;font-size:12px;color:var(--muted);margin-bottom:6px;}
  .el-root input[type=text], .el-root input[type=number], .el-root select{
    width:100%; background:var(--panel-2); border:1px solid var(--line); color:var(--text); padding:9px 11px;
    border-radius:7px; font-family:'IBM Plex Mono',monospace; font-size:13px; outline:none; }
  .el-root input:focus, .el-root select:focus{border-color:var(--amber);}
  .el-field{margin-bottom:14px;}
  .el-hint{font-size:11px;color:var(--muted);margin-top:5px;}
  .el-inline-radio{display:flex;gap:14px;flex-wrap:wrap;}
  .el-inline-radio label{ display:flex;align-items:center;gap:6px; color:var(--text);font-size:13px;margin-bottom:0;
    background:var(--panel-2);border:1px solid var(--line); padding:7px 12px;border-radius:20px;cursor:pointer; }
  .el-inline-radio input{width:auto;accent-color:var(--amber);}
  .el-check-item{ display:flex;gap:10px;align-items:flex-start; padding:9px 0;border-bottom:1px dashed var(--line); }
  .el-check-item:last-child{border-bottom:none;}
  .el-check-item input{width:auto;margin-top:3px;accent-color:var(--green);}
  .el-check-item span{font-size:13px;color:var(--text);}
  .el-note{ margin-top:10px;padding:10px 12px;background:var(--panel-2); border-left:3px solid var(--cyan);border-radius:6px;font-size:12px;color:var(--muted); }
  .el-btn-primary{ background:var(--amber);color:#181205;border:none; padding:11px 20px;border-radius:8px;font-weight:600;
    font-family:'IBM Plex Sans',sans-serif;font-size:13.5px;cursor:pointer; }
  .el-meter-bar{ position:relative;height:14px;border-radius:7px;overflow:visible;
    background:linear-gradient(90deg,var(--green) 0%,var(--green) 33%,var(--amber) 33%,var(--amber) 66%,var(--red) 66%,var(--red) 100%); }
  .el-meter-needle{ position:absolute;top:-6px;width:2px;height:26px;background:#fff;
    box-shadow:0 0 6px rgba(255,255,255,.7); transition:left .4s ease; }
  .el-meter-scale{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:6px;font-family:'IBM Plex Mono',monospace;}
  .el-readout{ display:flex;align-items:baseline;gap:8px;margin-top:14px; background:var(--panel-2);border:1px solid var(--line);border-radius:8px; padding:14px 16px; }
  .el-readout .val{font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:600;}
  .el-readout .unit{color:var(--muted);font-size:12px;}
  .el-pill{ display:inline-block;padding:5px 12px;border-radius:20px;font-size:11.5px;
    font-family:'IBM Plex Mono',monospace;letter-spacing:.04em;margin-left:auto; }
  .el-pill-green{background:var(--green-soft);color:var(--green);}
  .el-pill-amber{background:var(--amber-soft);color:var(--amber);}
  .el-pill-red{background:var(--red-soft);color:var(--red);}
  .el-table{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px;}
  .el-table th,.el-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);}
  .el-table th{color:var(--muted);font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.05em;}
  .el-table td.val{font-family:'IBM Plex Mono',monospace;}
  .el-rec-list{margin:0;padding-left:0;list-style:none;}
  .el-rec-list li{ padding:9px 12px;margin-bottom:7px;border-radius:7px;font-size:12.5px;
    background:var(--panel-2);border-left:3px solid var(--amber); }
  .el-rec-list li.crit{border-left-color:var(--red);}
  .el-rec-list li.ok{border-left-color:var(--green);}
  @media(max-width:800px){
    .el-root{flex-direction:column;}
    #el-sidebar{width:100%;flex-direction:row;overflow-x:auto;padding:14px;}
    .el-brand,.el-sidebar-foot{display:none;}
    .el-steps{flex-direction:row;padding:0;}
    .el-main{padding:22px 18px 60px 18px;}
  }
  `;

  const Pill = ({ text, kind }: { text: string; kind: string }) => <span className={`el-pill el-pill-${kind}`}>{text}</span>;

  return (
    <div className="el-root">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`}</style>
      <style>{css}</style>



      <aside id="el-sidebar">
        <div className="el-brand">
          <div className="eyebrow">IEC 62305 · IS 3043 aligned</div>
          <h1>EarthLine</h1>
          <p>Earthing audit &amp; lightning protection risk console</p>
        </div>
        <nav className="el-steps">
          {STEPS.map((s) => (
            <button key={s.id} className={`el-step-btn ${tab === s.id ? "active" : ""}`} onClick={() => setTab(s.id)}>
              <span className="el-step-num">{s.num}</span> {s.label}
            </button>
          ))}
        </nav>
        <div className="el-sidebar-foot">Preliminary screening tool. Final protection design must be certified by a qualified electrical / LPS engineer per local code.</div>
      </aside>

      <main className="el-main">
        {tab === "site" && (
          <section>
            <div className="el-panel-head">
              <div className="eyebrow">Step 01</div>
              <h2>Site &amp; climate profile</h2>
              <p>Structure geometry, soil type and climate zone drive every downstream calculation — set these first.</p>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Project</h3>
              <div className="el-grid2">
                <div className="el-field"><label>Site / project name</label><input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="e.g. Riverside Warehouse, Plant 3" /></div>
                <div className="el-field"><label>Location (city, region)</label><input type="text" value={siteLoc} onChange={(e) => setSiteLoc(e.target.value)} placeholder="e.g. Chennai, Tamil Nadu" /></div>
              </div>
              <div className="el-field">
                <label>Occupancy / structure type</label>
                <select value={occIdx} onChange={(e) => setOccIdx(Number(e.target.value))}>
                  {occupancyTypes.map((o, i) => <option key={i} value={i}>{o.name}</option>)}
                </select>
                <div className="el-hint">Determines the target earth resistance and the loss-of-life weighting used in the lightning risk model.</div>
              </div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Structure geometry</h3>
              <div className="el-grid3">
                <div className="el-field"><label>Length L (m)</label><input type="number" value={dimL} min="0" onChange={(e) => setDimL(e.target.value)} /></div>
                <div className="el-field"><label>Width W (m)</label><input type="number" value={dimW} min="0" onChange={(e) => setDimW(e.target.value)} /></div>
                <div className="el-field"><label>Height H (m)</label><input type="number" value={dimH} min="0" onChange={(e) => setDimH(e.target.value)} /></div>
              </div>
              <div className="el-field">
                <label>Location factor Cd — surroundings</label>
                <select value={cd} onChange={(e) => setCd(e.target.value)}>
                  <option value="0.25">Surrounded by taller structures/trees</option>
                  <option value="0.5">Surrounded by structures of same or smaller height</option>
                  <option value="1">Isolated — no other objects nearby</option>
                  <option value="2">Isolated, on a hilltop or knoll</option>
                </select>
              </div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Soil type</h3>
              <div className="el-field">
                <label>Predominant soil at electrode depth</label>
                <select value={soilIdx} onChange={(e) => setSoilIdx(Number(e.target.value))}>
                  {soilTypes.map((s, i) => <option key={i} value={i}>{s.name} ({s.low}–{s.high} Ω·m)</option>)}
                </select>
              </div>
              <div className="el-note"><strong>{data.soil.name}</strong> — typical resistivity {data.soil.low}–{data.soil.high} Ω·m · corrosion risk: {data.soil.corrosion}.<br />{data.soil.note}</div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Climate zone</h3>
              <div className="el-field">
                <label>Climate classification</label>
                <select value={climateIdx} onChange={(e) => setClimateIdx(Number(e.target.value))}>
                  {climateZones.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
                </select>
              </div>
              <div className="el-note"><strong>{data.climate.name}</strong> — seasonal resistivity multiplier ×{data.climate.factor} · corrosion risk: {data.climate.corrosion}.<br />{data.climate.note}</div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Lightning ground flash density</h3>
              <div className="el-inline-radio el-field">
                <label><input type="radio" name="ngMode" checked={ngMode === "direct"} onChange={() => setNgMode("direct")} /> Enter Ng directly</label>
                <label><input type="radio" name="ngMode" checked={ngMode === "td"} onChange={() => setNgMode("td")} /> Derive from thunderstorm days (Td)</label>
              </div>
              <div className="el-grid2">
                {ngMode === "direct" ? (
                  <div className="el-field"><label>Ng — flashes / km² / year</label><input type="number" value={ngDirect} step="0.1" min="0" onChange={(e) => setNgDirect(e.target.value)} /></div>
                ) : (
                  <div className="el-field"><label>Td — thunderstorm days / year (isokeraunic level)</label><input type="number" value={ngTd} min="0" onChange={(e) => setNgTd(e.target.value)} /></div>
                )}
              </div>
              <div className="el-hint">No local data? Typical Ng: temperate inland 1–4, humid subtropical 4–8, tropical monsoon 8–14+. Confirm with national lightning-detection network data where available.</div>
              <div className="el-field" style={{ marginTop: 10 }}>
                <label>Existing lightning protection system (LPS)?</label>
                <select value={lpsClass} onChange={(e) => setLpsClass(e.target.value)}>
                  <option value="none">None installed</option>
                  <option value="4">Class IV (basic)</option>
                  <option value="3">Class III</option>
                  <option value="2">Class II</option>
                  <option value="1">Class I (highest)</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {tab === "earth" && (
          <section>
            <div className="el-panel-head">
              <div className="eyebrow">Step 02</div>
              <h2>Earthing system audit</h2>
              <p>Log electrode configuration, measured resistance and physical inspection findings.</p>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Electrode configuration</h3>
              <div className="el-grid2">
                <div className="el-field">
                  <label>Electrode type</label>
                  <select value={electrodeType} onChange={(e) => setElectrodeType(e.target.value)}>
                    <option>Pipe / rod electrode</option>
                    <option>Plate electrode</option>
                    <option>Strip / buried conductor</option>
                    <option>Earth mat / grid</option>
                    <option>Chemical (GEM / backfill compound) electrode</option>
                  </select>
                </div>
                <div className="el-field"><label>Number of electrodes / pits</label><input type="number" value={electrodeCount} min="1" onChange={(e) => setElectrodeCount(e.target.value)} /></div>
              </div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Measured earth resistance</h3>
              <div className="el-grid3">
                <div className="el-field"><label>Pit 1 reading (Ω)</label><input type="number" step="0.01" value={r1} placeholder="e.g. 3.2" onChange={(e) => setR1(e.target.value)} /></div>
                <div className="el-field"><label>Pit 2 reading (Ω)</label><input type="number" step="0.01" value={r2} placeholder="optional" onChange={(e) => setR2(e.target.value)} /></div>
                <div className="el-field"><label>Pit 3 reading (Ω)</label><input type="number" step="0.01" value={r3} placeholder="optional" onChange={(e) => setR3(e.target.value)} /></div>
              </div>
              <div className="el-hint">Use fall-of-potential (3-point) or clamp method. Average of entered readings is used below.</div>

              <div className="el-readout">
                <span className="val el-mono">{data.rAvg !== null ? fmt(data.rAvg, 2) : "—"}</span>
                <span className="unit">Ω average measured</span>
                <Pill
                  text={data.rStatus === "nodata" ? "NO READING" : { pass: "COMPLIANT", marginal: "MARGINAL", fail: "NON-COMPLIANT" }[data.rStatus]!}
                  kind={data.rStatus === "pass" ? "green" : data.rStatus === "fail" ? "red" : "amber"}
                />
              </div>
              <div className="el-meter-bar"><div className="el-meter-needle" style={{ left: `${data.needlePct}%` }}></div></div>
              <div className="el-meter-scale"><span>0Ω</span><span>Target {fmt(data.target, 1)}Ω</span><span>{fmt(data.scaleMax, 0)}Ω</span></div>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Physical inspection checklist</h3>
              {checklistItems.map((t, i) => (
                <div className="el-check-item" key={i}>
                  <input type="checkbox" checked={checks[i]} onChange={() => toggleCheck(i)} />
                  <span>{t}</span>
                </div>
              ))}
              <div className="el-readout">
                <span className="val el-mono">{fmt(data.checklistPct, 0)}</span>
                <span className="unit">% items compliant</span>
              </div>
            </div>
          </section>
        )}

        {tab === "strike" && (
          <section>
            <div className="el-panel-head">
              <div className="eyebrow">Step 03</div>
              <h2>Lightning protection risk assessment</h2>
              <p>Simplified risk screening aligned to the IEC 62305-2 method (collection area → expected strikes → risk R1 vs. tolerable risk).</p>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Collection area &amp; expected strikes</h3>
              <table className="el-table">
                <tbody>
                  <tr><th>Equivalent collection area (Ad)</th><td className="val">{fmt(data.Ad, 0)} m²</td></tr>
                  <tr><th>Ground flash density (Ng)</th><td className="val">{fmt(data.Ng, 2)} /km²/yr</td></tr>
                  <tr><th>Location factor (Cd)</th><td className="val">{data.Cd}</td></tr>
                  <tr><th>Expected annual strikes (Nd)</th><td className="val">{fmt(data.Nd, 4)} /yr</td></tr>
                </tbody>
              </table>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Risk comparison</h3>
              <div className="el-readout">
                <span className="val el-mono">{data.R1.toExponential(2)}</span>
                <span className="unit">R1 — risk of loss of human life</span>
                <Pill
                  text={data.lightningOverall === "pass" ? "WITHIN TOLERABLE RISK" : data.lightningOverall === "fail" ? "HIGH RISK" : "EXCEEDS TOLERABLE RISK"}
                  kind={data.lightningOverall === "pass" ? "green" : data.lightningOverall === "fail" ? "red" : "amber"}
                />
              </div>
              <div className="el-meter-bar"><div className="el-meter-needle" style={{ left: `${data.riskNeedlePct}%` }}></div></div>
              <div className="el-meter-scale"><span>Below RT</span><span>RT = 1×10⁻⁵</span><span>10× RT</span></div>
              <table className="el-table" style={{ marginTop: 16 }}>
                <tbody>
                  <tr><th>Tolerable risk (RT)</th><td className="val">1 × 10⁻⁵ / year</td></tr>
                  <tr><th>Required protection efficiency (E)</th><td className="val">{data.effText}</td></tr>
                  <tr><th>Recommended protection level</th><td className="val">{data.lplText}</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "report" && (
          <section>
            <div className="el-panel-head">
              <div className="eyebrow">Step 04</div>
              <h2>Consolidated audit report</h2>
              <p>Summary for the site file. Recalculates live from the previous three steps.</p>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Site summary</h3>
              <table className="el-table">
                <tbody>
                  <tr><th>Site</th><td className="val">{siteName || "(unnamed site)"}</td></tr>
                  <tr><th>Location</th><td className="val">{siteLoc || "(location not entered)"}</td></tr>
                  <tr><th>Occupancy</th><td className="val">{data.occ.name}</td></tr>
                  <tr><th>Dimensions (L×W×H)</th><td className="val el-mono">{data.L} × {data.W} × {data.H} m</td></tr>
                  <tr><th>Soil type</th><td className="val">{data.soil.name}</td></tr>
                  <tr><th>Climate zone</th><td className="val">{data.climate.name}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Earthing audit result</h3>
              <table className="el-table">
                <tbody>
                  <tr><th>Average measured resistance</th><td className="val el-mono">{data.rAvg !== null ? `${fmt(data.rAvg, 2)} Ω` : "not recorded"}</td></tr>
                  <tr><th>Target resistance</th><td className="val el-mono">{fmt(data.target, 1)} Ω</td></tr>
                  <tr><th>Inspection checklist score</th><td className="val el-mono">{fmt(data.checklistPct, 0)}%</td></tr>
                  <tr><th>Overall status</th><td className="val">{statusWord(data.earthOverall)}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Lightning risk result</h3>
              <table className="el-table">
                <tbody>
                  <tr><th>Collection area (Ad)</th><td className="val el-mono">{fmt(data.Ad, 0)} m²</td></tr>
                  <tr><th>Expected annual strikes (Nd)</th><td className="val el-mono">{fmt(data.Nd, 4)}</td></tr>
                  <tr><th>Risk R1</th><td className="val el-mono">{data.R1.toExponential(2)}</td></tr>
                  <tr><th>Tolerable risk RT</th><td className="val el-mono">1 × 10⁻⁵</td></tr>
                  <tr><th>R1 / RT ratio</th><td className="val el-mono">{fmt(data.ratio, 1)}×</td></tr>
                  <tr><th>Recommended protection level</th><td className="val">{data.lplText}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="el-card">
              <h3><span className="el-dot"></span>Recommendations</h3>
              <ul className="el-rec-list">
                {recs.map((r, i) => <li key={i} className={r.c}>{r.t}</li>)}
              </ul>
            </div>

            <div style={{ marginTop: 16 }}>
              <button className="el-btn-primary" onClick={() => window.print()}>Print / Save as PDF</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
