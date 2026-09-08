import type {
  IPublicMasterProfile,
  IService,
  IBookableTimeSlot,
  IBooking,
  CreateAnonymousBookingPayload,
  PaginatedResponse,
} from "./types";

/**
 * Resolve the base URL for API calls.
 * Server-side uses API_URL (internal network); client-side uses relative path (proxied).
 */
function getBaseUrl(): string {
  if (typeof window === "undefined") {
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
  }
  return process.env.NEXT_PUBLIC_API_URL || "";
}

/**
 * Thin fetch wrapper with error handling.
 */
async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API ${response.status}: ${text || response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch public master profile by token. Called server-side for SSR.
 */
export async function fetchPublicMasterProfile(
  masterToken: string,
): Promise<IPublicMasterProfile> {
  return apiFetch<IPublicMasterProfile>(
    `/api/v1/masters/${encodeURIComponent(masterToken)}/public-profile`,
  );
}

/**
 * Fetch active services for a master.
 */
export async function fetchServices(
  masterId: number,
): Promise<IService[]> {
  const response = await apiFetch<PaginatedResponse<IService>>(
    `/api/v1/services?master_id=${masterId}&is_active=true`,
  );
  return response.items;
}

/**
 * Fetch available dates for a master.
 */
export async function fetchAvailableDates(
  masterId: number,
): Promise<string[]> {
  return apiFetch<string[]>(
    `/api/v1/time-slots/available-dates?master_id=${masterId}`,
  );
}

/**
 * Fetch bookable time slots for a master on a specific date.
 */
export async function fetchBookableTimeSlots(
  masterId: number,
  duration: string,
  date: string,
): Promise<IBookableTimeSlot[]> {
  return apiFetch<IBookableTimeSlot[]>(
    `/api/v1/time-slots/bookable?master_id=${masterId}&duration=${encodeURIComponent(duration)}&on_date=${date}`,
  );
}

/**
 * Create an anonymous booking.
 */
export async function createAnonymousBooking(
  payload: CreateAnonymousBookingPayload,
): Promise<IBooking> {
  return apiFetch<IBooking>("/api/v1/bookings/anonymous", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
