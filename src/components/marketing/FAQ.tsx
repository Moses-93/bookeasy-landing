"use client";

import { useState } from "react";
import { MARKETING_COPY } from "./copy";

export const FAQ = () => {
  const { eyebrow, hero, items } = MARKETING_COPY.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12 scroll-mt-20">
      <div className="mb-8 md:mb-12 text-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] mb-4 font-display max-w-2xl mx-auto">
          {hero}
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-2.5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
              className={`bg-[#FFFBFB] border rounded-[20px] overflow-hidden transition-shadow duration-300 ease-out ${
                isOpen
                  ? "border-[#2C050C]/15 shadow-[0_12px_24px_-10px_rgba(74,6,20,0.1)]"
                  : "border-[#2C050C]/5 shadow-[inset_0_2px_8px_rgba(74,6,20,0.04)] hover:shadow-[0_8px_16px_-8px_rgba(74,6,20,0.08)] hover:-translate-y-px"
              }`}
            >
              <button
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer select-none"
              >
                <span className="font-semibold text-[#2C050C] text-sm sm:text-base leading-snug tracking-tight">
                  {item.question}
                </span>
                <span
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease-out",
                  }}
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isOpen ? "bg-[#2B030A] text-white" : "bg-rose-50/80 text-[#8F5E66]"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="5" y1="1" x2="5" y2="9" />
                    <line x1="1" y1="5" x2="9" y2="5" />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition:
                    "grid-template-rows 0.3s cubic-bezier(0.04, 0.62, 0.23, 0.98), opacity 0.2s linear",
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <div style={{ minHeight: 0 }}>
                  <p className="text-sm sm:text-base text-[#5A3D42] leading-relaxed px-6 pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
