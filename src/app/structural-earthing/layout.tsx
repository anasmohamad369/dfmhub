import type { Metadata } from "next";

const structuralEarthingVerification =
  process.env.NEXT_PUBLIC_STRUCTURAL_EARTHING_GSC ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "google-site-verification-structural-earthing";

export const metadata: Metadata = {
  title: "Structural Earthing Systems | IS 3043 & IEC 62305 Compliant",
  description:
    "Explore high-performance structural earthing systems, copper-bonded conductors, earth pits, and calculation tools designed for industrial and commercial projects across India.",
  verification: {
    google: structuralEarthingVerification,
  },
  alternates: {
    canonical: "https://dfmhub.vercel.app/structural-earthing",
  },
};

export default function StructuralEarthingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
