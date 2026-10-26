import type { Metadata, Viewport } from "next";
import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFDE9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pajama-avatar.vercel.app"),
  title: "День піжам 2026 — «Дім Рональда МакДональда Україна»",
  description:
    "Коли діти хворіють у лікарнях, вони весь день проводять у піжамі. Одягаємо піжаму не для сну, а для підтримки! Долучайся до Всеукраїнського Дня Піжам: створи онлайн-піжаму, замовляй благодійний мерч та візьми участь у розіграші подарунків за донат від 50 ₴ на Дім Рональда.",
  keywords: [
    "День Піжам 2026",
    "День Піжам",
    "Дім Рональда МакДональда",
    "РМХК Україна",
    "Благодійність",
    "Благодійний мерч",
    "13 листопада",
    "Охматдит",
  ],
  authors: [{ name: "БО «Дім Рональда МакДональда в Україні»" }],
  openGraph: {
    title: "День піжам 2026 — Дім Рональда МакДональда Україна 🧸",
    description:
      "Одягаємо піжаму не для сну, а для підтримки! Створюй онлайн-піжаму, обирай благодійний мерч та підтримай будівництво першого Дому Рональда МакДональда в Україні.",
    url: "https://pajama-avatar.vercel.app",
    siteName: "БО «Дім Рональда МакДональда в Україні»",
    images: [
      {
        url: "https://pajama-avatar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "День піжам 2026 — Дім Рональда МакДональда Україна",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "День піжам 2026 — Дім Рональда МакДональда Україна 🧸",
    description:
      "Одягаємо піжаму не для сну, а для підтримки! Створюй онлайн-піжаму, обирай благодійний мерч та підтримай будівництво Дому Рональда.",
    images: ["https://pajama-avatar.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

import { CartProvider } from "@/lib/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${raleway.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-montserrat antialiased bg-[#FFFDE9] text-[#1F2124] selection:bg-[#FFBC0D]/40">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
