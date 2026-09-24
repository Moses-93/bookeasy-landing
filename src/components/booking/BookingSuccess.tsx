"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import {
  Send,
  MapPin,
  Phone,
} from "lucide-react";
import InstagramIcon from "@mui/icons-material/Instagram";

import type { IBooking, IPublicMasterProfile } from "@/lib/types";
import { phoneNumberSchema } from "@/lib/types";
import {
  formatDuration,
  formatPrice,
  formatTime,
} from "@/lib/formatters";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingSuccessProps {
  booking: IBooking;
  masterInfo?: IPublicMasterProfile;
}

/**
 * Booking confirmation success view in Apple HIG style.
 *
 * Provides instant confirmation feedback, master profile context,
 * booking details summary, Telegram bot authorization CTA, and return action.
 */
const BookingSuccess: React.FC<BookingSuccessProps> = ({
  booking,
  masterInfo,
}) => {
  const startsAt = new Date(booking.time_slot.start);
  const endsAt = new Date(booking.time_slot.end);

  const baseBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL;

  const botUrl = baseBotUrl
    ? baseBotUrl.includes("?start=")
      ? baseBotUrl
      : `${baseBotUrl}?start=start`
    : undefined;

  const contact = masterInfo?.contact;

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
      <BookingStatusBadge />

      {masterInfo ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {masterInfo.avatar_url ? (
                  <Image
                    src={masterInfo.avatar_url}
                    alt={masterInfo.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-500">
                    {masterInfo.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Майстер
                </span>
                <h4 className="text-sm font-semibold text-zinc-900 truncate">
                  {masterInfo.name}
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
      ) : null}

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
        <div>
          <h4 className="text-sm font-semibold capitalize text-zinc-900 sm:text-base">
            {format(startsAt, "d MMMM, EEEE", { locale: uk })}
          </h4>
          <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
            {formatTime(startsAt)} – {formatTime(endsAt)} • {formatDuration(booking.service.duration)}
          </p>
        </div>

        <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          <p className="text-sm font-normal text-zinc-900 sm:text-base truncate">
            {booking.service.title}
          </p>
          <span className="shrink-0 text-sm font-semibold text-zinc-950 sm:text-base">
            {formatPrice(booking.service.price, booking.service.currency)}
          </span>
        </div>
      </section>

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
