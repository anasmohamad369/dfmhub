import React from "react";

export const metadata = {
  title: "EarthLine Dashboard | DFMHUB",
  description: "Earthing audit & lightning protection risk console.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins min-h-screen">{children}</div>;
}
