import type { Metadata, Viewport } from "next";
import {
  DM_Mono,
  Special_Gothic,
  Special_Gothic_Condensed_One,
} from "next/font/google";

import {
  COLOR_SCHEME_SCRIPT,
  ColorSchemeSync,
} from "@/components/color-scheme";
import { AppShell } from "@/components/app-shell";
import { TooltipProvider } from "@/design-system";

import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const specialGothic = Special_Gothic({
  variable: "--font-special",
  subsets: ["latin"],
  weight: ["400", "500"],
  adjustFontFallback: false,
});

const specialGothicCondensed = Special_Gothic_Condensed_One({
  variable: "--font-special-condensed",
  subsets: ["latin"],
  weight: "400",
  adjustFontFallback: false,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Pickup — Bengaluru",
  description:
    "Buy and sell secondhand nearby. Choose delivery and a neighbor brings it to you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#deedf2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1f22" },
  ],
};

export default function RootLayout({
  children,
  sheet,
}: LayoutProps<"/"> & { sheet?: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${specialGothic.variable} ${specialGothicCondensed.variable} ${dmMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: COLOR_SCHEME_SCRIPT }}
        />
      </head>
      <body className="relative flex h-dvh flex-col overflow-hidden bg-background text-foreground">
        <ColorSchemeSync />
        <TooltipProvider>
          <AppShell>{children}</AppShell>
          {sheet}
        </TooltipProvider>
      </body>
    </html>
  );
}
