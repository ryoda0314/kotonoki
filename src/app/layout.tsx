import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_JP, Shippori_Mincho } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });
const plexJp = IBM_Plex_Sans_JP({ weight: ["400", "500", "600"], variable: "--font-plex-jp", preload: false });
// The names (ことのき and its apps) in mincho, as each app's wordmark.
const shippori = Shippori_Mincho({ weight: ["700"], variable: "--font-shippori", preload: false });

export const metadata: Metadata = {
  title: `${SITE.name}（${SITE.kanji}）`,
  description: SITE.description,
  openGraph: { title: `${SITE.name}（${SITE.kanji}）`, description: SITE.description, locale: "ja_JP", type: "website" },
  // The picture (opengraph-image.png) large where the page is shared on X as well.
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${plex.variable} ${plexJp.variable} ${shippori.variable}`}>
      <body>{children}</body>
    </html>
  );
}
