import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Запис клієнтів та керування графіком — BOOKEASY",
    template: "%s — BOOKEASY",
  },
  description:
    "Застосунок для запису клієнтів та керування графіком. База клієнтів, історія візитів, аналітика, нагадування, онлайн-запис",
  metadataBase: new URL("https://bookeasy.com.ua"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/bookeasy-logo-180.png",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "BOOKEASY",
    title: "Запис клієнтів та керування графіком — BOOKEASY",
    description:
      "Застосунок для запису клієнтів та керування графіком. База клієнтів, історія візитів, аналітика, нагадування, онлайн-запис",
    url: "https://bookeasy.com.ua",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BOOKEASY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOOKEASY — Запис клієнтів та керування графіком",
    description:
      "Застосунок для запису клієнтів та керування графіком. База клієнтів, історія візитів, аналітика, нагадування, онлайн-запис",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bookeasy.com.ua",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
