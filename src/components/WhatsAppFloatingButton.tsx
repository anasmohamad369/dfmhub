"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  const whatsappUrl =
    "https://wa.me/919483564777?text=" +
    encodeURIComponent("Hello DFMHUB Team, I would like to enquiry about Lightning Protection & Structural Earthing Systems.");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat directly on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all group border border-emerald-400/40"
      title="Chat on WhatsApp Directly"
    >
      <MessageCircle className="w-6 h-6 fill-white/20 animate-bounce" />
      <span className="hidden sm:inline-block font-extrabold text-xs tracking-wider uppercase">
        WhatsApp Us
      </span>
    </a>
  );
}
