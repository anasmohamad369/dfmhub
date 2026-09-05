import React from "react";

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
    <div className="font-poppins min-h-screen">
      <style>{`footer { display: none !important; }`}</style>
      {children}
    </div>
  );
}
