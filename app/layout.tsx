import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Rajdhani, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/layout/cart/CartDrawer";
import Script from "next/script";

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
      <head>
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7Q3CTDK');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7Q3CTDK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

