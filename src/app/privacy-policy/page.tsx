import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Brand from "@/components/ui/Brand";
import Footer from "@/components/ui/Footer";
import { SharedMarkdownRenderer } from "@/components/ui/MarkdownContent";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Політика конфіденційності та захисту персональних даних сервісу BOOKEASY.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Політика конфіденційності — BOOKEASY",
    description: "Політика конфіденційності та захисту персональних даних сервісу BOOKEASY.",
    url: "https://bookeasy.com.ua/privacy-policy",
  },
};

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "src/content/legal/privacy.md");
  const markdown = await fs.readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB] text-slate-900">
      <header className="border-b border-[#2C050C]/10 bg-white sticky top-0 z-20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand href="/" />
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-[#5A3D42] hover:text-[#2C050C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B030A] rounded-lg px-3 py-1.5"
            >
              На головну
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex-1 w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <article>
          <SharedMarkdownRenderer markdown={markdown} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
