"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShieldBan, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../ui/Footer";
import Brand from "../ui/Brand";
import { PremiumPlan } from "./PremiumPlan";
import { MARKETING_COPY } from "./copy";
import { WhoIsItFor } from "./WhoIsItFor";
import { FAQ } from "./FAQ";

const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

const motionElements = {
  div: motion.div,
  h1: motion.h1,
  p: motion.p,
};

export function ScrollReveal({
  children,
  className = "",
  y = 30,
  delay = 0,
  fade = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  fade?: boolean;
  as?: "div" | "h1" | "p";
}) {
  const MotionComponent = motionElements[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: fade ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const copy = MARKETING_COPY;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${isScrolled || isMobileMenuOpen
          ? "bg-[#FFFBFB]/90 backdrop-blur-md border-b border-rose-100/40 shadow-sm"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Brand to="/" />

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
            <ScrollReveal
              as="p"
              y={15}
              delay={0.1}
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-4 sm:mb-6"
            >
              {copy.landing.eyebrow}
            </ScrollReveal>
            <ScrollReveal
              as="h1"
              y={20}
              delay={0.2}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] font-display max-w-4xl text-[#2C050C] text-center"
            >
              Інструмент, що <br className="hidden sm:block" />
              <span className="italic font-display font-medium text-[#2C050C]">
                дбає про майстра.
              </span>
            </ScrollReveal>
            <ScrollReveal
              as="p"
              y={20}
              delay={0.3}
              className="text-base sm:text-lg md:text-xl text-[#5A3D42] mt-6 sm:mt-8 max-w-2xl leading-relaxed mx-auto font-sans"
            >
              {copy.landing.subheadline}
            </ScrollReveal>

            <ScrollReveal
              as="div"
              y={20}
              delay={0.4}
              className="mt-10 sm:mt-12 flex flex-col items-center gap-4 w-full"
            >
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
            </ScrollReveal>
          </div>
        </section>

        <section
          id="benefits"
          className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12 scroll-mt-20"
        >
          <ScrollReveal className="mb-8 md:mb-12 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
              {copy.benefits.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] mb-4 font-display max-w-2xl mx-auto">
              {copy.benefits.hero}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {copy.benefits.highlights.map((item, index) => {
              const CONTENT_PADDING = "p-8 sm:p-12 md:p-16 lg:p-24";
              const BG_CLASSES = [
                "bg-gradient-to-br from-blue-50/80 to-sky-50/50 border border-blue-100/50",
                "bg-gradient-to-bl from-violet-50/80 to-purple-50/50 border border-violet-100/50",
                "bg-gradient-to-tr from-emerald-50/80 to-teal-50/50 border border-emerald-100/50",
                "bg-gradient-to-tl from-amber-50/80 to-orange-50/50 border border-amber-100/50",
                "bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50",
                "bg-gradient-to-tr from-rose-50/80 to-pink-50/50 border border-rose-100/50",
              ];

              const CARD_HEIGHTS = [
                "min-h-[350px] md:min-h-[600px] lg:min-h-[700px]",
                "min-h-[350px] md:min-h-[500px] lg:min-h-[600px]",
                "min-h-[350px] md:min-h-[550px] lg:min-h-[600px]",
                "min-h-[350px] md:min-h-[600px] lg:min-h-[700px]",
                "h-full",
                "h-full",
              ];

              const isTextOnly = index === 4 || index === 5;
              const isReversed = index % 2 !== 0 && !isTextOnly;
              const colSpan = isTextOnly ? "md:col-span-6" : "md:col-span-12";
              const minHeight = CARD_HEIGHTS[index];
              const bgClass = BG_CLASSES[index];
              const textClass = "text-[#2C050C]";
              const descClass = "text-[#5A3D42]";
              const layoutClass = isTextOnly ? "flex-col" : `flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-stretch`;

              const textContainerWidth = isTextOnly ? "w-full" : "md:w-5/12 lg:w-1/2";
              const textContainerClass = `${CONTENT_PADDING} ${textContainerWidth} relative z-30 flex flex-col justify-center`;

              const IMAGE_CONTAINER_HEIGHTS = [
                "min-h-[350px]",
                "min-h-[320px]",
                "min-h-[250px]",
                "min-h-[350px]",
                "",
                "",
              ];
              const imageContainerClass = `relative w-full ${IMAGE_CONTAINER_HEIGHTS[index]} md:h-auto md:absolute ${isReversed ? 'md:left-0' : 'md:right-0'} md:top-0 md:bottom-0 md:w-7/12 lg:w-1/2 mt-8 md:mt-0`;
              const wrapperAlignment = isTextOnly ? "" : (isReversed ? "md:justify-start md:pl-16 lg:pl-24" : "md:justify-end md:pr-16 lg:pr-24");
              const IMAGE_WRAPPER_CLASS = `absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center ${wrapperAlignment} pb-0`;

              return (
                <ScrollReveal
                  key={item.title}
                  y={30}
                  className={`relative overflow-hidden rounded-[32px] flex group ${colSpan} ${minHeight} ${bgClass} ${layoutClass}`}
                >
                  <div className={`relative z-20 ${textContainerClass}`}>
                    {index === 4 && <ShieldBan className="w-10 h-10 text-rose-400 mb-6" />}
                    {index === 5 && <HeartHandshake className="w-10 h-10 text-rose-500 mb-6" />}
                    <h3 className={`font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight ${textClass}`}>
                      {item.title}
                    </h3>
                    <p className={`text-base sm:text-lg md:text-xl mt-4 md:mt-6 leading-relaxed md:leading-loose break-words ${descClass}`}>
                      {item.text}
                    </p>
                  </div>

                  {index === 0 || index === 3 ? (
                    <div className={imageContainerClass}>
                      <div className={IMAGE_WRAPPER_CLASS}>
                        <div className="relative w-[300px] sm:w-[350px] md:w-[480px] lg:w-[700px] h-[320px] sm:h-[350px] md:h-[500px] lg:h-[700px]">
                          <div className="absolute top-[-25%] md:top-[-15%] left-[5%] md:left-[10%] w-[50%] aspect-[1/2] z-10 transition-transform duration-700 group-hover:-translate-y-4">
                            <Image priority={true} src={item.additionalImages?.[0] as string} alt={item.imageAlt || item.title} fill className="object-contain object-top opacity-95" quality={100} sizes="(max-width: 768px) 100vw, 50vw" />
                          </div>

                          <div className="absolute top-[0%] md:top-[5%] right-[0%] md:right-[5%] w-[60%] md:w-[55%] aspect-[1/2] z-20 transition-transform duration-700 group-hover:-translate-y-4">
                            <Image priority={true} src={item.image as string} alt={item.imageAlt || item.title} fill className="object-contain object-top" quality={100} sizes="(max-width: 768px) 100vw, 50vw" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : index === 1 ? (
                    <div className={imageContainerClass}>
                      <div className={IMAGE_WRAPPER_CLASS}>
                        <div className="relative w-[320px] sm:w-[400px] md:w-[500px] lg:w-[700px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[650px]">
                          <div className="absolute top-[-25%] md:top-[-15%] right-[2%] md:right-[8%] w-[45%] md:w-[40%] aspect-[1/2] rotate-[5deg] z-10 transition-transform duration-700 group-hover:rotate-[8deg] group-hover:-translate-y-4 group-hover:translate-x-4">
                            <Image
                              priority={true}
                              src={item.additionalImages?.[0] as string}
                              alt={item.imageAlt || item.title}
                              fill
                              className="object-contain object-top opacity-90"
                              quality={100}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div className="absolute top-[-10%] md:top-[0%] left-0 md:left-[5%] w-[65%] md:w-[52%] aspect-[1/2] -rotate-[3deg] z-20 transition-transform duration-700 group-hover:-rotate-[5deg] group-hover:-translate-y-4 group-hover:-translate-x-4">
                            <Image
                              priority={true}
                              src={item.image as string}
                              alt={item.imageAlt || item.title}
                              fill
                              className="object-contain object-top"
                              quality={100}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : index === 2 ? (
                    <div className={imageContainerClass}>
                      <div className={IMAGE_WRAPPER_CLASS}>
                        <div className="relative w-[300px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
                          <div className="absolute top-[10%] md:top-[10%] right-[5%] md:right-[0%] w-[45%] md:w-[48%] aspect-[3/4] rotate-[8deg] z-10 transition-transform duration-700 group-hover:rotate-[12deg] group-hover:-translate-y-4 group-hover:translate-x-6">
                            <Image priority={true} src={item.additionalImages?.[0] as string} alt={item.imageAlt || item.title} fill className="object-contain object-top" quality={100} sizes="(max-width: 768px) 50vw, 40vw" />
                          </div>

                          <div className="absolute top-[45%] md:top-[45%] left-[0%] md:left-[0%] w-[50%] md:w-[55%] aspect-[4/3] -rotate-[6deg] z-20 transition-transform duration-700 group-hover:-rotate-[10deg] group-hover:translate-y-2 group-hover:-translate-x-6">
                            <Image priority={true} src={item.additionalImages?.[1] as string} alt={item.imageAlt || item.title} fill className="object-contain object-top" quality={100} sizes="(max-width: 768px) 50vw, 40vw" />
                          </div>

                          <div className="absolute top-[0%] md:top-[0%] left-[25%] md:left-[22%] w-[50%] md:w-[58%] aspect-[1/2] rotate-0 z-30 transition-transform duration-700 group-hover:-translate-y-4">
                            <Image priority={true} src={item.image as string} alt={item.imageAlt || item.title} fill className="object-contain object-top" quality={100} sizes="(max-width: 768px) 70vw, 60vw" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12 scroll-mt-20"
        >
          <ScrollReveal className="mb-8 md:mb-12 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
              {copy.howItWorks.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] mb-4 font-display max-w-2xl mx-auto">
              {copy.howItWorks.hero}
            </h2>
          </ScrollReveal>

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
                  <ScrollReveal
                    key={item.title}
                    className="relative flex flex-col items-start z-10"
                  >
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
                  </ScrollReveal>
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
            <ScrollReveal className="text-center mb-6 sm:mb-10 md:mb-16">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
                вартість підписки
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C050C] font-display max-w-2xl mx-auto">
                {copy.landing.pricingTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#5A3D42] mt-3 sm:mt-4 max-w-2xl leading-relaxed mx-auto font-sans">
                {copy.landing.pricingSubheadline}
              </p>
            </ScrollReveal>
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
