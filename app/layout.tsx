import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Rajdhani, Work_Sans } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
variable: '--font-rajdhani',
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
variable: '--font-work-sans',
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: 'PaceShift — Performance Gear',
  description: "PaceShift is a performance gear house for athletes who don't compromise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${workSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

