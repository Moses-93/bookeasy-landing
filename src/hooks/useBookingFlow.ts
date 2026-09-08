import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IBooking, IService, IBookableTimeSlot, BookingData } from "@/lib/types";

interface UseBookingFlowOptions {
  masterId: number;
  onComplete: ((data: BookingData) => Promise<IBooking>) | ((data: BookingData) => IBooking);
  maxSteps?: number;
}

export interface UseBookingFlowReturn {
  step: number;
  selectedServiceId: number | null;
  selectedDate: Date;
  selectedSlot: IBookableTimeSlot | null;
  clientName: string;
  clientPhone: string;
  clientInstagram: string;
  clientTelegram: string;
  isSubmitting: boolean;

  selectedService: IService | null;
  canProceed: boolean;

  setSelectedServiceId: (id: number | null) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedSlot: (slot: IBookableTimeSlot | null) => void;
  setClientName: (name: string) => void;
  setClientPhone: (phone: string) => void;
  setClientInstagram: (instagram: string) => void;
  setClientTelegram: (telegram: string) => void;
  selectService: (id: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleBook: () => Promise<IBooking>;
}

const normalizePhoneTail = (value: string): string => {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("380")) {
    digits = digits.slice(3);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 9);
};

const toSubmitPhoneNumber = (value: string): string => {
  const digits = normalizePhoneTail(value);
  return digits ? `+380${digits}` : "";
};

export const useBookingFlow = (
  services: IService[],
  options: UseBookingFlowOptions,
): UseBookingFlowReturn => {
  const { masterId, onComplete, maxSteps = 4 } = options;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<IBookableTimeSlot | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientInstagram, setClientInstagram] = useState("");
  const [clientTelegram, setClientTelegram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || null;

  const canProceed = (() => {
    switch (step) {
      case 1:
        return selectedServiceId !== null;
      case 2:
        return selectedSlot !== null;
      case 3:
        return true;
      default:
        return false;
    }
  })();

  const selectService = (id: number) => {
    setSelectedServiceId(id);
    setSelectedSlot(null);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleNext = () => {
    if (step < maxSteps) {
      setStep((prev: number) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev: number) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleBook = async () => {
    if (selectedServiceId && selectedSlot) {
      const bookingData: BookingData = {
        masterId,
        serviceId: selectedServiceId,
        timeSlotIds: selectedSlot.group_ids,
        date: selectedDate,
        slot: selectedSlot,
        clientName,
        clientPhone: toSubmitPhoneNumber(clientPhone),
        clientInstagram: clientInstagram.trim().replace(/^@/, "") || undefined,
        clientTelegram: clientTelegram.trim().replace(/^@/, "") || undefined,
      };

      setIsSubmitting(true);

      try {
        const result = await onComplete(bookingData);
        setStep(4);
        return result;
      } finally {
        setIsSubmitting(false);
      }
    }

    throw new Error("Сервіс або слот не обрано.");
  };

  return {
    step,
    selectedServiceId,
    selectedDate,
    selectedSlot,
    clientName,
    clientPhone,
    clientInstagram,
    clientTelegram,
    isSubmitting,
    selectedService,
    canProceed,
    setSelectedServiceId,
    setSelectedDate: handleDateChange,
    setSelectedSlot,
    setClientName,
    setClientPhone: (phone) => setClientPhone(normalizePhoneTail(phone)),
    setClientInstagram,
    setClientTelegram,
    selectService,
    handleNext,
    handleBack,
    handleBook,
  };
};
