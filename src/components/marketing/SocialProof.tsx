"use client";

import { MARKETING_COPY } from "@/components/marketing/copy";
import { ScrollReveal, AnimatedNumber } from "@/components/ui";
import { CalendarCheck, UserPlus, Timer } from "lucide-react";

const ICONS = [CalendarCheck, UserPlus, Timer];

export function SocialProof() {
  const { socialProof } = MARKETING_COPY;

  return (
    <section className="w-full py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 m-0 p-0 list-none"
        >
          {socialProof.metrics.map((metric, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <li key={index}>
                <ScrollReveal
                  as="div"
                  delay={index * 0.15}
                  y={20}
                  className="flex flex-row sm:flex-col items-center sm:justify-center text-left sm:text-center bg-white/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-rose-100/40 hover:border-rose-200 transition-colors duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4 sm:mr-0 sm:mb-5 text-[#8F5E66]">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2C050C] to-[#8F5E66] mb-1 sm:mb-3 tracking-tight tabular-nums">
                      <AnimatedNumber value={metric.value} delay={index * 0.15 + 0.2} />
                      {metric.suffix}
                    </div>
                    <div className="text-[11px] sm:text-base text-[#5A3D42] font-medium uppercase tracking-wider text-balance">
                      {metric.label}
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
