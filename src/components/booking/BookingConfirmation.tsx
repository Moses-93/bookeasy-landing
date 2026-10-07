"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getDurationMinutes } from "@/lib/formatters";
import { ClientFormFields } from "./ClientFormFields";
import BookingSummaryCard from "./BookingSummaryCard";
import {
  type IBookableTimeSlot,
  type IService,
  type ICreateBooking,
  type IMasterCustomization,
  createBookingSchema,
} from "@/lib/types";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { TZDate } from "@date-fns/tz";

interface BookingConfirmationProps {
  masterId: number;
  services: IService[];
  slot: IBookableTimeSlot;
  onConfirm: (booking: ICreateBooking) => void;
  timezone: string;
  isSubmitting?: boolean;
  showContactForm?: boolean;
  customization?: IMasterCustomization | null;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  masterId,
  services,
  slot,
  onConfirm,
  timezone,
  isSubmitting = false,
  showContactForm = false,
  customization,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(!showContactForm);

  const bookingSchema = React.useMemo(
    () => createBookingSchema(customization?.formFields),
    [customization?.formFields],
  );

  const handleFormInput = (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (!showContactForm) return;

    const formData = new FormData(e.currentTarget);
    const result = bookingSchema.safeParse({
      ...Object.fromEntries(formData),
      master_id: masterId,
      service_ids: services.map((s) => s.id),
      time_slot_ids: slot.group_ids,
    });

    setIsFormValid(result.success);
  };

  const startsAt = new TZDate(slot.start_time, timezone);
  const totalDurationMinutes = services.reduce(
    (acc, s) => acc + getDurationMinutes(s.duration),
    0,
  );
  const endsAt = new TZDate(startsAt.getTime() + totalDurationMinutes * 60000, timezone);

  const totalPrice = services.reduce((acc, s) => acc + (parseFloat(s.price) || 0), 0);
  const currency = services[0]?.currency ?? "UAH";

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
    const validationResult = bookingSchema.safeParse({
      ...Object.fromEntries(formData),
      master_id: masterId,
      service_ids: services.map((s) => s.id),
      time_slot_ids: slot.group_ids,
    });

    if (!validationResult.success) {
      setValidationError(validationResult.error.issues[0]?.message ?? "Некоректні дані бронювання");
      return;
    }

    onConfirm(validationResult.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onInput={handleFormInput}
      onChange={handleFormInput}
      className="space-y-4 sm:space-y-6 flex flex-col min-h-full"
    >
      <BookingSummaryCard
        startsAt={startsAt}
        endsAt={endsAt}
        durationMinutes={totalDurationMinutes}
        services={services}
        totalPrice={totalPrice.toString()}
        currency={currency}
      />

      {validationError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800">
          {validationError}
        </div>
      ) : null}

      {showContactForm ? (
        <ClientFormFields
          formFields={customization?.formFields}
          disabled={isSubmitting}
        />
      ) : null}

      <div className="text-center text-xs text-slate-400 mt-2 pb-4">
        <Link href="/terms" className="hover:text-slate-600 transition-colors">
          Умови
        </Link>
        <span className="mx-2">•</span>
        <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">
          Конфіденційність
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pt-3.5 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] sm:px-6 sm:pt-4 bg-white/80 backdrop-blur-md border-t border-slate-200/80 rounded-t-[28px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto w-full">
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full h-[52px] rounded-2xl flex items-center justify-center gap-2 text-[15px] sm:text-base font-semibold text-white bg-zinc-950 hover:bg-zinc-800 shadow-[0_4px_14px_rgba(0,0,0,0.14)] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? <Loader2 size={22} className="animate-spin" /> : "Записатися"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingConfirmation;
