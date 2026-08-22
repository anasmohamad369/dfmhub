import React from "react";

export const metadata = {
  title: "Admin Console | DFMHUB",
  description: "DFMHUB Restricted Admin Console.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins min-h-screen">{children}</div>;
}
