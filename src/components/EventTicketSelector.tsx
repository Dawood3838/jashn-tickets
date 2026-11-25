"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingSummary, {
  type BookingSummaryLine,
} from "@/components/BookingSummary";
import Button from "@/components/Button";
import {
  calculateBookingPrice,
  selectTicketTypes,
} from "@/lib/booking";
import type { Event, EventTicketType } from "@/types/event";

interface EventTicketSelectorProps {
  event: Event;
}

function formatPrice(currency: string, amount: number): string {
  return `${currency} ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export default function EventTicketSelector({
  event,
}: EventTicketSelectorProps) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>(
    {},
  );
  const [selectionError, setSelectionError] = useState("");

  const selections = useMemo(
    () =>
      event.ticketTypes.flatMap((ticketType) => {
        const quantity = quantities[ticketType.id] ?? 0;
        return quantity > 0
          ? [{ ticketTypeId: ticketType.id, quantity }]
          : [];
      }),
    [event.ticketTypes, quantities],
  );
  const priceResult =
    selections.length > 0
      ? calculateBookingPrice(event, selections)
      : undefined;
  const priceSummary =
    priceResult?.success === true ? priceResult.data : undefined;
  const isSoldOut =
    event.availability.status === "sold-out" ||
    event.availability.remaining <= 0;
  const hasAvailableTicketType = event.ticketTypes.some(
    (ticketType) => ticketType.remaining > 0,
  );
  const noTicketsAvailable = isSoldOut || !hasAvailableTicketType;
  const selectedTickets = priceSummary?.selectedTickets ?? [];
  const subtotal = priceSummary?.subtotal ?? 0;
  const summaryLines: BookingSummaryLine[] = [
    { label: "Event", value: event.title },
    ...selectedTickets.map((ticket) => ({
      label: `${ticket.quantity} × ${ticket.ticketTypeName}`,
      value: formatPrice(event.currency, ticket.lineTotal),
    })),
  ];

  function getMaximumQuantity(ticketType: EventTicketType): number {
    const selectedForOtherTypes = event.ticketTypes.reduce(
      (total, otherType) =>
        otherType.id === ticketType.id
          ? total
          : total + (quantities[otherType.id] ?? 0),
      0,
    );

    return Math.max(
      0,
      Math.min(
        ticketType.remaining,
        event.availability.remaining - selectedForOtherTypes,
      ),
    );
  }

  function updateQuantity(ticketType: EventTicketType, value: string) {
    const quantity = value === "" ? 0 : Number(value);
    if (!Number.isInteger(quantity) || quantity < 0) {
      setQuantityErrors((current) => ({
        ...current,
        [ticketType.id]: "Enter a non-negative whole number.",
      }));
      return;
    }

    const maximum = getMaximumQuantity(ticketType);
    if (quantity > maximum) {
      setQuantityErrors((current) => ({
        ...current,
        [ticketType.id]: `You can select up to ${maximum} for this ticket type.`,
      }));
      return;
    }

    setQuantities((current) => ({ ...current, [ticketType.id]: quantity }));
    setQuantityErrors((current) => {
      const next = { ...current };
      delete next[ticketType.id];
      return next;
    });
    setSelectionError("");
  }

  function continueToBooking() {
    const result = selectTicketTypes(event, selections);
    if (!result.success) {
      setSelectionError(result.errors.map((error) => error.message).join(" "));
      return;
    }

    const params = new URLSearchParams({ eventId: event.id });
    result.data.forEach((ticket) => {
      params.append("ticketId", ticket.ticketTypeId);
      params.append("quantity", String(ticket.quantity));
    });
    router.push(`/booking?${params.toString()}`);
  }

  const canContinue =
    !noTicketsAvailable &&
    selections.length > 0 &&
    priceSummary !== undefined;
  const calculationError =
    priceResult && !priceResult.success
      ? priceResult.errors.map((error) => error.message).join(" ")
      : "";

  return (
    <>
      <BookingSummary
        heading="Your selection"
        lines={summaryLines}
        serviceFee="None"
        subtotal={formatPrice(event.currency, subtotal)}
        total={formatPrice(event.currency, subtotal)}
      />
      <section
        aria-labelledby="ticket-selection-heading"
        className="mt-4 rounded-3xl border border-violet/10 bg-white p-5 shadow-[0_12px_30px_rgba(115,87,255,0.06)] sm:p-6"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
          Select tickets
        </p>
        <h2
          className="mt-2 text-xl font-extrabold tracking-[-0.04em] text-charcoal"
          id="ticket-selection-heading"
        >
          Choose your ticket types
        </h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          {isSoldOut
            ? "Tickets for this event are sold out."
            : `${event.availability.remaining} tickets are available for this event.`}
        </p>

        {noTicketsAvailable ? (
          <p className="mt-5 rounded-2xl bg-lavender p-4 text-sm font-semibold text-charcoal">
            No tickets are currently available to select.
          </p>
        ) : null}
        {event.ticketTypes.length === 0 ? (
          <p className="mt-5 rounded-2xl bg-lavender p-4 text-sm font-semibold text-charcoal">
            Ticket types have not been listed for this event.
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            {event.ticketTypes.map((ticketType, index) => {
              const maximum = getMaximumQuantity(ticketType);
              const ticketSoldOut = ticketType.remaining <= 0;
              const disabled =
                ticketSoldOut || isSoldOut || maximum === 0;
              const quantityId = `ticket-quantity-${index}`;
              const hintId = `ticket-hint-${index}`;
              const errorId = `ticket-error-${index}`;
              const error = quantityErrors[ticketType.id];

              return (
                <div
                  className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  key={ticketType.id}
                >
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-charcoal">
                      {ticketType.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-violet">
                      {formatPrice(event.currency, ticketType.price)}
                    </p>
                    <p
                      className="mt-1 text-xs text-secondary"
                      id={hintId}
                    >
                      {ticketSoldOut
                        ? "Sold out"
                        : `${ticketType.remaining} remaining`}
                    </p>
                  </div>
                  <div className="grid gap-1 sm:w-32">
                    <label
                      className="text-xs font-bold text-charcoal"
                      htmlFor={quantityId}
                    >
                      Quantity
                    </label>
                    <input
                      aria-describedby={
                        error ? `${hintId} ${errorId}` : hintId
                      }
                      aria-invalid={Boolean(error)}
                      className="min-h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-charcoal outline-none transition-colors focus-visible:border-violet focus-visible:ring-2 focus-visible:ring-violet/30 disabled:cursor-not-allowed disabled:bg-lavender/50"
                      disabled={disabled}
                      id={quantityId}
                      max={maximum}
                      min={0}
                      onChange={(change) =>
                        updateQuantity(ticketType, change.currentTarget.value)
                      }
                      step={1}
                      type="number"
                      value={quantities[ticketType.id] ?? 0}
                    />
                    {error ? (
                      <p
                        className="text-xs font-semibold text-red-700"
                        id={errorId}
                      >
                        {error}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-4 flex justify-between gap-4 text-sm font-bold text-charcoal">
          <span>Selected tickets</span>
          <span>
            {selections.reduce(
              (total, selection) => total + selection.quantity,
              0,
            )}
          </span>
        </p>
        <p className="mt-2 flex justify-between gap-4 text-sm font-extrabold text-charcoal">
          <span>Subtotal</span>
          <span aria-live="polite">
            {formatPrice(event.currency, subtotal)}
          </span>
        </p>

        {selectionError || calculationError ? (
          <p
            className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800"
            role="alert"
          >
            {selectionError || calculationError}
          </p>
        ) : null}
        {!canContinue && !noTicketsAvailable && selections.length === 0 ? (
          <p className="mt-4 text-sm text-secondary" id="ticket-selection-help">
            Select at least one ticket to continue.
          </p>
        ) : null}

        <Button
          className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          disabled={!canContinue}
          onClick={continueToBooking}
          variant="primary"
        >
          Continue to booking
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-secondary">
          Continuing passes your selection to booking; it does not reserve
          tickets or create a booking.
        </p>
      </section>
    </>
  );
}
