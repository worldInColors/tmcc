import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMC Catalogue",
  description:
    "Browse our comprehensive catalogue of Minecraft technical designs",
  keywords: [
    "Minecraft",
    "technical",
    "designs",
    "catalogue",
    "redstone",
    "farms",
  ],
  authors: [{ name: "TMC Team" }],
  openGraph: {
    title: "TMC Catalogue",
    description:
      "Browse our comprehensive catalogue of Minecraft technical designs",
    url: "https://tmcc.dev",
    siteName: "TMC Catalogue",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMC Catalogue",
    description:
      "Browse our comprehensive catalogue of Minecraft technical designs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body className="font-space-grotesk antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
