"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Clock } from "lucide-react";
import { getDurationMinutes, formatPrice } from "@/lib/formatters";
import type { IService } from "@/lib/types";

interface ServiceDetailModalProps {
  service: IService | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!service) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96 }
            }
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 350,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col rounded-[32px] border border-white/60 bg-white/95 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:rounded-[36px] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2.5">
                <h3
                  id="service-detail-title"
                  className="text-[17px] font-semibold tracking-tight text-zinc-950 sm:text-[18px] leading-snug break-words"
                >
                  {service.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/60 bg-zinc-100/80 px-3 py-1.5 text-xs font-medium text-zinc-600">
                    <Clock size={13} className="text-zinc-500" />
                    {getDurationMinutes(service.duration)} хв
                  </span>
                  <span className="inline-flex items-center rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold tabular-nums text-white">
                    {formatPrice(service.price)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Закрити опис послуги"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100/80 text-zinc-500 transition-all hover:bg-zinc-200/80 hover:text-zinc-950 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/30"
              >
                <X size={16} />
              </button>
            </div>

            {service.description ? (
              <p className="my-5 max-h-[50vh] overflow-y-auto pr-1 text-[15px] font-normal leading-[1.65] tracking-[-0.01em] text-zinc-600 whitespace-pre-line break-words">
                {service.description.trim()}
              </p>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="flex h-13 w-full shrink-0 items-center justify-center rounded-[20px] bg-zinc-950 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-zinc-900 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/30"
            >
              Закрити
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
