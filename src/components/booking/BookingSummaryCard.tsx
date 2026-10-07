import React from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { formatPrice } from "@/lib/formatters";
import type { IBookedService, Currency } from "@/lib/types";

interface BookingSummaryCardProps {
  startsAt: Date;
  endsAt: Date;
  durationMinutes: number;
  services: IBookedService[];
  totalPrice: string;
  currency: Currency;
}

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  startsAt,
  endsAt,
  durationMinutes,
  services,
  totalPrice,
  currency,
}) => {
  const dayAndMonth = format(startsAt, "d MMMM", { locale: uk });
  const weekday = format(startsAt, "EEEE", { locale: uk });
  const formattedTimeRange = `${format(startsAt, "HH:mm")} – ${format(endsAt, "HH:mm")}`;

  return (
    <section className="relative rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[15px] font-semibold text-zinc-900">
            {dayAndMonth}
          </span>
          <p className="mt-1 text-[13px] font-medium text-zinc-600 capitalize">
            {weekday}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[15px] font-semibold text-zinc-900">
            {formattedTimeRange}
          </span>
          <div className="mt-1 flex justify-end">
            <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 tabular-nums">
              {durationMinutes} хв
            </span>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 sm:-mx-5 my-4 flex items-center" aria-hidden="true">
        <div className="w-2.5 h-5 rounded-r-full bg-[#FDFBFB] border-y border-r border-zinc-200/80 shrink-0" />
        <div
          className="h-px flex-1 mx-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #d4d4d8 0, #d4d4d8 5px, transparent 5px, transparent 10px)",
          }}
        />
        <div className="w-2.5 h-5 rounded-l-full bg-[#FDFBFB] border-y border-l border-zinc-200/80 shrink-0" />
      </div>

      <div className="space-y-3">
        <div className="space-y-2.5">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <span className="text-zinc-700 font-medium break-words leading-tight">
                {item.title}
              </span>
              <span className="shrink-0 text-zinc-900 font-semibold tabular-nums">
                {formatPrice(item.price, currency)}
              </span>
            </div>
          ))}
        </div>

        {services.length > 1 ? (
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-sm sm:text-base font-semibold text-zinc-950">
            <span>Разом</span>
            <span className="tabular-nums">
              {formatPrice(totalPrice, currency)}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BookingSummaryCard;
