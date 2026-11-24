import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jashn Tickets",
    template: "%s | Jashn Tickets",
  },
  description:
    "Discover events and book your next experience across Islamabad and Rawalpindi.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          className="absolute left-3 top-3 z-50 -translate-y-24 rounded-md bg-paper px-4 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
