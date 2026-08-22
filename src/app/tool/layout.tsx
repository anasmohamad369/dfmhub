import React from "react";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "ARK-Guard Engineering Console | DFMHUB",
  description:
    "IS/IEC 62305 & IS 3043 Compliant Earthing & Lightning Protection Engineering Console.",
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="font-poppins min-h-screen">{children}</div>
    </AuthGuard>
  );
}
