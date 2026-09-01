import type { Metadata } from "next";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akabir Abbas | AI and Software Engineer",
  description:
    "Akabir Abbas builds practical AI, data, desktop, and web systems for complex operational work.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
