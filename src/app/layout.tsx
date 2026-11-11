import type { Metadata } from "next";
import { Caveat, Fraunces, Noto_Nastaliq_Urdu, Source_Sans_3 } from "next/font/google";

import { StoreChrome } from "@/components/layout/store-chrome";
import { LocaleProvider } from "@/lib/locale";
import { brandName } from "@/lib/utils";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "600", "700"],
  display: "swap",
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brandName} — Handmade crochet gifts in Pakistan`,
    template: `%s · ${brandName}`,
  },
  description:
    "Handmade crochet gifts, bouquets, baby sets, and custom pieces. Cash on delivery across Pakistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${display.variable} ${sans.variable} ${script.variable} ${urdu.variable}`}
    >
      <body className="font-sans antialiased">
        <LocaleProvider>
          <StoreChrome>{children}</StoreChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
