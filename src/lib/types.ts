/* ── Master Profile (public) ── */

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

/* ── Service ── */

export interface IService {
  id: number;
  master_id: number;
  title: string;
  description: string | null;
  price: number;
  duration: string;
  is_active: boolean;
}

/* ── Time Slots ── */

export interface IBookableTimeSlot {
  start_time: string;
  group_ids: number[];
}

/* ── Booking ── */

export interface IBookingService {
  id: number;
  title: string;
  price: number;
  duration: string;
}

export interface IBookingTimeSlot {
  start: string;
  end: string;
}

export interface IBooking {
  id: number;
  status: string;
  service: IBookingService;
  time_slot: IBookingTimeSlot;
  created_at: string;
}

export interface BookingData {
  masterId: number;
  serviceId: number;
  timeSlotIds: number[];
  date: Date;
  slot: IBookableTimeSlot;
  clientName?: string;
  clientPhone?: string;
  clientInstagram?: string;
  clientTelegram?: string;
}

export interface CreateAnonymousBookingPayload {
  master_id: number;
  service_id: number;
  time_slot_ids: number[];
  name: string;
  phone_number: string;
  instagram_username?: string;
  telegram_username?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}
