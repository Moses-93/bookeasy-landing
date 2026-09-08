"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Footer from "../ui/Footer";
import Brand from "../ui/Brand";
import { PremiumPlan } from "./PremiumPlan";
import { MARKETING_COPY } from "./copy";
import { WhoIsItFor } from "./WhoIsItFor";
import { FAQ } from "./FAQ";

const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const copy = MARKETING_COPY;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div
      className="min-h-screen text-slate-900 transition-colors duration-300"
      style={{ backgroundColor: "#FFFBFB" }}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "BOOKEASY",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://bookeasy.com.ua",
          description:
            "Онлайн-запис та керування графіком для beauty-майстрів. Контроль над розкладом, спокій у роботі та більше вільного часу.",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "UAH",
            lowPrice: "0",
            highPrice: "2250",
            offerCount: 3,
            offers: [
              {
                "@type": "Offer",
                name: "Trial",
                price: "0",
                priceCurrency: "UAH",
              },
              {
                "@type": "Offer",
                name: "Care",
                price: "225",
                priceCurrency: "UAH",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: "225",
                  priceCurrency: "UAH",
                  referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: "1",
                    unitCode: "MON",
                  },
                },
              },
              {
                "@type": "Offer",
                name: "Care",
                price: "2250",
                priceCurrency: "UAH",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: "2250",
                  priceCurrency: "UAH",
                  referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: "1",
                    unitCode: "ANN",
                  },
                },
              },
            ],
          },
        }}
      />
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#FFFBFB]/90 backdrop-blur-md border-b border-rose-100/40 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Brand to="/" />

          <div className="hidden md:flex items-center gap-2 text-sm">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-rose-50/40"
            >
              Головна
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-rose-50/40"
            >
              Переваги
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-rose-50/40"
            >
              Як це працює
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-rose-50/40"
            >
              Ціна
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden md:block px-3 py-1.5 text-sm text-slate-600 hover:text-[#2C050C]"
            >
              Увійти
            </Link>
            <Link
              href="/register"
              className="hidden sm:block px-4 py-2 bg-[#2B030A] text-white rounded-xl text-sm font-medium hover:bg-[#1C0105] transition-colors duration-300"
            >
              Спробувати
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-rose-50/40"
              aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              {isMobileMenuOpen ? (
                <X size={20} style={{ color: "#2C050C" }} />
              ) : (
                <Menu size={20} style={{ color: "#2C050C" }} />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-rose-100/40 p-3 space-y-2 bg-[#FFFBFB]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50/40"
            >
              Головна
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50/40"
            >
              Переваги
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50/40"
            >
              Як це працює
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50/40"
            >
              Ціна
            </button>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50/40"
            >
              Увійти
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-lg bg-[#2B030A] text-white"
            >
              Спробувати
            </Link>
          </div>
        )}
      </nav>

      <main>
        <section
          id="hero"
          className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#FAF4F2_0%,#EAD0C9_50%,#FFFBFB_100%)] md:bg-[linear-gradient(180deg,#FAF4F2_0%,#F5E3DE_70%,#FFFBFB_100%)]"
        >
          <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 relative z-10 text-center flex flex-col items-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-4 sm:mb-6">
              {copy.landing.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] font-display max-w-4xl text-[#2C050C] text-center">
              Інструмент, що <br className="hidden sm:block" />
              <span className="italic font-display font-medium text-[#2C050C]">
                дбає про майстра.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#5A3D42] mt-6 sm:mt-8 max-w-2xl leading-relaxed mx-auto font-sans">
              {copy.landing.subheadline}
            </p>

            <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4 w-full">
              <Link
                href="/register"
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#2B030A] text-white font-semibold flex items-center justify-center gap-3 hover:bg-[#1C0105] transition-all duration-300 text-base shadow-sm hover:shadow-md"
              >
                {copy.landing.primaryCta}
                <span className="font-light text-xl">→</span>
              </Link>
              <p className="text-[10px] sm:text-xs text-[#A17078] font-mono tracking-wider uppercase flex items-center gap-2 mt-2">
                <span>7 днів безкоштовно</span>
                <span className="text-rose-300/60">•</span>
                <span>Без кредитних карток</span>
              </p>
            </div>
          </div>
        </section>

        <section
          id="benefits"
          className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12 scroll-mt-20"
        >
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
              {copy.benefits.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] mb-4 font-display max-w-2xl mx-auto">
              {copy.benefits.hero}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
            {copy.benefits.highlights.map((item, index) => {
              const isLastOddItem =
                copy.benefits.highlights.length % 2 !== 0 &&
                index === copy.benefits.highlights.length - 1;
              return (
                <div
                  key={item.title}
                  className={`bg-[#FFFBFB] shadow-[inset_0_2px_8px_rgba(74,6,20,0.04)] border border-[#2C050C]/5 rounded-[24px] p-6 sm:p-8 hover:shadow-[0_12px_24px_-10px_rgba(74,6,20,0.1)] hover:bg-white hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-pointer select-none md:col-span-6 ${isLastOddItem ? "md:col-start-4" : ""}`}
                >
                  <div>
                    <h3 className="font-semibold text-[#2C050C] text-lg tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5A3D42] mt-3 leading-relaxed break-words">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12 scroll-mt-20"
        >
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
              {copy.howItWorks.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] mb-4 font-display max-w-2xl mx-auto">
              {copy.howItWorks.hero}
            </h2>
          </div>

          <div className="lg:hidden pl-2">
            <div className="space-y-0">
              {copy.howItWorks.steps.map((item, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                const isFirst = index === 0;
                const isLast = index === copy.howItWorks.steps.length - 1;
                return (
                  <div key={item.title} className="relative flex items-start gap-4 sm:gap-5">
                    {isFirst && (
                      <div className="absolute left-[19px] top-5 bottom-0 w-[1.5px] bg-rose-100/50 z-0" />
                    )}
                    {!isFirst && !isLast && (
                      <div className="absolute left-[19px] top-0 bottom-0 w-[1.5px] bg-rose-100/50 z-0" />
                    )}
                    {isLast && (
                      <div className="absolute left-[19px] top-0 h-5 w-[1.5px] bg-rose-100/50 z-0" />
                    )}

                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#2B030A] flex items-center justify-center text-white text-sm font-semibold shadow-sm relative z-10">
                        {stepNumber}
                      </div>
                    </div>
                    <div className={`pt-1 ${isLast ? "pb-0" : "pb-6 sm:pb-8"}`}>
                      <h3 className="font-semibold text-[#2C050C] text-base sm:text-lg leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5A3D42] mt-1.5 leading-relaxed break-words">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute top-5 left-[20px] w-[75%] h-[1.5px] bg-rose-100/50 z-0" />

            <div className="grid grid-cols-4 gap-8">
              {copy.howItWorks.steps.map((item, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                return (
                  <div key={item.title} className="relative flex flex-col items-start z-10">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2B030A] flex items-center justify-center text-white text-sm font-semibold shadow-sm mb-4">
                      {stepNumber}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C050C] text-lg tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#5A3D42] leading-relaxed break-words">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WhoIsItFor />

        <section
          id="pricing"
          className="w-full bg-white py-8 sm:py-10 lg:py-12 border-t border-rose-100/30 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6 sm:mb-10 md:mb-16">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
                вартість підписки
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C050C] font-display max-w-2xl mx-auto">
                {copy.landing.pricingTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#5A3D42] mt-3 sm:mt-4 max-w-2xl leading-relaxed mx-auto font-sans">
                {copy.landing.pricingSubheadline}
              </p>
            </div>
            <PremiumPlan />
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
