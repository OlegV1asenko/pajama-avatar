import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Піжама Аватар 🧸 — Ваш AI аватар у піжамі",
  description:
    "Завантажте своє фото і отримайте стильний digital-art аватар у різнокольоровій піжамі. Безкоштовно!",
  openGraph: {
    title: "Піжама Аватар 🧸",
    description: "Ваш AI аватар у піжамі — безкоштовно!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
