import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  IBooking,
  IBookingHistory,
  IService,
  IBookableTimeSlot,
  ICreateBooking,
} from "@/lib/types";

interface UseBookingFlowOptions {
  onComplete:
    | ((data: ICreateBooking) => Promise<IBookingHistory | IBooking>)
    | ((data: ICreateBooking) => IBookingHistory | IBooking);
  maxSteps?: number;
  initialDate?: Date | null;
}

export interface UseBookingFlowReturn {
  step: number;
  selectedServices: IService[];
  selectedDate: Date | null;
  selectedSlot: IBookableTimeSlot | null;
  isSubmitting: boolean;
  canProceed: boolean;

  toggleService: (service: IService) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedSlot: (slot: IBookableTimeSlot | null) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleBook: (booking: ICreateBooking) => Promise<IBookingHistory | IBooking>;
  resetFlow: () => void;
}

/**
 * Hook managing the multi-step booking state machine.
 *
 * Args:
 *     options: Booking configuration options.
 *
 * Returns:
 *     UseBookingFlowReturn: Flow state and control handlers.
 */
export const useBookingFlow = (
  options: UseBookingFlowOptions,
): UseBookingFlowReturn => {
  const { onComplete, maxSteps = 3, initialDate = null } = options;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => initialDate);
  const [selectedSlot, setSelectedSlot] = useState<IBookableTimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceed =
    step === 1
      ? selectedServices.length > 0
      : Boolean(selectedDate && selectedSlot);

  const toggleService = (service: IService) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      return exists ? prev.filter((s) => s.id !== service.id) : [...prev, service];
    });
    setSelectedSlot(null);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleNext = () => {
    if (step < maxSteps) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedDate(initialDate);
    setSelectedSlot(null);
    setIsSubmitting(false);
  };

  const handleBook = async (booking: ICreateBooking) => {
    setIsSubmitting(true);
    try {
      const result = await onComplete(booking);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    selectedServices,
    selectedDate,
    selectedSlot,
    isSubmitting,
    canProceed,
    toggleService,
    setSelectedDate: handleDateChange,
    setSelectedSlot,
    handleNext,
    handleBack,
    handleBook,
    resetFlow,
  };
};
