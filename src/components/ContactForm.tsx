"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Left Column: Heading & Info */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
            TALK TO AN ENGINEER
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Send your drawings. Get a compliant system design back.
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Share roof plans, structure height and soil data — our team returns a risk assessment summary, air termination or earthing layout, bill of materials and a fixed-price proposal.
        </p>

        <ul className="space-y-3 pt-2">
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Risk assessment to IS/IEC 62305-2</span>
          </li>
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>IEC 62561 type-tested ARK Make components</span>
          </li>
          <li className="flex items-center text-xs sm:text-sm font-semibold text-slate-700 space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Installation, testing and documented handover</span>
          </li>
        </ul>
      </div>

      {/* Right Column: Form Card */}
      <div className="lg:col-span-7">
        {submitted ? (
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you for reaching out. Our engineering team will review your project requirements and get back to you within 1 working day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-slate-900 text-white text-xs font-bold uppercase px-6 py-2.5 rounded hover:bg-slate-800 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-slate-100 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Organisation"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project city
                </label>
                <input
                  type="text"
                  placeholder="Bengaluru / Chennai / ..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Requirement
                </label>
                <select
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                >
                  <option value="Lightning Protection System">Lightning Protection System</option>
                  <option value="Structural Earthing">Structural Earthing</option>
                  <option value="Complete LPS + Earthing Package">Complete LPS + Earthing Package</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Project details
              </label>
              <textarea
                rows={4}
                placeholder="Building type, height, roof area, soil conditions, timeline..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all tracking-wider"
            >
              REQUEST DESIGN CONSULTATION
            </button>

            <p className="text-[11px] text-slate-400 text-center pt-1">
              Typical response within one working day. Your details are used only to respond to this enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

