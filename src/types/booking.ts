import type { Event } from "@/types/event";

export type BookingCurrency = Event["currency"];

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface BookingCustomer {
  name: string;
  email: string;
  phone?: string;
}

export interface TicketSelection {
  ticketTypeId: string;
  quantity: number;
}

export interface SelectedTicket extends TicketSelection {
  ticketTypeName: string;
  unitPrice: number;
  lineTotal: number;
}

export interface BookingPriceSummary {
  selectedTickets: readonly SelectedTicket[];
  subtotal: number;
  total: number;
  currency: BookingCurrency;
}

export interface Booking {
  reference: string;
  eventId: string;
  customer: BookingCustomer;
  selectedTickets: readonly SelectedTicket[];
  subtotal: number;
  total: number;
  currency: BookingCurrency;
  createdAt: string;
  status: BookingStatus;
}

export type BookingValidationField =
  | "customer.name"
  | "customer.email"
  | "customer.phone"
  | "tickets"
  | `tickets.${number}.ticketTypeId`
  | `tickets.${number}.quantity`;

export type BookingValidationCode =
  | "customer-name-required"
  | "customer-email-invalid"
  | "customer-phone-invalid"
  | "ticket-selection-required"
  | "event-sold-out"
  | "ticket-type-not-found"
  | "ticket-type-duplicate"
  | "ticket-type-unavailable"
  | "quantity-invalid"
  | "quantity-exceeds-availability"
  | "selection-exceeds-event-availability"
  | "ticket-price-invalid";

export interface BookingValidationError {
  field: BookingValidationField;
  code: BookingValidationCode;
  message: string;
}

export type BookingOperationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: readonly BookingValidationError[] };

export type BookingManagementErrorCode =
  | "booking-not-found"
  | "booking-reference-conflict"
  | "invalid-status-transition"
  | "cancellation-not-permitted"
  | "storage-error";

export interface BookingManagementError {
  code: BookingManagementErrorCode;
  message: string;
}

export type BookingManagementResult<T> =
  | { success: true; data: T }
  | { success: false; error: BookingManagementError };

export type BookingConfirmationEvent = Pick<
  Event,
  "id" | "title" | "date" | "time" | "venue" | "city"
>;

export interface BookingConfirmationData {
  reference: string;
  event: BookingConfirmationEvent | null;
  customer: BookingCustomer;
  priceBreakdown: BookingPriceSummary;
  status: BookingStatus;
  createdAt: string;
}
