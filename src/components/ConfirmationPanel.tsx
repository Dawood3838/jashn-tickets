"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BookingSummary, {
  type BookingSummaryLine,
} from "@/components/BookingSummary";
import { bookingRepository } from "@/data/booking-repository";
import { getEventById } from "@/data/events";
import { prepareBookingConfirmation } from "@/lib/booking-confirmation";
import { getBookingByReference } from "@/lib/booking-management";
import type {
  BookingConfirmationData,
  BookingStatus,
} from "@/types/booking";

export interface ConfirmationPanelProps {
  reference: string | null;
  referenceError?: string;
}

type ConfirmationPanelState =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; confirmation: BookingConfirmationData };

const statusClasses: Record<BookingStatus, string> = {
  pending: "bg-lavender text-violet",
  confirmed: "bg-lime text-charcoal",
  cancelled: "bg-charcoal/10 text-charcoal",
};

function formatPrice(currency: string, amount: number): string {
  return `${currency} ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function formatEventDate(dateValue: string): string {
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

function formatCreatedAt(dateValue: string): string {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function ConfirmationPanel({
  reference,
  referenceError,
}: ConfirmationPanelProps) {
  const [state, setState] = useState<ConfirmationPanelState>(() =>
    reference
      ? { kind: "loading" }
      : {
          kind: "error",
          message: referenceError ?? "A booking reference is required.",
        },
  );

  useEffect(() => {
    if (reference === null) {
      return;
    }

    const bookingReference = reference;
    let active = true;

    async function loadBooking() {
      const result = await getBookingByReference(
        bookingRepository,
        bookingReference,
      );
      if (!active) {
        return;
      }

      if (!result.success) {
        setState({ kind: "error", message: result.error.message });
        return;
      }

      const event = getEventById(result.data.eventId);
      setState({
        kind: "ready",
        confirmation: prepareBookingConfirmation(result.data, event),
      });
    }

    void loadBooking();
    return () => {
      active = false;
    };
  }, [reference]);

  if (state.kind === "loading") {
    return (
      <section
        aria-live="polite"
        className="rounded-[2rem] bg-white p-8 text-center text-sm font-semibold text-secondary shadow-[0_18px_45px_rgba(115,87,255,0.1)]"
        role="status"
      >
        Looking up your booking…
      </section>
    );
  }

  if (state.kind === "error") {
    return (
      <section
        aria-labelledby="confirmation-error-heading"
        className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(115,87,255,0.1)] sm:p-10"
        role="alert"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
          Booking lookup
        </p>
        <h2
          className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
          id="confirmation-error-heading"
        >
          Booking details are unavailable
        </h2>
        <p className="mt-3 text-sm leading-6 text-secondary">{state.message}</p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-violet px-5 text-sm font-bold text-white transition-colors hover:bg-[#6247ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          href="/events"
        >
          Browse events
        </Link>
      </section>
    );
  }

  const { confirmation } = state;
  const ticketLines: BookingSummaryLine[] =
    confirmation.priceBreakdown.selectedTickets.map((ticket) => ({
      label: `${ticket.ticketTypeName} · ${ticket.quantity} × ${formatPrice(
        confirmation.priceBreakdown.currency,
        ticket.unitPrice,
      )}`,
      value: formatPrice(
        confirmation.priceBreakdown.currency,
        ticket.lineTotal,
      ),
    }));

  return (
    <section
      aria-labelledby="confirmation-panel-heading"
      className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(115,87,255,0.1)] sm:p-10"
    >
      <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
            Saved booking
          </p>
          <h2
            className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
            id="confirmation-panel-heading"
          >
            Booking details
          </h2>
          <p className="mt-2 text-sm leading-6 text-secondary">
            This page shows the current booking record. It does not confirm
            payment or reserve tickets.
          </p>
        </div>
        <div className="rounded-2xl bg-lavender px-4 py-3 sm:max-w-72 sm:text-right">
          <span className="block text-xs font-bold text-secondary">
            Booking reference
          </span>
          <strong className="mt-1 block break-all font-mono text-sm text-violet">
            {confirmation.reference}
          </strong>
        </div>
      </header>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-secondary">
            Status
          </dt>
          <dd className="mt-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] ${statusClasses[confirmation.status]}`}
            >
              {confirmation.status}
            </span>
          </dd>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-secondary">
            Created
          </dt>
          <dd className="mt-2 text-sm font-bold text-charcoal">
            {formatCreatedAt(confirmation.createdAt)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section
          aria-labelledby="confirmation-event-heading"
          className="rounded-2xl bg-lavender/60 p-5"
        >
          <h3
            className="text-lg font-extrabold text-charcoal"
            id="confirmation-event-heading"
          >
            Event
          </h3>
          {confirmation.event ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                  Title
                </dt>
                <dd className="mt-1 font-bold text-charcoal">
                  {confirmation.event.title}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                  Date and time
                </dt>
                <dd className="mt-1 font-semibold text-charcoal">
                  {formatEventDate(confirmation.event.date)} ·{" "}
                  {confirmation.event.time}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                  Venue
                </dt>
                <dd className="mt-1 font-semibold text-charcoal">
                  {confirmation.event.venue}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                  City
                </dt>
                <dd className="mt-1 font-semibold text-charcoal">
                  {confirmation.event.city}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm leading-6 text-secondary">
              Event details are unavailable. The saved customer, ticket, and
              price information is still shown below.
            </p>
          )}
        </section>

        <section
          aria-labelledby="confirmation-customer-heading"
          className="rounded-2xl border border-border p-5"
        >
          <h3
            className="text-lg font-extrabold text-charcoal"
            id="confirmation-customer-heading"
          >
            Customer
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                Name
              </dt>
              <dd className="mt-1 font-semibold text-charcoal">
                {confirmation.customer.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                Email
              </dt>
              <dd className="mt-1 break-all font-semibold text-charcoal">
                {confirmation.customer.email}
              </dd>
            </div>
            {confirmation.customer.phone ? (
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                  Phone
                </dt>
                <dd className="mt-1 font-semibold text-charcoal">
                  {confirmation.customer.phone}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      </div>

      <section
        aria-labelledby="confirmation-tickets-heading"
        className="mt-6"
      >
        <h3
          className="text-lg font-extrabold text-charcoal"
          id="confirmation-tickets-heading"
        >
          Selected tickets
        </h3>
        <div className="mt-3 space-y-3">
          {confirmation.priceBreakdown.selectedTickets.map((ticket) => (
            <div
              className="flex flex-col gap-2 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              key={ticket.ticketTypeId}
            >
              <div>
                <p className="font-bold text-charcoal">
                  {ticket.ticketTypeName} × {ticket.quantity}
                </p>
                <p className="mt-1 text-sm text-secondary">
                  Unit price:{" "}
                  {formatPrice(
                    confirmation.priceBreakdown.currency,
                    ticket.unitPrice,
                  )}
                </p>
              </div>
              <p className="text-sm font-extrabold text-charcoal">
                Line total:{" "}
                {formatPrice(
                  confirmation.priceBreakdown.currency,
                  ticket.lineTotal,
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6">
        <BookingSummary
          heading="Price breakdown"
          lines={ticketLines}
          serviceFee="None"
          subtotal={formatPrice(
            confirmation.priceBreakdown.currency,
            confirmation.priceBreakdown.subtotal,
          )}
          total={formatPrice(
            confirmation.priceBreakdown.currency,
            confirmation.priceBreakdown.total,
          )}
        />
      </div>

      <p className="mt-6 rounded-2xl border border-violet/10 bg-lavender p-4 text-sm leading-6 text-charcoal">
        No payment has been taken and ticket inventory has not been reserved.
      </p>
    </section>
  );
}
