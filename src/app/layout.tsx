import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dfmhub.vercel.app"),
  title: {
    default: "ARK Make Lightning Protection & Earthing Systems | DFMHUB",
    template: "%s | DFMHUB",
  },
  description:
    "DFMHUB is India's premier manufacturer of ARK Make Lightning Protection and Structural Earthing Systems in Bengaluru. Engineered to IS 3043 & IEC 62305 standards. Connect with our pan-India dealer network for reliable B2B procurement.",
  keywords: [
    "Lightning Protection System manufacturer in India",
    "Structural Earthing System manufacturer",
    "ARK Make earthing products",
    "DFMHUB lightning protection",
    "Copper bonded earth rods manufacturer",
  ],
  authors: [{ name: "DFMHUB Technical Team", url: "https://dfmhub.vercel.app" }],
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
    url: "https://dfmhub.vercel.app",
    siteName: "DFMHUB Systems",
    title: "ARK Make Lightning Protection & Earthing Systems | DFMHUB",
    description:
      "DFMHUB is India's premier manufacturer of ARK Make Lightning Protection and Structural Earthing Systems in Bengaluru. Engineered to IS 3043 & IEC 62305 standards. Connect with our pan-India dealer network for reliable B2B procurement.",
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
    title: "ARK Make Lightning Protection & Earthing Systems | DFMHUB",
    description:
      "DFMHUB is India's premier manufacturer of ARK Make Lightning Protection and Structural Earthing Systems in Bengaluru.",
    images: ["/images/lps-hero.png"],
  },
  alternates: {
    canonical: "https://dfmhub.vercel.app",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dfmhub.vercel.app/#organization",
      name: "DFMHUB Systems",
      alternateName: ["DFM HUB", "DFMHUB", "DFM HUB Systems", "DFMHUB Engineering", "DFM HUB ARK Make"],
      url: "https://dfmhub.vercel.app",
      logo: "https://dfmhub.vercel.app/images/logo.png",
      description:
        "DFMHUB (DFM HUB) is a manufacturer of ARK Make lightning protection systems and structural earthing components compliant with IS/IEC 62305 and IS 3043.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560079",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-94835-64777",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://dfmhub.vercel.app/#localbusiness",
      name: "DFMHUB (DFM HUB) Engineering",
      alternateName: ["DFM HUB", "DFMHUB"],
      url: "https://dfmhub.vercel.app",
      telephone: "+91-94835-64777",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560079",
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
      "@id": "https://dfmhub.vercel.app/#website",
      url: "https://dfmhub.vercel.app",
      name: "DFMHUB (DFM HUB)",
      alternateName: ["DFM HUB", "DFMHUB"],
      description: "Official site of DFMHUB (DFM HUB) — IS/IEC 62305 & IS 3043 compliant lightning protection and structural earthing systems.",
      publisher: {
        "@id": "https://dfmhub.vercel.app/#organization",
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
          <WhatsAppFloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
