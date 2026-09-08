"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  value: string; // "yyyy-MM-dd"
  onChange: (date: string) => void;
  availableDates?: string[];
  className?: string;
  compact?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  value,
  onChange,
  availableDates,
  className = "",
  compact = true,
}) => {
  const [currentMonth, setCurrentMonth] = useState(value ? parseISO(value) : new Date());

  const onDateClick = (day: Date) => {
    onChange(format(day, "yyyy-MM-dd"));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const selectedDate = value ? parseISO(value) : null;

  const navBtnClass = compact
    ? "p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
    : "p-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 transition-colors";

  const titleClass = compact
    ? "text-sm font-semibold uppercase tracking-wide text-slate-700"
    : "text-sm font-semibold capitalize tracking-wide text-zinc-950 sm:text-base";

  const weekdayClass = compact
    ? "text-center text-[10px] text-slate-400 font-semibold py-1"
    : "text-center text-[10px] sm:text-xs text-zinc-400 font-semibold py-1 uppercase tracking-wider";

  const gridGapClass = compact ? "gap-1" : "gap-1 sm:gap-1.5";

  return (
    <div className={`${compact ? "w-[288px] sm:w-[320px]" : "w-full"} ${className}`}>
      {/* Month Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className={navBtnClass}
        >
          <ChevronLeft size={compact ? 18 : 16} />
        </button>
        <span className={titleClass}>
          {format(currentMonth, compact ? "LLLL yyyy" : "LLLL yyyy", { locale: uk })}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className={navBtnClass}
        >
          <ChevronRight size={compact ? 18 : 16} />
        </button>
      </div>

      {/* Week Days */}
      <div className={`grid grid-cols-7 mb-2 text-center ${compact ? "" : "gap-1"}`}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
          <div key={day} className={weekdayClass}>
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className={`grid grid-cols-7 ${gridGapClass}`}>
        {calendarDays.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const current = isSameMonth(day, monthStart);
          const dateKey = format(day, "yyyy-MM-dd");
          const isAvailable = !availableDates || availableDates.includes(dateKey);

          let buttonSizeClass = "";
          let buttonStateClass = "";

          if (compact) {
            buttonSizeClass = "h-9 w-9 sm:h-10 sm:w-10 rounded-lg text-sm";
            if (isSelected) {
              buttonStateClass = "bg-slate-900 text-white";
            } else if (current && isAvailable) {
              buttonStateClass = "text-slate-700 hover:bg-slate-100";
            } else if (current) {
              buttonStateClass = "text-slate-300 cursor-not-allowed";
            } else {
              buttonStateClass = "text-slate-100";
            }
          } else {
            buttonSizeClass =
              "flex h-9 w-full items-center justify-center rounded-xl text-sm sm:h-12";
            if (isSelected) {
              buttonStateClass = "bg-zinc-950 text-white shadow-md border border-zinc-950";
            } else if (current && isAvailable) {
              buttonStateClass =
                "text-zinc-800 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm";
            } else if (current) {
              buttonStateClass =
                "text-zinc-300 bg-zinc-50 border border-zinc-100 cursor-not-allowed";
            } else {
              buttonStateClass = "text-zinc-100 pointer-events-none opacity-0";
            }
          }

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={!current || !isAvailable}
              onClick={() => onDateClick(day)}
              className={`${buttonSizeClass} ${buttonStateClass} font-semibold transition-all active:scale-95`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
