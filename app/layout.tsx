import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FAF6EB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pajama-avatar.vercel.app"),
  title: "Всеукраїнський День Піжам 13 листопада | Дім Рональда МакДональда",
  description:
    "Одягаємо піжаму не для сну, а для підтримки! Долучайся до Всеукраїнського Дня Піжам: створи онлайн-піжаму, замовляй благодійний мерч та візьми участь у розіграші подарунків за донат від 50 ₴ на Дім Рональда.",
  keywords: [
    "День Піжам",
    "Дім Рональда МакДональда",
    "РМХК Україна",
    "Благодійність",
    "Благодійний мерч",
    "13 листопада",
  ],
  authors: [{ name: "Фундація Дім Рональда МакДональда в Україні" }],
  openGraph: {
    title: "13 листопада — Всеукраїнський День Піжам 🧸",
    description:
      "Одягаємо піжаму не для сну, а для підтримки! Створюй онлайн-піжаму, обирай благодійний мерч та підтримай будівництво першого Дому Рональда МакДональда в Україні.",
    url: "https://pajama-avatar.vercel.app",
    siteName: "Дім Рональда МакДональда в Україні",
    images: [
      {
        url: "https://pajama-avatar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Всеукраїнський День Піжам — Одягаємо піжаму не для сну, а для підтримки!",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "13 листопада — Всеукраїнський День Піжам 🧸",
    description:
      "Одягаємо піжаму не для сну, а для підтримки! Створюй онлайн-піжаму, обирай благодійний мерч та підтримай будівництво Дому Рональда МакДональда в Україні.",
    images: ["https://pajama-avatar.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
