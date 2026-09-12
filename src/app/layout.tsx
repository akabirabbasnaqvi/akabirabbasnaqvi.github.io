import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

const siteUrl = "https://akabirabbas.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akabir Abbas | AI/ML and Software Engineer",
    template: "%s | Akabir Abbas",
  },
  description:
    "Akabir Abbas is an AI/ML and Software Engineer building practical AI automation, machine learning, data, desktop, and web systems.",
  applicationName: "Akabir Abbas Portfolio",
  authors: [{ name: "Akabir Abbas", url: siteUrl }],
  creator: "Akabir Abbas",
  category: "Technology",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-a.svg", type: "image/svg+xml" },
      { url: "/favicon-a.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon-a.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Akabir Abbas",
    title: "Akabir Abbas | AI/ML and Software Engineer",
    description: "Applied AI, ML, automation, and software systems built for real operational work.",
  },
  twitter: {
    card: "summary",
    title: "Akabir Abbas | AI/ML and Software Engineer",
    description: "Applied AI, ML, automation, and software systems built for real operational work.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0ed" },
    { media: "(prefers-color-scheme: dark)", color: "#101827" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
