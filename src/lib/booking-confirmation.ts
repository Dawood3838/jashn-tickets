import type { Event } from "@/types/event";
import type {
  Booking,
  BookingConfirmationData,
} from "@/types/booking";

export function prepareBookingConfirmation(
  booking: Booking,
  event?: Event,
): BookingConfirmationData {
  const matchingEvent = event?.id === booking.eventId ? event : undefined;

  return {
    reference: booking.reference,
    event: matchingEvent
      ? {
          id: matchingEvent.id,
          title: matchingEvent.title,
          date: matchingEvent.date,
          time: matchingEvent.time,
          venue: matchingEvent.venue,
          city: matchingEvent.city,
        }
      : null,
    customer: { ...booking.customer },
    priceBreakdown: {
      selectedTickets: booking.selectedTickets.map((ticket) => ({ ...ticket })),
      subtotal: booking.subtotal,
      total: booking.total,
      currency: booking.currency,
    },
    status: booking.status,
    createdAt: booking.createdAt,
  };
}
