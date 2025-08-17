import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { domain } from "@/paths";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMC Catalogue",
  description: "Browse our comprehensive catalogue",

  // Basic favicon setup
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon_io/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon_io/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon_io/apple-touch-icon.png",
    },
  ],

  // Open Graph metadata for social media embeds
  openGraph: {
    title: "TMC Catalogue",
    description: "Browse our comprehensive catalogue",
    url: domain(),
    siteName: "TMC Catalogue",
    images: [
      {
        url: "/logo.png", // Just your logo
        width: 800,
        height: 800,
        alt: "TMC Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary", // Use "summary" for square logo images
    title: "TMC Catalogue",
    description: "Browse our comprehensive catalogue of products and services",
    images: ["/logo.png"], // Just your logo
    creator: "@your_twitter_handle", // Optional: replace with your Twitter handle
  },

  // Additional metadata
  metadataBase: new URL(domain()),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body className="font-space-grotesk antialiased bg-background pb-[71px] md:pb-0">
        <SearchModal />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Only enable analytics in production */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
