import type { Event, EventTicketType } from "@/types/event";
import type {
  Booking,
  BookingCustomer,
  BookingOperationResult,
  BookingPriceSummary,
  BookingValidationError,
  SelectedTicket,
  TicketSelection,
} from "@/types/booking";

const PAISE_PER_RUPEE = 100;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d.\-\s]+$/;

interface TicketResolution {
  selectedTickets: SelectedTicket[];
  errors: BookingValidationError[];
  subtotalPaise: number;
}

function toPaise(amount: number): number | undefined {
  if (!Number.isFinite(amount) || amount < 0) {
    return undefined;
  }

  const paise = Math.round((amount + Number.EPSILON) * PAISE_PER_RUPEE);
  return Number.isSafeInteger(paise) ? paise : undefined;
}

function fromPaise(amount: number): number {
  return amount / PAISE_PER_RUPEE;
}

function resolveTicketSelections(
  event: Event,
  selections: readonly TicketSelection[],
): TicketResolution {
  const errors: BookingValidationError[] = [];
  const selectedTickets: SelectedTicket[] = [];
  const ticketTypes = new Map<string, EventTicketType>(
    event.ticketTypes.map((ticketType) => [ticketType.id, ticketType]),
  );
  const seenTicketTypeIds = new Set<string>();
  let totalQuantity = 0;
  let subtotalPaise = 0;
  const eventIsSoldOut =
    event.availability.status === "sold-out" ||
    event.availability.remaining <= 0;

  if (selections.length === 0) {
    errors.push({
      field: "tickets",
      code: "ticket-selection-required",
      message: "Select at least one ticket.",
    });
  }

  if (eventIsSoldOut) {
    errors.push({
      field: "tickets",
      code: "event-sold-out",
      message: "Tickets are not available for this event.",
    });
  }

  selections.forEach((selection, index) => {
    const ticketField = `tickets.${index}.ticketTypeId` as const;
    const quantityField = `tickets.${index}.quantity` as const;
    let selectionIsValid = true;

    if (seenTicketTypeIds.has(selection.ticketTypeId)) {
      errors.push({
        field: ticketField,
        code: "ticket-type-duplicate",
        message: "A ticket type can only be selected once.",
      });
      selectionIsValid = false;
    }
    seenTicketTypeIds.add(selection.ticketTypeId);

    const ticketType = ticketTypes.get(selection.ticketTypeId);
    if (!ticketType) {
      errors.push({
        field: ticketField,
        code: "ticket-type-not-found",
        message: "This ticket type is not available for the event.",
      });
      return;
    }

    if (!Number.isInteger(selection.quantity) || selection.quantity <= 0) {
      errors.push({
        field: quantityField,
        code: "quantity-invalid",
        message: "Ticket quantity must be a positive whole number.",
      });
      return;
    }

    totalQuantity += selection.quantity;

    if (ticketType.remaining <= 0) {
      errors.push({
        field: quantityField,
        code: "ticket-type-unavailable",
        message: `${ticketType.name} tickets are no longer available.`,
      });
      selectionIsValid = false;
    } else if (selection.quantity > ticketType.remaining) {
      errors.push({
        field: quantityField,
        code: "quantity-exceeds-availability",
        message: `Only ${ticketType.remaining} ${ticketType.name} tickets remain.`,
      });
      selectionIsValid = false;
    }

    const unitPricePaise = toPaise(ticketType.price);
    if (unitPricePaise === undefined) {
      errors.push({
        field: ticketField,
        code: "ticket-price-invalid",
        message: `${ticketType.name} has an invalid ticket price.`,
      });
      selectionIsValid = false;
    }

    if (selectionIsValid && unitPricePaise !== undefined) {
      const lineTotalPaise = unitPricePaise * selection.quantity;
      if (!Number.isSafeInteger(lineTotalPaise)) {
        errors.push({
          field: quantityField,
          code: "ticket-price-invalid",
          message: `${ticketType.name} total is outside the supported price range.`,
        });
        return;
      }

      const nextSubtotalPaise = subtotalPaise + lineTotalPaise;
      if (!Number.isSafeInteger(nextSubtotalPaise)) {
        errors.push({
          field: "tickets",
          code: "ticket-price-invalid",
          message: "The booking total is outside the supported price range.",
        });
        return;
      }

      subtotalPaise = nextSubtotalPaise;
      selectedTickets.push({
        ticketTypeId: ticketType.id,
        ticketTypeName: ticketType.name,
        quantity: selection.quantity,
        unitPrice: fromPaise(unitPricePaise),
        lineTotal: fromPaise(lineTotalPaise),
      });
    }
  });

  if (
    !eventIsSoldOut &&
    totalQuantity > event.availability.remaining
  ) {
    errors.push({
      field: "tickets",
      code: "selection-exceeds-event-availability",
      message: `Only ${event.availability.remaining} tickets remain for this event.`,
    });
  }

  return { selectedTickets, errors, subtotalPaise };
}

export function validateCustomer(
  customer: BookingCustomer,
): BookingValidationError[] {
  const errors: BookingValidationError[] = [];
  const name = typeof customer.name === "string" ? customer.name.trim() : "";
  const email =
    typeof customer.email === "string" ? customer.email.trim() : "";
  const phone =
    typeof customer.phone === "string" ? customer.phone.trim() : "";

  if (!name) {
    errors.push({
      field: "customer.name",
      code: "customer-name-required",
      message: "Enter your name.",
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.push({
      field: "customer.email",
      code: "customer-email-invalid",
      message: "Enter a valid email address.",
    });
  }

  if (phone) {
    const digitCount = phone.replace(/\D/g, "").length;
    if (
      !PHONE_PATTERN.test(phone) ||
      digitCount < 7 ||
      digitCount > 15
    ) {
      errors.push({
        field: "customer.phone",
        code: "customer-phone-invalid",
        message: "Enter a valid phone number or leave it blank.",
      });
    }
  }

  return errors;
}

export function validateTicketSelections(
  event: Event,
  selections: readonly TicketSelection[],
): BookingValidationError[] {
  return resolveTicketSelections(event, selections).errors;
}

export function selectTicketTypes(
  event: Event,
  selections: readonly TicketSelection[],
): BookingOperationResult<readonly SelectedTicket[]> {
  const resolution = resolveTicketSelections(event, selections);
  if (resolution.errors.length > 0) {
    return { success: false, errors: resolution.errors };
  }

  return { success: true, data: resolution.selectedTickets };
}

/**
 * Rounds each unit price to the nearest paisa, then totals in integer paise.
 * The total equals the subtotal; no fees, taxes, or discounts are added.
 */
export function calculateBookingPrice(
  event: Event,
  selections: readonly TicketSelection[],
): BookingOperationResult<BookingPriceSummary> {
  const resolution = resolveTicketSelections(event, selections);
  if (resolution.errors.length > 0) {
    return { success: false, errors: resolution.errors };
  }

  const subtotal = fromPaise(resolution.subtotalPaise);
  return {
    success: true,
    data: {
      selectedTickets: resolution.selectedTickets,
      subtotal,
      total: subtotal,
      currency: event.currency,
    },
  };
}

export function generateBookingReference(): string {
  return `JASHN-${globalThis.crypto.randomUUID().replace(/-/g, "").toUpperCase()}`;
}

function normalizeCustomer(customer: BookingCustomer): BookingCustomer {
  const phone =
    typeof customer.phone === "string" ? customer.phone.trim() : "";

  return {
    name: customer.name.trim(),
    email: customer.email.trim(),
    ...(phone ? { phone } : {}),
  };
}

/**
 * Creates an in-memory booking object. It does not persist the booking or
 * reserve inventory.
 */
export function createBooking(
  event: Event,
  customer: BookingCustomer,
  selections: readonly TicketSelection[],
): BookingOperationResult<Booking> {
  const customerErrors = validateCustomer(customer);
  const priceResult = calculateBookingPrice(event, selections);

  if (!priceResult.success) {
    return {
      success: false,
      errors: [...customerErrors, ...priceResult.errors],
    };
  }

  if (customerErrors.length > 0) {
    return { success: false, errors: customerErrors };
  }

  const priceSummary = priceResult.data;
  return {
    success: true,
    data: {
      reference: generateBookingReference(),
      eventId: event.id,
      customer: normalizeCustomer(customer),
      selectedTickets: priceSummary.selectedTickets,
      subtotal: priceSummary.subtotal,
      total: priceSummary.total,
      currency: priceSummary.currency,
      createdAt: new Date().toISOString(),
      status: "pending",
    },
  };
}
