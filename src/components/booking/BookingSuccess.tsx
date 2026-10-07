"use client";

import React from "react";
import Image from "next/image";
import { TZDate } from "@date-fns/tz";
import {
  Send,
  MapPin,
  Phone,
} from "lucide-react";
import InstagramIcon from "@mui/icons-material/Instagram";

import type { IPublicBooking } from "@/lib/types";
import { phoneNumberSchema } from "@/lib/types";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingSummaryCard from "./BookingSummaryCard";

interface BookingSuccessProps {
  booking: IPublicBooking;
  showSuccessBadge?: boolean;
}

/**
 * Booking confirmation success view in Apple HIG style.
 *
 * Provides instant confirmation feedback, master profile context,
 * booking details summary, Telegram bot authorization CTA, and return action.
 */
const BookingSuccess: React.FC<BookingSuccessProps> = ({
  booking,
  showSuccessBadge = false,
}) => {
  const startsAt = new TZDate(booking.startTime, booking.timezone);
  const endsAt = new TZDate(booking.endTime, booking.timezone);
  const durationMinutes = Math.round(
    (endsAt.getTime() - startsAt.getTime()) / 60000,
  );

  const baseBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL;

  const botUrl = baseBotUrl
    ? baseBotUrl.includes("?start=")
      ? baseBotUrl
      : `${baseBotUrl}?start=start`
    : undefined;

  const contact = booking.masterContact;

  const directContacts = React.useMemo(() => {
    if (!contact) return [];
    const list = [];

    if (contact.phone_number) {
      const parsedPhone = phoneNumberSchema.safeParse(contact.phone_number);
      if (parsedPhone.success) {
        list.push({
          icon: Phone,
          href: `tel:${parsedPhone.data}`,
          label: "Зателефонувати",
        });
      }
    }

    if (contact.telegram_link) {
      list.push({
        icon: Send,
        href: contact.telegram_link,
        label: "Telegram",
      });
    }

    if (contact.instagram_link) {
      list.push({
        icon: InstagramIcon,
        href: contact.instagram_link,
        label: "Instagram",
      });
    }

    if (contact.google_maps_link) {
      list.push({
        icon: MapPin,
        href: contact.google_maps_link,
        label: "Карта",
      });
    }

    return list;
  }, [contact]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {showSuccessBadge ? <BookingStatusBadge /> : null}

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              {booking.masterAvatarUrl ? (
                <Image
                  src={booking.masterAvatarUrl}
                  alt={booking.masterName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-500">
                  {booking.masterName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Майстер
              </span>
              <h4 className="text-sm font-semibold text-zinc-900 truncate">
                {booking.masterName}
              </h4>
            </div>
          </div>

          {directContacts.length > 0 ? (
            <div className="flex items-center gap-1.5 shrink-0">
              {directContacts.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:text-zinc-950 transition-colors"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {contact?.address ? (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
            {contact.google_maps_link ? (
              <a
                href={contact.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-950 hover:underline transition-colors leading-relaxed"
              >
                {contact.address}
              </a>
            ) : (
              <span className="leading-relaxed">{contact.address}</span>
            )}
          </div>
        ) : null}
      </section>

      <BookingSummaryCard
        startsAt={startsAt}
        endsAt={endsAt}
        durationMinutes={durationMinutes}
        services={booking.services}
        totalPrice={booking.price}
        currency={booking.currency}
      />

      {botUrl ? (
        <section className="overflow-hidden rounded-2xl border border-sky-200/50 bg-sky-50/40 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div>
            <h2 className="text-sm font-semibold text-zinc-950 sm:text-base">
              Отримуйте сповіщення у Telegram
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 sm:text-sm">
              Слідкуйте за візитами, отримуйте своєчасні нагадування та керуйте
              записами в один клік.
            </p>
          </div>

          <a
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0088cc] py-2.5 px-4 text-sm font-semibold text-white transition-all hover:bg-[#0077b5] active:scale-[0.98] shadow-[0_4px_14px_rgba(0,136,204,0.25)]"
          >
            <Send className="h-4 w-4" />
            <span>Перейти в Telegram-бот</span>
          </a>
        </section>
      ) : null}
    </div>
  );
};

export default BookingSuccess;
