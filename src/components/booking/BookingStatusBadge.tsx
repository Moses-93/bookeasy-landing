import React from "react";
import { CheckCircle2 } from "lucide-react";

interface BookingStatusBadgeProps {
  title?: string;
  subtitle?: string;
}

/**
 * Booking confirmation horizontal status banner in Apple HIG style.
 *
 * Displays a leading completion icon on the left with left-aligned
 * title and subtitle on the right in a full-width banner.
 *
 * @param props - Component properties.
 * @returns Horizontal status banner element.
 */
export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  title = "Запис підтверджено",
  subtitle = "Деталі вашого візиту збережено",
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-200/50 bg-emerald-50/40 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200/50">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm sm:text-base font-semibold text-emerald-950">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-emerald-700/80">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default BookingStatusBadge;
