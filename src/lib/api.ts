import type {
  IPublicMasterProfile,
  IService,
  IBookableTimeSlot,
  IBooking,
  ICreateBooking,
  PaginatedResponse,
} from "./types";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly response?: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.response = response;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, response?: unknown) {
    super(message, 422, response);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, response?: unknown) {
    super(message, 404, response);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, response?: unknown) {
    super(message, 409, response);
    this.name = "ConflictError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, response?: unknown) {
    super(message, 403, response);
    this.name = "ForbiddenError";
  }
}

export class ServerError extends ApiError {
  constructor(message: string, response?: unknown) {
    super(message, 500, response);
    this.name = "ServerError";
  }
}

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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string>),
  };

  if (typeof window === "undefined" && process.env.INTERNAL_API_TOKEN) {
    headers["x-internal-token"] = process.env.INTERNAL_API_TOKEN;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers,
    });
    } catch (networkError) {
    if (networkError instanceof ApiError) {
      throw networkError;
    }
    throw new ApiError("Помилка мережі", 0, networkError);
  }


  if (!response.ok) {
    interface ValidationDetail {
      loc: string[];
      msg: string;
    }

    interface ApiErrorData {
      detail?: string | ValidationDetail[];
      message?: string;
    }

    const responseData = (await response.json().catch(() => null)) as ApiErrorData | null;
    const detail = responseData?.detail;
    const message =
      responseData?.message ||
      (typeof detail === "string" ? detail : undefined) ||
      (Array.isArray(detail)
        ? detail.map((d: ValidationDetail) => `${d.loc.join(".")}: ${d.msg}`).join("; ")
        : undefined) ||
      response.statusText;

    const status = response.status;

    if (status === 409) {
      throw new ConflictError(
        message || "Цей час уже зайнятий. Будь ласка, оберіть інший.",
        responseData,
      );
    }

    if (status === 400 || status === 422) {
      throw new ValidationError(
        message || "Будь ласка, перевірте коректність введених даних.",
        responseData,
      );
    }

    throw new ApiError(
      "Не вдалося створити бронювання. Будь ласка, спробуйте ще раз або зверніться до підтримки.",
      status,
      responseData,
    );
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
  payload: ICreateBooking,
): Promise<IBooking> {
  return apiFetch<IBooking>("/api/v1/bookings/anonymous", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
