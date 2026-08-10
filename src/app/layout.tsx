import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dfmhub.in"),
  title: {
    default: "DFMHUB | IS/IEC 62305 & IS 3043 Lightning Protection & Structural Earthing Manufacturer",
    template: "%s | DFMHUB",
  },
  description:
    "DFMHUB is a leading manufacturer of ARK Make lightning protection systems and structural earthing products — IS/IEC 62305 and IS 3043 design, supply, installation and testing across Bengaluru, Chennai, Hyderabad, Pune and India.",
  keywords: [
    "lightning protection system",
    "structural earthing",
    "ARK Make",
    "IS/IEC 62305",
    "IS 3043",
    "earth resistance testing",
    "surge protection device",
    "copper bonded rods",
    "exothermic welding",
    "Bengaluru earthing",
    "Chennai lightning protection",
    "Hyderabad earthing",
    "Pune lightning protection",
    "rolling sphere method",
    "fall of potential test",
  ],
  authors: [{ name: "DFMHUB Technical Team", url: "https://dfmhub.in" }],
  creator: "DFMHUB Systems",
  publisher: "DFMHUB Engineering",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dfmhub.in",
    siteName: "DFMHUB Systems",
    title: "DFMHUB | IS/IEC 62305 & IS 3043 Lightning Protection & Structural Earthing",
    description:
      "ARK Make components, risk assessments, foundation rebar bonding, copper bonded rods, surge protection, and earth resistance testing for commercial and industrial facilities.",
    images: [
      {
        url: "/images/lps-hero.png",
        width: 1200,
        height: 630,
        alt: "DFMHUB Lightning Protection & Structural Earthing Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DFMHUB | Lightning Protection & Structural Earthing Systems",
    description:
      "IS/IEC 62305 & IS 3043 compliant lightning protection and earthing systems manufactured and installed across India.",
    images: ["/images/lps-hero.png"],
  },
  alternates: {
    canonical: "https://dfmhub.in",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dfmhub.in/#organization",
      name: "DFMHUB Systems",
      url: "https://dfmhub.in",
      logo: "https://dfmhub.in/images/logo.png",
      description:
        "Manufacturer of ARK Make lightning protection systems and structural earthing components compliant with IS/IEC 62305 and IS 3043.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Peenya Industrial Area",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560058",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-98860-00000",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://dfmhub.in/#localbusiness",
      name: "DFMHUB Engineering",
      url: "https://dfmhub.in",
      telephone: "+91-98860-00000",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Peenya Industrial Area",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560058",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.032,
        longitude: 77.525,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://dfmhub.in/#website",
      url: "https://dfmhub.in",
      name: "DFMHUB",
      description: "IS/IEC 62305 & IS 3043 compliant lightning protection and structural earthing systems.",
      publisher: {
        "@id": "https://dfmhub.in/#organization",
      },
    },
  ],
};

const themeScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
