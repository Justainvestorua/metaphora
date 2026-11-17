import localFont from "next/font/local";
import { Onest } from "next/font/google";
import "../globals.css";
import "../cinematic.css";
import "../site.css";
import "../legal.css";
import { SITE } from "@/lib/content";
import { contractMarkup } from "@/lib/contract";

/* Ukrainian runs on Onest: Chillax, used by the Latin locales, contains no
   Cyrillic at all. Outfit still carries the wordmark, which is Latin. */

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="uk" className={`${onest.variable} ${outfit.variable}`} data-face="onest">
      <body>
        <div hidden data-direction-contract dangerouslySetInnerHTML={contractMarkup} />
        {children}
      </body>
    </html>
  );
}
