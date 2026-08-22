import React from "react";
import EarthLineApp from "@/components/EarthLineApp";

export const metadata = {
  title: "EarthLine Dashboard | DFMHUB",
  description: "Earthing audit & lightning protection risk console.",
};

export default function DashboardPage() {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#12151a]">
      <EarthLineApp />
    </div>
  );
}
