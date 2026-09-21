import z from "zod";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";


const TELEGRAM_HANDLE_REGEX = /^[a-zA-Z0-9_]{5,32}$/;
const INSTAGRAM_HANDLE_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

export const CurrencySchema = z.enum(["UAH", "USD", "EUR", "PLN"]);
export type Currency = z.infer<typeof CurrencySchema>;

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  flag: string;
  label: string;
}

export const CURRENCY_METADATA: Record<Currency, CurrencyInfo> = {
  UAH: { code: "UAH", symbol: "₴", flag: "🇺🇦", label: "Гривня" },
  USD: { code: "USD", symbol: "$", flag: "🇺🇸", label: "Долар США" },
  EUR: { code: "EUR", symbol: "€", flag: "🇪🇺", label: "Євро" },
  PLN: { code: "PLN", symbol: "zł", flag: "🇵🇱", label: "Злотий" },
};


/**
 * Convert an ISO 3166-1 alpha-2 country code to a Unicode flag emoji.
 *
 * @param countryCode - Two-letter country code (e.g., 'UA', 'PL').
 * @returns Unicode flag emoji string or empty string.
 */
export const getCountryFlagEmoji = (countryCode?: string | null): string => {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

/**
 * Zod schema for international phone number validation and normalization.
 *
 * Validates the input using libphonenumber-js and transforms it to E.164 format.
 */
export const phoneNumberSchema = z
  .string()
  .transform((val) => {
    const cleaned = val.replace(/\s+/g, "");
    return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  })
  .refine((val) => isValidPhoneNumber(val), {
    message: "Невірний номер телефону",
  })
  .transform((val) => parsePhoneNumberFromString(val)!.format("E.164"));

export interface IContact {
  address: string | null;
  about: string | null;
  telegram_link: string | null;
  instagram_link: string | null;
  google_maps_link: string | null;
  phone_number: string | null;
  has_telegram: boolean;
}

export interface IPhoto {
  photo_id: number;
  url: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface IPublicMasterProfile {
  master_id: number;
  name: string;
  contact: IContact;
  online_booking: boolean;
  avatar_url: string | null;
  cover_url: string | null;
  portfolio: IPhoto[];
  created_at: string;
  updated_at: string;
}

export interface IService {
  id: number;
  master_id: number;
  title: string;
  description: string | null;
  price: string;
  currency: Currency; 
  duration: string;
  is_active: boolean;
}

export interface IBookableTimeSlot {
  start_time: string;
  group_ids: number[];
}

export interface ITimeSlot {
  start: string;
  end: string;
}

export const bookingStatusSchema = z.enum([
  "active",
  "pending",
  "cancelled",
  "completed",
]);

export type IBookingStatus = z.infer<typeof bookingStatusSchema>;

export interface IBooking {
  id: number;
  status: IBookingStatus | string;
  service: IService;
  time_slot: ITimeSlot;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

export const createBookingSchema = z.object({
  master_id: z.number().int().positive(),
  service_id: z.number().int().positive(),
  time_slot_ids: z
    .array(z.number().int().positive())
    .min(1, "Оберіть часовий слот"),
  name: z
    .string()
    .trim()
    .min(2, "Ім'я повинно містити щонайменше 2 символи")
    .max(100, "Ім'я не може перевищувати 100 символів"),
  phone_number: phoneNumberSchema,
  instagram_username: z
    .string()
    .optional()
    .nullable()
    .transform((v) => {
      if (!v) return null;
      const s = v.trim().replace(/^@+/, "");
      return s.length > 0 ? s : null;
    })
    .pipe(
      z
        .string()
        .regex(
          INSTAGRAM_HANDLE_REGEX,
          "Instagram нікнейм повинен містити від 1 до 30 символів",
        )
        .nullable(),
    ),
  telegram_username: z
    .string()
    .optional()
    .nullable()
    .transform((v) => {
      if (!v) return null;
      const s = v.trim().replace(/^@+/, "");
      return s.length > 0 ? s : null;
    })
    .pipe(
      z
        .string()
        .regex(
          TELEGRAM_HANDLE_REGEX,
          "Telegram нікнейм повинен містити від 5 до 32 символів",
        )
        .nullable(),
    ),
});

export type ICreateBooking = z.infer<typeof createBookingSchema>;
