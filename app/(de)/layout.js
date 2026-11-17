import localFont from "next/font/local";
import "../globals.css";
import "../cinematic.css";
import "../site.css";
import "../legal.css";
import { SITE } from "@/lib/content";
import { contractMarkup } from "@/lib/contract";

/* Chillax carries the interface in the Latin locales; Outfit is reserved for
   the wordmark, at Thin.

   Chillax ships no Cyrillic — verified against the file, zero glyphs in
   0x0400–0x04FF — so the Ukrainian locale runs a different layout with Onest
   instead. That is why the font is wired per locale rather than globally. */

const chillax = localFont({
  src: "../fonts/Chillax-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-body",
});

const outfit = localFont({
  src: "../fonts/Outfit-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  creator: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="de"
      className={`${chillax.variable} ${outfit.variable}`}
      data-face="chillax"
    >
      <body>
        <div hidden data-direction-contract dangerouslySetInnerHTML={contractMarkup} />
        {children}
      </body>
    </html>
  );
}
