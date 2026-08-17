"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Copy,
  Check,
  Clock,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export interface LocationData {
  id: string;
  city: string;
  tag: string;
  name: string;
  address: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  hours: string;
  embedQuery: string;
  directionsUrl: string;
  lat: number;
  lng: number;
}

export const locations: LocationData[] = [
  {
    id: "bengaluru",
    city: "Bengaluru",
    tag: "Headquarters & Manufacturing Plant",
    name: "DFMHUB Systems HQ",
    address: "No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya Bengaluru -560079",
    phone: "+91 94835 64777",
    whatsappPhone: "919483564777",
    email: "partner@dfmhub.com",
    hours: "Mon - Sat: 9:00 AM - 7:00 PM IST (24/7 Emergency Technical Line)",
    embedQuery: "Kamakshipalya+Industrial+area+Bengaluru+560079",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Pette+chennapa+Industrial+area+Kamakshipalya+Bengaluru+560079",
    lat: 12.986,
    lng: 77.525,
  },
];

export default function InteractiveMap() {
  const selectedLoc = locations[0];
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const whatsappUrl = `https://wa.me/${selectedLoc.whatsappPhone}?text=${encodeURIComponent(
    "Hello DFMHUB Team, I would like to enquire about Lightning Protection & Structural Earthing Systems."
  )}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  // Standard public Google Maps embed URL (Zero API key required)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${selectedLoc.embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
      {/* Header Bar */}
      <div className="bg-[#081021] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <MapPin className="w-4 h-4" />
              <span>Headquarters & Manufacturing Facility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              DFMHUB Bengaluru Location
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase px-4 py-2.5 rounded-lg shadow-md transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Directly</span>
            </a>
            <a
              href={selectedLoc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase px-4 py-2.5 rounded-lg shadow-md transition-all shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Map Embed + Active Office Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 7 Columns: Embedded Google Map (No API Key Required) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-slate-100 dark:bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <iframe
            title={`Map location of DFMHUB ${selectedLoc.name}`}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "380px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
          />
          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-lg shadow-lg border border-slate-700 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{selectedLoc.name}</span>
          </div>
        </div>

        {/* Right 5 Columns: Location Contact Info Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="space-y-5">
            <div>
              <span className="inline-block text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-900 mb-2 uppercase tracking-wide">
                {selectedLoc.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedLoc.name}
              </h3>
            </div>

            {/* Address */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Physical Address</span>
                </span>
                <button
                  onClick={() => copyToClipboard(selectedLoc.address, "address")}
                  className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors capitalize text-[11px] font-semibold"
                  title="Copy Address"
                >
                  {copiedField === "address" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs">
                {selectedLoc.address}
              </p>
            </div>

            {/* WhatsApp & Direct Phone */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Direct Phone & WhatsApp</span>
                </span>
                <button
                  onClick={() => copyToClipboard(selectedLoc.phone, "phone")}
                  className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors capitalize text-[11px] font-semibold"
                  title="Copy Phone"
                >
                  {copiedField === "phone" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${selectedLoc.phone.replace(/\s+/g, "")}`}
                    className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {selectedLoc.phone}
                  </a>
                  <a
                    href={`tel:${selectedLoc.phone.replace(/\s+/g, "")}`}
                    className="text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded transition-colors"
                  >
                    Call Now
                  </a>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Click Here to Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>Technical & Sales Email</span>
                </span>
                <button
                  onClick={() => copyToClipboard(selectedLoc.email, "email")}
                  className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors capitalize text-[11px] font-semibold"
                  title="Copy Email"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${selectedLoc.email}`}
                className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs transition-colors"
              >
                {selectedLoc.email}
              </a>
            </div>

            {/* Hours */}
            <div className="space-y-1.5">
              <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Operating Hours</span>
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-xs">
                {selectedLoc.hours}
              </p>
            </div>
          </div>

          {/* Standards / Quality Assurance Tag */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center text-amber-600 dark:text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 mr-1 text-amber-500" />
              IS/IEC 62305 & IS 3043 Compliant
            </span>
            <span className="text-[11px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-bold">
              ARK MAKE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
