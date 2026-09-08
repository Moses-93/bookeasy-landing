"use client";

import React from "react";

import type { IBooking } from "@/lib/types";
import {
  formatDuration,
  formatPrice,
  formatLongDate,
  formatTime,
  getBookingStatusLabel,
} from "@/lib/formatters";

interface BookingSuccessProps {
  onClose: () => void;
  booking: IBooking;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ onClose, booking }) => {
  const startsAt = new Date(booking.time_slot.start);
  const endsAt = new Date(booking.time_slot.end);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="space-y-2 text-center sm:space-y-3">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Запис підтверджено
        </h1>
      </section>

      <section className="rounded-[20px] border border-zinc-200 bg-white p-3.5 sm:rounded-[28px] sm:p-6">
        <div className="divide-y divide-zinc-200/80">
          <div className="pb-2.5 sm:pb-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Послуга</p>
            <p className="mt-1 text-sm font-normal text-zinc-900 sm:text-base">
              {booking.service.title}
            </p>
          </div>

          <div className="py-2.5 sm:py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Дата</p>
            <p className="mt-1 text-sm font-normal capitalize text-zinc-900 sm:text-base">
              {formatLongDate(startsAt)}
            </p>
          </div>

          <div className="py-2.5 sm:py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Час</p>
            <p className="mt-1 text-sm font-normal text-zinc-900 sm:text-base">
              {formatTime(startsAt)} - {formatTime(endsAt)}
            </p>
          </div>

          <div className="py-2.5 sm:py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Тривалість</p>
            <p className="mt-1 text-sm font-normal text-zinc-900 sm:text-base">
              {formatDuration(booking.service.duration)}
            </p>
          </div>

          <div className="py-2.5 sm:py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Вартість</p>
            <p className="mt-1 text-sm font-normal text-zinc-900 sm:text-base">
              {formatPrice(booking.service.price)}
            </p>
          </div>

          <div className="pt-2.5 sm:pt-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Статус</p>
            <p className="mt-1 text-sm font-normal text-zinc-900 sm:text-base">
              {getBookingStatusLabel(booking.status)}
            </p>
          </div>
        </div>
      </section>

      <button
        onClick={() => onClose()}
        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-zinc-900 bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:h-auto sm:py-4"
      >
        Повернутися
      </button>
    </div>
  );
};

export default BookingSuccess;
