"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";

import type { IBookableTimeSlot } from "@/lib/types";
import CustomCalendar from "@/components/ui/CustomCalendar";

interface TimePickerProps {
  availableDates: string[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  timeSlots: IBookableTimeSlot[];
  selectedSlot: IBookableTimeSlot | null;
  onSelectSlot: (slot: IBookableTimeSlot) => void;
  isSlotsLoading?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  availableDates,
  selectedDate,
  onSelectDate,
  timeSlots,
  selectedSlot,
  onSelectSlot,
  isSlotsLoading = false,
}) => {
  const formatSlotTime = (slot: IBookableTimeSlot) => {
    const start = parseISO(slot.start_time);
    return format(start, "HH:mm");
  };

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
      {/* Inline Calendar Grid */}
      <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-[24px] bg-white/60 backdrop-blur-md border border-white/80 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)] sm:p-5 md:max-w-lg">
        <CustomCalendar
          value={selectedDateStr}
          onChange={(dateStr) => onSelectDate(parseISO(dateStr))}
          availableDates={availableDates}
          className="w-full"
          compact={false}
        />
      </div>

      {/* Available Time Slots Grid */}
      <div className="w-full max-w-md flex-1 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between border-b border-white/50 pb-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Доступний час
          </h4>
          {isSlotsLoading && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              Оновлення...
            </div>
          )}
        </div>

        {isSlotsLoading && timeSlots.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-[24px] bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <Loader2 className="h-6 w-6 animate-spin text-zinc-300" />
          </div>
        ) : timeSlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot?.start_time === slot.start_time;
              const slotTime = formatSlotTime(slot);

              return (
                <button
                  key={slot.start_time}
                  onClick={() => onSelectSlot(slot)}
                  className={`w-full rounded-full px-2 py-2 text-sm font-semibold transition-all active:scale-95 sm:px-4 sm:py-2.5 ${
                    isSelected
                      ? "bg-zinc-950 text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                      : "bg-white/40 text-stone-700 shadow-sm hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  {slotTime}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[24px] bg-white/60 backdrop-blur-md border border-white/80 px-4 py-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <p className="text-sm font-medium text-zinc-400">
              На обрану дату вільних віконець немає
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
