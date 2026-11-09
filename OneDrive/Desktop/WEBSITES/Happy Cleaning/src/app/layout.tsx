import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AiAssistant } from "@/components/AiAssistant";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Laundry & Cleaning in Sege-Ada`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "laundry Sege-Ada",
    "laundry Ada Ghana",
    "dry cleaning Sege-Ada",
    "carpet cleaning Ghana",
    "ironing services Sege-Ada",
    "Happy Cleaning Services",
    "laundry pickup and delivery Ghana",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Laundry & Cleaning in Sege-Ada`,
    description: site.description,
    images: [
      {
        url: "/images/photos/hero-housekeeper.jpg",
        width: 1600,
        height: 1067,
        alt: "Fresh towels being carefully folded by a housekeeper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Laundry & Cleaning in Sege-Ada`,
    description: site.description,
    images: ["/images/photos/hero-housekeeper.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#163d33",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/photos/hero-housekeeper.jpg`,
  description: site.description,
  telephone: "+233558184521",
  email: site.email,
  priceRange: "Quote on request",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sege-Ada",
    addressLocality: "Sege",
    addressRegion: "Greater Accra",
    addressCountry: "GH",
  },
  areaServed: {
    "@type": "Place",
    name: "Sege-Ada, Greater Accra, Ghana",
  },
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <AiAssistant />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
