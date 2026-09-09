import z from "zod";


const PHONE_E164_REGEX = /^\+380\d{9}$/;
const TELEGRAM_HANDLE_REGEX = /^[a-zA-Z0-9_]{5,32}$/;
const INSTAGRAM_HANDLE_REGEX = /^[a-zA-Z0-9._]{1,30}$/;


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
  price: number;
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
  phone_number: z
    .string()
    .transform((v) => {
      const clean = v.replace(/[\s\-()]/g, "");
      if (clean.startsWith("+380")) return clean;
      if (clean.startsWith("380")) return `+${clean}`;
      if (clean.startsWith("0")) return `+38${clean}`;
      return clean;
    })
    .pipe(
      z
        .string()
        .regex(PHONE_E164_REGEX, "Номер телефону має бути у форматі +380XXXXXXXXX"),
    ),
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
