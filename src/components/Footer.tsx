import React from "react";
import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] dark:bg-slate-950 text-slate-300 border-t border-slate-800 dark:border-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500/10 p-2 rounded border border-amber-500/30">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight block leading-none">
                  DFMHUB
                </span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  ARK MAKE SYSTEMS
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Manufacturer of ARK Make lightning protection systems and structural earthing products, with design, supply, installation and testing across India.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>IS/IEC 62305 & IS 3043 Certified</span>
            </div>
          </div>

          {/* Column 2: Systems */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Systems & Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/lightning-protection-system"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  Lightning Protection System
                </Link>
              </li>
              <li>
                <Link
                  href="/structural-earthing"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  Structural Earthing
                </Link>
              </li>
              <li>
                <Link
                  href="/installation-services"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  Installation Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  About DFMHUB
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <span className="text-amber-500 mr-2">›</span>
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Locations */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Service Locations
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-white block mb-1">Bengaluru (Karnataka)</span>
                <div className="flex space-x-2 text-slate-400 text-[11px]">
                  <Link href="/lightning-protection-system/bengaluru" className="hover:text-amber-400 underline">LPS</Link>
                  <span>|</span>
                  <Link href="/structural-earthing/bengaluru" className="hover:text-amber-400 underline">Earthing</Link>
                </div>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">Chennai (Tamil Nadu)</span>
                <div className="flex space-x-2 text-slate-400 text-[11px]">
                  <Link href="/lightning-protection-system/chennai" className="hover:text-amber-400 underline">LPS</Link>
                  <span>|</span>
                  <Link href="/structural-earthing/chennai" className="hover:text-amber-400 underline">Earthing</Link>
                </div>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">Hyderabad (Telangana)</span>
                <div className="flex space-x-2 text-slate-400 text-[11px]">
                  <Link href="/lightning-protection-system/hyderabad" className="hover:text-amber-400 underline">LPS</Link>
                  <span>|</span>
                  <Link href="/structural-earthing/hyderabad" className="hover:text-amber-400 underline">Earthing</Link>
                </div>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">Pune (Maharashtra)</span>
                <div className="flex space-x-2 text-slate-400 text-[11px]">
                  <Link href="/lightning-protection-system/pune" className="hover:text-amber-400 underline">LPS</Link>
                  <span>|</span>
                  <Link href="/structural-earthing/pune" className="hover:text-amber-400 underline">Earthing</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Direct Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919886000000" className="hover:text-amber-400 font-semibold text-white">
                    +91 98860 00000
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:sales@dfmhub.in" className="hover:text-amber-400">
                    sales@dfmhub.in
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Industrial Area, Peenya, Bengaluru, Karnataka 560058, India
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Mon-Sat, 9:00 AM - 7:00 PM IST
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} DFMHUB Engineering. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded text-amber-400 border border-slate-700">ARK Make</span>
            <span>·</span>
            <span>IS/IEC 62305</span>
            <span>·</span>
            <span>IS 3043</span>
            <span>·</span>
            <span>IEC 62561</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
