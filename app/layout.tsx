import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Plan Nuclear Argentino",
  description: "El futuro es nuclear.",
  openGraph: {
    title: "Plan Nuclear Argentino",
    description: "El futuro es nuclear.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={space.variable}>{children}</body>
    </html>
  );
}