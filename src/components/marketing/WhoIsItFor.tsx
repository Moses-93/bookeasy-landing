"use client";

import {
  Sparkles,
  PenTool,
  HandHeart,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { MARKETING_COPY, type DirectionIconKey } from "./copy";

const DIRECTION_ICONS: Record<DirectionIconKey, LucideIcon> = {
  beauty: Sparkles,
  tattoo: PenTool,
  massage: HandHeart,
  practice: Briefcase,
};

export const WhoIsItFor = () => {
  const { eyebrow, heading, subheadline, directions } = MARKETING_COPY.whoIsItFor;

  const cleanHeading = heading.endsWith(":") ? heading.slice(0, -1) : heading;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 sm:py-14 lg:py-16 scroll-mt-20">
      <ScrollReveal className="mb-8 md:mb-12 text-center flex flex-col items-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] font-display max-w-2xl mx-auto text-balance text-center">
          {cleanHeading}
        </h2>
        {subheadline && (
          <p className="text-base sm:text-lg text-[#5A3D42] mt-3 sm:mt-4 max-w-2xl leading-relaxed mx-auto font-sans text-balance text-center">
            {subheadline}
          </p>
        )}
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {directions.map((d, index) => {
          const Icon = DIRECTION_ICONS[d.iconKey];
          return (
            <ScrollReveal
              key={d.id}
              delay={index * 0.1}
              y={20}
              className="flex flex-col bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-rose-100/40 hover:border-rose-200 transition-colors duration-300 select-none cursor-default"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0 mb-4 text-[#8F5E66]">
                <Icon aria-hidden="true" className="w-6 h-6 text-[#8F5E66]" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#2C050C] mb-2 tracking-tight">
                {d.label}
              </h3>
              <p className="text-sm sm:text-base text-[#5A3D42] leading-relaxed font-sans">
                {d.subtitle}
              </p>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
