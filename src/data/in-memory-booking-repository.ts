import type { Booking } from "@/types/booking";
import type {
  BookingRepository,
  BookingRepositoryResult,
} from "@/types/booking-repository";

function copyBooking(booking: Booking): Booking {
  return {
    ...booking,
    customer: { ...booking.customer },
    selectedTickets: booking.selectedTickets.map((ticket) => ({ ...ticket })),
  };
}

function success<T>(data: T): BookingRepositoryResult<T> {
  return { success: true, data };
}

export function createInMemoryBookingRepository(): BookingRepository {
  const bookings = new Map<string, Booking>();

  return {
    async save(booking) {
      if (bookings.has(booking.reference)) {
        return {
          success: false,
          error: {
            code: "duplicate-reference",
            message: `A booking with reference ${booking.reference} already exists.`,
          },
        };
      }

      const savedBooking = copyBooking(booking);
      bookings.set(savedBooking.reference, savedBooking);
      return success(copyBooking(savedBooking));
    },

    async findByReference(reference) {
      const booking = bookings.get(reference);
      return success(booking ? copyBooking(booking) : undefined);
    },

    async update(booking) {
      if (!bookings.has(booking.reference)) {
        return success(undefined);
      }

      const updatedBooking = copyBooking(booking);
      bookings.set(updatedBooking.reference, updatedBooking);
      return success(copyBooking(updatedBooking));
    },

    async list() {
      return success([...bookings.values()].map(copyBooking));
    },
  };
}
