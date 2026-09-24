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

export type FieldType = "instagram" | "telegram" | "comment" | "last_name";

export interface IFormField {
  type: FieldType;
  isVisible: boolean;
  isRequired: boolean;
  position: number;
}

export interface IMasterCustomization {
  customizationId: number | null;
  formFields: IFormField[];
}

export const DEFAULT_FORM_FIELDS: IFormField[] = [
  { type: "last_name", isVisible: true, isRequired: false, position: 0 },
  { type: "instagram", isVisible: true, isRequired: false, position: 1 },
  { type: "telegram", isVisible: true, isRequired: false, position: 2 },
  { type: "comment", isVisible: false, isRequired: false, position: 3 },
];

/**
 * Create a booking validation schema with field constraints applied from master settings.
 *
 * @param formFields - Form field configuration settings.
 * @returns Booking creation validation schema.
 */
export const createBookingSchema = (formFields?: IFormField[] | null) => {
  const fields = formFields ?? DEFAULT_FORM_FIELDS;
  const lastNameField = fields.find((f) => f.type === "last_name");
  const instagramField = fields.find((f) => f.type === "instagram");
  const telegramField = fields.find((f) => f.type === "telegram");
  const commentField = fields.find((f) => f.type === "comment");

  const isLastNameRequired = Boolean(lastNameField?.isVisible && lastNameField?.isRequired);
  const isInstagramRequired = Boolean(instagramField?.isVisible && instagramField?.isRequired);
  const isTelegramRequired = Boolean(telegramField?.isVisible && telegramField?.isRequired);
  const isCommentRequired = Boolean(commentField?.isVisible && commentField?.isRequired);

  return z.object({
    master_id: z.number().int().positive(),
    service_id: z.number().int().positive(),
    time_slot_ids: z
      .array(z.number().int().positive())
      .min(1, "Оберіть часовий слот"),
    first_name: z
      .string()
      .trim()
      .min(2, "Ім'я повинно містити щонайменше 2 символи")
      .max(100, "Ім'я не може перевищувати 100 символів"),
    last_name: isLastNameRequired
      ? z
          .string({ error: "Вкажіть прізвище" })
          .trim()
          .min(2, "Прізвище повинно містити щонайменше 2 символи")
          .max(100, "Прізвище не може перевищувати 100 символів")
      : z
          .string()
          .optional()
          .nullable()
          .transform((v) => {
            if (!v) return null;
            const s = v.trim();
            return s.length > 0 ? s : null;
          })
          .pipe(
            z
              .string()
              .min(2, "Прізвище повинно містити щонайменше 2 символи")
              .max(100, "Прізвище не може перевищувати 100 символів")
              .nullable(),
          ),
    phone_number: phoneNumberSchema,
    instagram_username: isInstagramRequired
      ? z
          .string({ error: "Вкажіть Instagram нікнейм" })
          .trim()
          .min(1, "Вкажіть Instagram нікнейм")
          .transform((v) => v.replace(/^@+/, ""))
          .pipe(
            z
              .string()
              .regex(
                INSTAGRAM_HANDLE_REGEX,
                "Instagram нікнейм повинен містити від 1 до 30 символів",
              ),
          )
      : z
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
    telegram_username: isTelegramRequired
      ? z
          .string({ error: "Вкажіть Telegram нікнейм" })
          .trim()
          .min(1, "Вкажіть Telegram нікнейм")
          .transform((v) => v.replace(/^@+/, ""))
          .pipe(
            z
              .string()
              .min(5, "Telegram нікнейм повинен містити від 5 до 32 символів")
              .regex(
                TELEGRAM_HANDLE_REGEX,
                "Telegram нікнейм повинен містити від 5 до 32 символів",
              ),
          )
      : z
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
    comment: isCommentRequired
      ? z.string({ error: "Додайте коментар" }).trim().min(1, "Додайте коментар")
      : z
          .string()
          .optional()
          .nullable()
          .transform((v) => {
            if (!v) return null;
            const s = v.trim();
            return s.length > 0 ? s : null;
          }),
  });
};

export type ICreateBooking = z.infer<ReturnType<typeof createBookingSchema>>;
