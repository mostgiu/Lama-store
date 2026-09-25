import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { LanguageProvider } from "@/components/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Trend Lama | Modern Everyday Fashion",
    template: "%s | Trend Lama",
  },
  description:
    "Shop modern everyday fashion at Trend Lama. Discover comfortable clothing, sneakers, and versatile essentials for your style.",
  keywords: [
    "Trend Lama",
    "online fashion store",
    "everyday clothing",
    "sneakers",
    "hoodies",
    "t-shirts",
  ],
  openGraph: {
    type: "website",
    siteName: "Trend Lama",
    title: "Trend Lama | Modern Everyday Fashion",
    description:
      "Discover comfortable clothing, sneakers, and modern everyday essentials at Trend Lama.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trend Lama | Modern Everyday Fashion",
    description:
      "Discover comfortable clothing, sneakers, and modern everyday essentials at Trend Lama.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
