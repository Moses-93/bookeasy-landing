import { format } from "date-fns";
import { uk } from "date-fns/locale";
import type { IBookingStatus } from "@/lib/types";

/**
 * Format price in kopecks to human-readable UAH string.
 *
 * @example formatPrice(22500) → "225 ₴"
 */
export const formatPrice = (kopecks: number): string => {
  const uah = kopecks / 100;
  const amount = new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: Number.isInteger(uah) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(uah);
  return `${amount} ₴`;
};

/**
 * Parse ISO 8601 duration to total minutes.
 *
 * @example getDurationMinutes("PT1H30M") → 90
 */
export const getDurationMinutes = (iso8601: string): number => {
  const match = iso8601.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours * 60 + minutes;
};

/**
 * Format ISO 8601 duration to human-readable Ukrainian string.
 *
 * @example formatDuration("PT1H30M") → "1 год 30 хв"
 */
export const formatDuration = (iso8601: string): string => {
  const totalMinutes = getDurationMinutes(iso8601);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours} год ${minutes} хв`;
  if (hours > 0) return `${hours} год`;
  return `${totalMinutes} хв`;
};

/**
 * Format date to long Ukrainian format.
 *
 * @example formatLongDate(new Date("2025-03-15")) → "15 березня 2025"
 */
export const formatLongDate = (value: string | Date): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, "d MMMM yyyy", { locale: uk });
};

/**
 * Format date/time to HH:mm string.
 *
 * @example formatTime("2025-03-15T14:30:00Z") → "14:30"
 */
export const formatTime = (value: string | Date): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, "HH:mm");
};

/**
 * Parse decimal string to number.
 */
export const parseDecimalString = (value: string): number | null => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Booking status label mapping.
 */
const STATUS_LABELS: Record<IBookingStatus, string> = {
  pending: "Очікує",
  active: "Підтверджено",
  cancelled: "Скасовано",
  completed: "Завершено",
};

export const getBookingStatusLabel = (status: string): string =>
  STATUS_LABELS[status as IBookingStatus] ?? status;
