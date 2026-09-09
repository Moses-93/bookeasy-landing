"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";

import type {
  ICreateBooking,
  IBooking,
  IPublicMasterProfile,
  IService,
  IBookableTimeSlot,
} from "@/lib/types";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import {
  BookingConfirmation,
  ServiceSelector,
  TimePicker,
  MasterHero,
  MasterPortfolio,
  BookingSuccess,
} from ".";
import Brand from "../ui/Brand";
import {
  fetchBookableTimeSlots,
  createAnonymousBooking,
} from "@/lib/api";

interface BookingFlowProps {
  masterId: number;
  onComplete?: ((data: ICreateBooking) => Promise<IBooking>) | ((data: ICreateBooking) => IBooking);
  masterInfo?: IPublicMasterProfile;
  showContactForm?: boolean;
  services: IService[];
  availableDates: string[];
}

const BookingFlow: React.FC<BookingFlowProps> = ({
  masterId,
  onComplete,
  masterInfo,
  showContactForm = false,
  services,
  availableDates,
}) => {
  const [isStorefront, setIsStorefront] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedBooking, setCompletedBooking] = useState<IBooking | null>(null);

  const handleBookingComplete = onComplete || createAnonymousBooking;

  const initialDate = React.useMemo(() => {
    return availableDates && availableDates.length > 0 ? parseISO(availableDates[0]) : null;
  }, [availableDates]);

  const {
    step,
    selectedService,
    selectedDate,
    selectedSlot,
    isSubmitting,
    canProceed,
    setSelectedDate,
    setSelectedSlot,
    selectService,
    handleNext,
    handleBack,
    handleBook,
    resetFlow,
  } = useBookingFlow({ onComplete: handleBookingComplete, maxSteps: 3, initialDate });

  const duration = selectedService?.duration;
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const currentKey =
    !isStorefront && duration && formattedDate ? `${masterId}_${duration}_${formattedDate}` : "";

  const [slotsData, setSlotsData] = useState<{ key: string; slots: IBookableTimeSlot[] }>({
    key: "",
    slots: [],
  });

  const isSlotsLoading = Boolean(currentKey && slotsData.key !== currentKey);
  const displayTimeSlots = slotsData.key === currentKey ? slotsData.slots : [];

  useEffect(() => {
    if (!currentKey || !duration || !formattedDate) {
      return;
    }
    let cancelled = false;
    fetchBookableTimeSlots(masterId, duration, formattedDate)
      .then((slots) => {
        if (!cancelled) {
          setSlotsData({ key: currentKey, slots: slots || [] });
        }
      })
      .catch((err) => {
        console.error("Failed to load time slots", err);
        if (!cancelled) {
          setSlotsData({ key: currentKey, slots: [] });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [currentKey, masterId, duration, formattedDate]);


  const handleConfirm = async (booking: ICreateBooking) => {
    setErrorMsg(null);
    try {
      const result = await handleBook(booking);
      setCompletedBooking(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка при створенні бронювання";
      setErrorMsg(message);
    }
  };

  if (completedBooking) {
    return (
      <div className="min-h-screen bg-graphite-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[24px] border border-zinc-200 bg-white p-3.5 sm:rounded-[28px] sm:p-6 lg:p-8">
            <BookingSuccess
              booking={completedBooking}
              onClose={() => {
                resetFlow();
                setCompletedBooking(null);
                setIsStorefront(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const stepHeader =
    step === 1
      ? { title: "Оберіть послугу" }
      : step === 2
        ? { title: "Оберіть час" }
        : step === 3
          ? { title: "Підтвердження" }
          : null;

  if (isStorefront && masterInfo) {
    return (
      <div className="min-h-screen bg-[#FDFBFB] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF0F0]/50 via-[#FDFBFB] to-[#FDFBFB] pb-24 sm:pb-28">
        <MasterHero info={masterInfo} />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <MasterPortfolio photos={masterInfo.portfolio} />
        </div>

        <footer className="fixed inset-x-0 bottom-0 z-[60] pb-6 pt-12 px-4 sm:px-6 flex justify-center bg-gradient-to-t from-[#FDFBFB] via-[#FDFBFB]/90 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_60%,transparent_100%)] pointer-events-none">
          <style>{`
            @keyframes beauty-pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(43, 3, 10, 0.15); }
              50% { transform: scale(1.02); box-shadow: 0 12px 40px rgba(43, 3, 10, 0.25); }
            }
          `}</style>
          <button
            onClick={() => {
              resetFlow();
              setIsStorefront(false);
            }}
            className="pointer-events-auto h-14 w-full sm:w-auto sm:px-16 rounded-full bg-zinc-950 text-white text-[16px] font-medium hover:bg-zinc-800 transition-all duration-300 active:scale-95 shadow-xl"
            style={{ animation: "beauty-pulse 3s ease-in-out infinite" }}
          >
            Записатися
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFB] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF0F0]/50 via-[#FDFBFB] to-[#FDFBFB] pb-24 sm:pb-28">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/60 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex justify-start">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:h-10 sm:w-10"
              >
                <ChevronLeft size={18} />
              </button>
            ) : step === 1 && masterInfo ? (
              <button
                onClick={() => setIsStorefront(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:h-10 sm:w-10"
              >
                <ChevronLeft size={18} />
              </button>
            ) : null}
          </div>

          <Brand />

          <div className="flex items-center justify-end gap-2">
            {[1, 2, 3].map((itemStep) => {
              const active = itemStep === step;
              const done = itemStep < step;

              return (
                <div
                  key={itemStep}
                  className={`h-1.5 rounded-full transition-all ${active ? "w-6 bg-zinc-950" : done ? "w-2 bg-zinc-600" : "w-2 bg-zinc-200"}`}
                />
              );
            })}
          </div>
        </div>
      </header>

      {masterInfo && masterInfo.online_booking === false && (
        <div className="bg-amber-50 border-y border-amber-100 px-4 py-3 sm:px-6 flex items-center gap-2.5 text-[13px] font-medium text-amber-900">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          Онлайн-запис наразі вимкнено майстром. Ви можете переглядати послуги та віконця.
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {errorMsg && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
              {errorMsg}
            </div>
          )}

          {stepHeader && (
            <section>
              <h1 className="text-left text-[14px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                {stepHeader.title}
              </h1>
            </section>
          )}

          {step === 1 && (
            <ServiceSelector
              services={services}
              selectedService={selectedService}
              onSelectService={selectService}
            />
          )}

          {step === 2 && (
            <TimePicker
              availableDates={availableDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              timeSlots={displayTimeSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
              isSlotsLoading={isSlotsLoading}
            />
          )}

          {step === 3 &&
            selectedService &&
            selectedDate &&
            (masterInfo && masterInfo.online_booking === false ? (
              <div className="rounded-3xl border border-amber-100 bg-white p-6 sm:p-10 text-center max-w-xl mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CalendarDays className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-3">
                  Онлайн-запис наразі вимкнено
                </h2>
                <p className="text-[14px] text-zinc-500 leading-relaxed mb-8">
                  Майстер тимчасово призупинив онлайн-бронювання. Ви можете переглядати послуги та
                  вільні години, але підтвердити запис через сайт наразі неможливо. Будь ласка,
                  зв&apos;яжіться з майстром через контакти вище для бронювання.
                </p>
              </div>
            ) : (
              <BookingConfirmation
                masterId={masterId}
                service={selectedService}
                date={selectedDate}
                slot={selectedSlot!}
                onConfirm={handleConfirm}
                isSubmitting={isSubmitting}
                showContactForm={showContactForm}
              />
            ))}
        </div>
      </div>

      {step < 3 && (
        <footer className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/60 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-end px-4 py-2.5 sm:px-6 sm:py-4 lg:px-8">
            {step === 1 && (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`inline-flex w-full sm:w-auto h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 sm:h-auto sm:px-6 sm:py-3 ${canProceed
                  ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                  : "cursor-not-allowed bg-white/50 text-stone-400"
                  }`}
              >
                {selectedService ? "Далі" : "Оберіть послугу"}
                {selectedService && <ChevronRight size={18} />}
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`inline-flex w-full sm:w-auto h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 sm:h-auto sm:px-6 sm:py-3 ${canProceed
                  ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                  : "cursor-not-allowed bg-white/50 text-stone-400"
                  }`}
              >
                {selectedSlot ? "Далі" : "Оберіть час"}
                {selectedSlot && <ChevronRight size={18} />}
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};

export default BookingFlow;
