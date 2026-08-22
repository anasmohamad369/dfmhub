import React from "react";

export const metadata = {
  title: "Project Registration | DFMHUB",
  description: "Register your engineering project for earthing & lightning protection audit.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins min-h-screen">{children}</div>;
}
