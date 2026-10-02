import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { brandConfig } from "@/data/brandConfig";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Inter_Tight({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${brandConfig.brandName} — See it. Wear it. Virtually.`,
  description:
    "Choose a garment, upload your photo and discover how it looks on you with AI-powered virtual try-on.",
};

export const viewport: Viewport = {
  themeColor: brandConfig.colors.background,
};

const { colors } = brandConfig;
const brandVars = {
  "--brand-bg": colors.background,
  "--brand-surface": colors.surface,
  "--brand-primary": colors.primary,
  "--brand-secondary": colors.secondary,
  "--brand-border": colors.border,
  "--brand-dark": colors.dark,
  "--brand-accent": colors.accent,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} antialiased`}
      style={brandVars}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
