"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import BookingSummary, {
  type BookingSummaryLine,
} from "@/components/BookingSummary";
import Button from "@/components/Button";
import { bookingRepository } from "@/data/booking-repository";
import { calculateBookingPrice, createBooking } from "@/lib/booking";
import { saveBooking } from "@/lib/booking-management";
import type { BookingCustomer, TicketSelection } from "@/types/booking";
import type { Event } from "@/types/event";

interface BookingFormProps {
  event: Event | null;
  initialSelections: readonly TicketSelection[];
  initialError?: string;
}

interface CustomerFieldErrors {
  name: string;
  email: string;
  phone: string;
}

function formatPrice(currency: string, amount: number): string {
  return `${currency} ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function emptyFieldErrors(): CustomerFieldErrors {
  return { name: "", email: "", phone: "" };
}

export default function BookingForm({
  event,
  initialSelections,
  initialError = "",
}: BookingFormProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState<BookingCustomer>({
    name: "",
    email: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] =
    useState<CustomerFieldErrors>(emptyFieldErrors);
  const [formError, setFormError] = useState(initialError);
  const [isSaving, setIsSaving] = useState(false);

  const priceResult =
    event && initialSelections.length > 0
      ? calculateBookingPrice(event, initialSelections)
      : undefined;
  const priceSummary = priceResult?.success ? priceResult.data : undefined;
  const selectedTickets = priceSummary?.selectedTickets ?? [];
  const subtotal = priceSummary?.subtotal ?? 0;
  const summaryLines: BookingSummaryLine[] = event
    ? [
        { label: "Event", value: event.title },
        ...selectedTickets.map((ticket) => ({
          label: `${ticket.quantity} × ${ticket.ticketTypeName}`,
          value: formatPrice(event.currency, ticket.lineTotal),
        })),
      ]
    : [];
  const hasValidSelection =
    event !== null && priceSummary !== undefined && selectedTickets.length > 0;

  function updateCustomer(field: keyof BookingCustomer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "email" || field === "phone") {
      setFieldErrors((current) => ({ ...current, [field]: "" }));
    }
  }

  async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    if (isSaving) {
      return;
    }

    setFieldErrors(emptyFieldErrors());
    setFormError("");

    if (!event || !hasValidSelection) {
      setFormError("Return to the event page and choose valid tickets first.");
      return;
    }

    const creationResult = createBooking(event, customer, initialSelections);
    if (!creationResult.success) {
      const nextFieldErrors = emptyFieldErrors();
      const otherMessages: string[] = [];

      creationResult.errors.forEach((error) => {
        if (error.field === "customer.name") {
          nextFieldErrors.name = error.message;
        } else if (error.field === "customer.email") {
          nextFieldErrors.email = error.message;
        } else if (error.field === "customer.phone") {
          nextFieldErrors.phone = error.message;
        } else {
          otherMessages.push(error.message);
        }
      });

      setFieldErrors(nextFieldErrors);
      setFormError(otherMessages.join(" "));
      return;
    }

    setIsSaving(true);
    const saveResult = await saveBooking(
      bookingRepository,
      creationResult.data,
    );
    setIsSaving(false);

    if (!saveResult.success) {
      setFormError(saveResult.error.message);
      return;
    }

    router.push(
      `/confirmation?reference=${encodeURIComponent(saveResult.data.reference)}`,
    );
  }

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
      <div className="space-y-8">
        <section
          aria-labelledby="customer-information-heading"
          className="rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(115,87,255,0.06)] sm:p-8"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
            Step 01
          </p>
          <h2
            className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
            id="customer-information-heading"
          >
            Your information
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Tell us who is joining the experience.
          </p>

          <form
            className="mt-7 grid gap-5 sm:grid-cols-2"
            noValidate
            onSubmit={handleSubmit}
          >
            <label className="grid gap-2 text-sm font-bold text-charcoal">
              Full name
              <input
                aria-describedby={
                  fieldErrors.name ? "customer-name-error" : undefined
                }
                aria-invalid={Boolean(fieldErrors.name)}
                autoComplete="name"
                className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus-visible:border-violet focus-visible:ring-2 focus-visible:ring-violet/30"
                name="name"
                onChange={(change) =>
                  updateCustomer("name", change.currentTarget.value)
                }
                placeholder="Your full name"
                required
                type="text"
                value={customer.name}
              />
              {fieldErrors.name ? (
                <span
                  className="text-xs font-semibold text-red-700"
                  id="customer-name-error"
                >
                  {fieldErrors.name}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm font-bold text-charcoal">
              Email address
              <input
                aria-describedby={
                  fieldErrors.email ? "customer-email-error" : undefined
                }
                aria-invalid={Boolean(fieldErrors.email)}
                autoComplete="email"
                className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus-visible:border-violet focus-visible:ring-2 focus-visible:ring-violet/30"
                name="email"
                onChange={(change) =>
                  updateCustomer("email", change.currentTarget.value)
                }
                placeholder="you@example.com"
                required
                type="email"
                value={customer.email}
              />
              {fieldErrors.email ? (
                <span
                  className="text-xs font-semibold text-red-700"
                  id="customer-email-error"
                >
                  {fieldErrors.email}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm font-bold text-charcoal sm:max-w-[14rem]">
              Phone number{" "}
              <span className="font-normal text-secondary">(optional)</span>
              <input
                aria-describedby={
                  fieldErrors.phone ? "customer-phone-error" : undefined
                }
                aria-invalid={Boolean(fieldErrors.phone)}
                autoComplete="tel"
                className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus-visible:border-violet focus-visible:ring-2 focus-visible:ring-violet/30"
                name="phone"
                onChange={(change) =>
                  updateCustomer("phone", change.currentTarget.value)
                }
                placeholder="+92 300 1234567"
                type="tel"
                value={customer.phone ?? ""}
              />
              {fieldErrors.phone ? (
                <span
                  className="text-xs font-semibold text-red-700"
                  id="customer-phone-error"
                >
                  {fieldErrors.phone}
                </span>
              ) : null}
            </label>

            {formError ? (
              <p
                className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800 sm:col-span-2"
                role="alert"
              >
                {formError}
              </p>
            ) : null}
            {!hasValidSelection ? (
              <p className="text-sm text-secondary sm:col-span-2">
                Choose an event and tickets before creating a booking.{" "}
                <Link
                  className="font-bold text-violet hover:underline"
                  href="/events"
                >
                  Browse events
                </Link>
              </p>
            ) : null}

            <div className="sm:col-span-2">
              <Button
                className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet sm:w-auto"
                disabled={!hasValidSelection || isSaving}
                type="submit"
                variant="primary"
              >
                {isSaving ? "Saving booking…" : "Create booking"}
              </Button>
              <p className="mt-3 text-xs leading-5 text-secondary">
                No payment is taken and ticket inventory is not reserved.
              </p>
            </div>
          </form>
        </section>

        <section
          aria-labelledby="ticket-summary-heading"
          className="rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(115,87,255,0.06)] sm:p-8"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
            Step 02
          </p>
          <h2
            className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
            id="ticket-summary-heading"
          >
            Selected tickets
          </h2>
          {event && selectedTickets.length > 0 ? (
            <div className="mt-6 space-y-3">
              <p className="font-bold text-charcoal">{event.title}</p>
              {selectedTickets.map((ticket) => (
                <div
                  className="flex flex-wrap justify-between gap-3 rounded-2xl bg-lavender p-4 text-sm"
                  key={ticket.ticketTypeId}
                >
                  <span className="font-semibold text-charcoal">
                    {ticket.quantity} × {ticket.ticketTypeName}
                  </span>
                  <span className="font-bold text-charcoal">
                    {formatPrice(event.currency, ticket.lineTotal)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-violet/25 bg-lavender p-8 text-center">
              <p className="text-sm font-bold text-charcoal">
                No tickets selected yet.
              </p>
              <Link
                className="mt-3 inline-block text-sm font-extrabold text-violet hover:underline"
                href="/events"
              >
                Browse events <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </section>
      </div>

      <div className="lg:sticky lg:top-28">
        <BookingSummary
          heading="Order summary"
          lines={summaryLines}
          serviceFee="None"
          subtotal={formatPrice(event?.currency ?? "PKR", subtotal)}
          total={formatPrice(event?.currency ?? "PKR", subtotal)}
        />
        <p className="mt-3 text-center text-xs leading-5 text-secondary">
          No taxes, fees, or payment processing are included.
        </p>
      </div>
    </div>
  );
}
