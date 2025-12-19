import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbo Cricket League - From Gully to Glory",
  description:
    "Join Turbo Cricket League, India's fastest-growing grassroots cricket platform. Register for trials, get scouted, and earn franchise contracts worth up to ₹5 Lakhs.",
  keywords:
    "cricket trials, cricket registration, cricket league, Turbo Cricket League, player auction, cricket talent hunt",
  openGraph: {
    title: "Turbo Cricket League - From Gully to Glory",
    description:
      "Nationwide player hunt for U16, U19, U21, and U23 cricketers. Your journey to professional cricket starts here.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-background text-white min-h-screen flex flex-col">
          <PreHeader />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
