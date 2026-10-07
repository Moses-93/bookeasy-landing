import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";
import { fetchPublicBooking } from "@/lib/api";
import type { IPublicBooking } from "@/lib/types";
import { BookingSuccess } from "@/components/booking";
import Brand from "@/components/ui/Brand";

interface PageProps {
  params: Promise<{ bookingToken: string }>;
  searchParams: Promise<{ confirmed?: string; [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { bookingToken } = await params;
  try {
    const booking = await fetchPublicBooking(bookingToken);
    const startsAt = new TZDate(booking.startTime, booking.timezone);
    const formattedDate = format(startsAt, "d MMMM", { locale: uk });
    const formattedTime = format(startsAt, "HH:mm");
    const title = `Візит до ${booking.masterName} — ${formattedDate}, ${formattedTime}`;

    const pageUrl = `https://bookeasy.com.ua/b/${bookingToken}`;
    const imageUrl = booking.masterAvatarUrl || "https://bookeasy.com.ua/og-image.png";

    return {
      title,
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title,
        type: "website",
        url: pageUrl,
        images: [{ url: imageUrl }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Візит не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

/**
 * Public booking appointment details page Server Component.
 *
 * Fetches appointment details by public token and renders the summary view.
 *
 * Args:
 *     props: Route params and query search params.
 *
 * Returns:
 *     Public appointment page element.
 */
export default async function PublicBookingPage({
  params,
  searchParams,
}: PageProps) {
  const { bookingToken } = await params;
  const search = await searchParams;

  let booking: IPublicBooking;
  try {
    booking = await fetchPublicBooking(bookingToken);
  } catch (error) {
    console.error("[PublicBookingPage Error] Failed to fetch booking:", error);
    notFound();
  }

  const showSuccessBadge = search.confirmed === "true";

  return (
    <div className="min-h-screen bg-[#FDFBFB] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF0F0]/50 via-[#FDFBFB] to-[#FDFBFB] pb-16">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex justify-start" />

          <Brand />

          <div className="flex items-center justify-end gap-2">
            <Link
              href={`/m/${booking.masterToken}`}
              aria-label="Закрити"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:h-10 sm:w-10"
            >
              <X size={18} />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <BookingSuccess
          booking={booking}
          showSuccessBadge={showSuccessBadge}
        />
      </main>
    </div>
  );
}
