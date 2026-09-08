"use client";

import React from "react";
import { Clock } from "lucide-react";
import { getDurationMinutes, formatPrice } from "@/lib/formatters";
import type { IService } from "@/lib/types";

interface ServiceSelectorProps {
  services: IService[];
  selectedServiceId: number | null;
  onSelectService: (id: number) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServiceId,
  onSelectService,
}) => {
  const visibleServices = services;

  return (
    <div className="space-y-3 sm:space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleServices.map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service.id)}
              className={`group relative flex flex-col gap-2.5 rounded-[22px] p-3.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/30 sm:rounded-[24px] sm:p-5 md:h-full ${
                isSelected
                  ? "border border-zinc-950 bg-white shadow-sm scale-[1.01]"
                  : "border border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md"
              }`}
            >
              <div
                className={`absolute right-3.5 top-3.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:right-5 sm:top-5 ${
                  isSelected ? "border border-zinc-950 bg-white" : "border border-zinc-200 bg-white"
                }`}
              >
                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-zinc-950" />}
              </div>

              <div className="min-w-0 pr-9 sm:pr-10">
                <h4
                  className={`text-[16px] font-semibold tracking-tight break-all transition-colors duration-300 ${isSelected ? "text-zinc-950" : "text-stone-800"}`}
                >
                  {service.title}
                </h4>
              </div>

              <div className="mt-1 flex w-full items-end gap-2.5 sm:mt-3 sm:gap-3 md:mt-auto">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 ${isSelected ? "border-zinc-950/10 bg-zinc-950/5 text-zinc-950" : "border-zinc-200 bg-zinc-50 text-stone-500"}`}
                >
                  <Clock size={12} /> {getDurationMinutes(service.duration)} хв
                </span>
                <span
                  className={`ml-auto block text-right whitespace-nowrap text-[18px] font-semibold tracking-tight tabular-nums transition-colors duration-300 ${isSelected ? "text-zinc-950" : "text-stone-800"}`}
                >
                  {formatPrice(service.price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {visibleServices.length === 0 && (
        <div className="rounded-[24px] bg-white/60 backdrop-blur-md border border-white/80 shadow-sm px-6 py-10 text-center text-sm text-stone-500">
          Немає доступних послуг для запису.
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
