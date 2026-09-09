"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import {
  formatLongDate,
  formatTime,
  formatDuration,
  formatPrice,
  getDurationMinutes,
} from "@/lib/formatters";
import { ClientFormFields } from "./ClientFormFields";
import {
  type IBookableTimeSlot,
  type IService,
  type ICreateBooking,
  createBookingSchema,
} from "@/lib/types";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { parseISO } from "date-fns";

interface BookingConfirmationProps {
  masterId: number;
  service: IService;
  date: Date;
  slot: IBookableTimeSlot;
  onConfirm: (booking: ICreateBooking) => void;
  isSubmitting?: boolean;
  showContactForm?: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  masterId,
  service,
  date,
  slot,
  onConfirm,
  isSubmitting = false,
  showContactForm = false,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const startTime = parseISO(slot.start_time);
  const durationMinutes = getDurationMinutes(service.duration);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

  const formattedDate = formatLongDate(date);
  const formattedSlotTime = formatTime(slot.start_time);
  const formattedEndTime = formatTime(endTime);

  const isKeyboardOpen = useDetectKeyboardOpen();

  useEffect(() => {
    if (!isKeyboardOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isKeyboardOpen]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    const formData = new FormData(e.currentTarget);
    const validationResult = createBookingSchema.safeParse({
      ...Object.fromEntries(formData),
      master_id: masterId,
      service_id: service.id,
      time_slot_ids: slot.group_ids,
    });

    if (!validationResult.success) {
      setValidationError(validationResult.error.issues[0]?.message ?? "Некоректні дані бронювання");
      return;
    }

    onConfirm(validationResult.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex flex-col min-h-full">
      <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
        <div className="bg-white rounded-2xl border-[0.5px] border-slate-200/50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-900 sm:h-11 sm:w-11">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Послуга
              </p>
              <h4 className="mt-1 text-sm font-semibold text-slate-900">{service.title}</h4>
              <p className="mt-1 text-xs text-slate-500">
                {formatDuration(service.duration)} • {formatPrice(service.price)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-[0.5px] border-slate-200/50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-900 sm:h-11 sm:w-11">
              <CalendarDays size={16} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Час візиту
              </p>
              <h4 className="mt-1 text-sm font-semibold capitalize text-slate-900">
                {formattedDate}
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                {formattedSlotTime} - {formattedEndTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {validationError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800">
          {validationError}
        </div>
      )}

      {showContactForm && <ClientFormFields disabled={isSubmitting} />}

      <div className="text-center text-xs text-slate-400 mt-2 pb-4">
        <Link href="/terms" className="hover:text-slate-600 transition-colors">
          Умови
        </Link>
        <span className="mx-2">•</span>
        <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">
          Конфіденційність
        </Link>
      </div>

      <div className="sticky bottom-0 z-50 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 sm:py-6 mt-6 bg-[#FDFBFB]/80 backdrop-blur-md border-t border-slate-200/50 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="pointer-events-auto w-full max-w-sm h-14 flex items-center justify-center gap-2 rounded-full px-5 text-[16px] font-semibold transition-all duration-300 bg-zinc-950 text-white shadow-xl hover:bg-zinc-800 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : "Записатися"}
        </button>
      </div>
    </form>
  );
};

export default BookingConfirmation;
