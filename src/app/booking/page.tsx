import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { getEventById } from "@/data/events";
import { selectTicketTypes } from "@/lib/booking";
import type { TicketSelection } from "@/types/booking";

interface BookingSearchParams {
  eventId?: string | string[];
  ticketId?: string | string[];
  quantity?: string | string[];
}

interface BookingPageProps {
  searchParams: Promise<BookingSearchParams>;
}

interface BookingFormFromParamsProps {
  searchParams: Promise<BookingSearchParams>;
}

export const metadata: Metadata = {
  title: "Book Tickets",
  description: "Review your ticket selection and complete your booking.",
};

function toValues(value: string | string[] | undefined): string[] {
  if (typeof value === "string") {
    return [value];
  }

  return value ?? [];
}

async function BookingFormFromParams({
  searchParams,
}: BookingFormFromParamsProps) {
  const params = await searchParams;
  const ticketIds = toValues(params.ticketId);
  const quantities = toValues(params.quantity);
  const formKey = JSON.stringify([
    params.eventId ?? null,
    ticketIds,
    quantities,
  ]);
  const hasHandoff =
    params.eventId !== undefined ||
    ticketIds.length > 0 ||
    quantities.length > 0;

  if (!hasHandoff) {
    return (
      <BookingForm
        event={null}
        initialSelections={[]}
        key={formKey}
      />
    );
  }

  if (typeof params.eventId !== "string" || !params.eventId.trim()) {
    return (
      <BookingForm
        event={null}
        initialError="This booking link is missing a valid event."
        initialSelections={[]}
        key={formKey}
      />
    );
  }

  const event = getEventById(params.eventId);
  if (!event) {
    return (
      <BookingForm
        event={null}
        initialError="The event in this booking link could not be found."
        initialSelections={[]}
        key={formKey}
      />
    );
  }

  if (ticketIds.length === 0 || ticketIds.length !== quantities.length) {
    return (
      <BookingForm
        event={event}
        initialError="This booking link does not contain a complete ticket selection. Return to the event page and choose tickets."
        initialSelections={[]}
        key={formKey}
      />
    );
  }

  const selections: TicketSelection[] = ticketIds.map(
    (ticketTypeId, index) => ({
      ticketTypeId,
      quantity: Number(quantities[index]),
    }),
  );
  const validation = selectTicketTypes(event, selections);

  if (!validation.success) {
    return (
      <BookingForm
        event={event}
        initialError={validation.errors
          .map((error) => error.message)
          .join(" ")}
        initialSelections={[]}
        key={formKey}
      />
    );
  }

  return (
    <BookingForm
      event={event}
      initialSelections={selections}
      key={formKey}
    />
  );
}

function BookingFormFallback() {
  return (
    <div
      aria-live="polite"
      className="mt-12 rounded-3xl bg-white p-8 text-sm font-semibold text-secondary"
      role="status"
    >
      Preparing your ticket selection…
    </div>
  );
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  return (
    <div className="bg-lavender">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">
            Your booking
          </p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
            Make it official.
          </h1>
          <p className="mt-5 text-base leading-7 text-secondary sm:text-lg">
            Review your tickets and add your details before you head to your
            next experience.
          </p>
        </header>

        <Suspense fallback={<BookingFormFallback />}>
          <BookingFormFromParams searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
