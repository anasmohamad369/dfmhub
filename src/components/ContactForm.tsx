"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    requirement: "Lightning Protection System",
    details: "",
  });

  const handleWhatsAppSend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "dfm_user_info",
          JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            company: formData.company,
            location: formData.city,
          })
        );
      }
    } catch (err) {}

    // Save Lead to Database
    try {
      await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.company || "Individual Enquiry",
          phoneNumber: formData.phone,
          email: formData.email,
          location: formData.city,
          requirement: formData.requirement,
          source: "WEBSITE_CONTACT",
          status: "NEW",
          remarks: formData.details,
        }),
      });
    } catch (err) {
      console.warn("Background lead save warning:", err);
    }

    const text = `*New DFMHUB Project Consultation Enquiry* ⚡

*Name:* ${formData.fullName || "Not provided"}
*Company:* ${formData.company || "Not provided"}
*Phone:* ${formData.phone || "Not provided"}
*Email:* ${formData.email || "Not provided"}
*Project City:* ${formData.city || "Not provided"}
*Requirement:* ${formData.requirement}
*Project Details:* ${formData.details || "None provided"}

_Sent directly from DFMHUB Website_`;

    const whatsappUrl = `https://wa.me/919483564777?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Left Column: Heading & Info */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest block mb-2">
            ARK MAKE BY DFMHUB — ENGINEERING-LED LIGHTNING PROTECTION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Send DFMHUB your:
          </h2>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-amber-300 leading-relaxed">
          Project location + building dimensions + height + roof plan + electrical layout + project specification.
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          The engineering team can review the project requirements and recommend the appropriate LPS design, ARK components and BOQ.
        </p>

        <ul className="space-y-3 pt-2">
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Risk assessment to IS/IEC 62305-2</span>
          </li>
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>IEC 62561 type-tested ARK Make components</span>
          </li>
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Direct instant response on WhatsApp</span>
          </li>
        </ul>
      </div>

      {/* Right Column: Form Card */}
      <div className="lg:col-span-7">
        {submitted ? (
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enquiry Ready on WhatsApp!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your details have been pre-filled. If WhatsApp did not open automatically, click the button below to send your enquiry.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppSend}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase px-6 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleWhatsAppSend}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Organisation"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project city
                </label>
                <input
                  type="text"
                  placeholder="Bengaluru / Chennai / ..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Requirement
                </label>
                <select
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 outline-none transition-all cursor-pointer"
                >
                  <option value="Lightning Protection System" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Lightning Protection System</option>
                  <option value="Structural Earthing" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Structural Earthing</option>
                  <option value="Complete LPS + Earthing Package" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Complete LPS + Earthing Package</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Project details
              </label>
              <textarea
                rows={4}
                placeholder="Building type, height, roof area, soil conditions, timeline..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase py-3.5 px-6 rounded-xl transition-all tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>SEND ENQUIRY DIRECTLY VIA WHATSAPP</span>
            </button>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center pt-1">
              Submitting pre-fills your enquiry in WhatsApp and opens a direct chat with our engineering team.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
