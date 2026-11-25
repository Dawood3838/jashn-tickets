import Link from "next/link";
import { Suspense } from "react";
import ConfirmationPanel from "@/components/ConfirmationPanel";

interface ConfirmationSearchParams {
  reference?: string | string[];
}

interface ConfirmationPageProps {
  searchParams: Promise<ConfirmationSearchParams>;
}

interface ConfirmationContentProps {
  searchParams: Promise<ConfirmationSearchParams>;
}

const BOOKING_REFERENCE_PATTERN = /^JASHN-[0-9A-F]{32}$/;

async function ConfirmationContent({
  searchParams,
}: ConfirmationContentProps) {
  const { reference } = await searchParams;
  const validReference =
    typeof reference === "string" &&
    BOOKING_REFERENCE_PATTERN.test(reference)
      ? reference
      : null;

  const referenceError =
    reference === undefined
      ? "No booking reference was provided. Open a confirmation link from a saved booking."
      : "This booking reference is empty or invalid. Check the link or browse events.";

  return (
    <ConfirmationPanel
      key={validReference ?? `invalid:${referenceError}`}
      reference={validReference}
      referenceError={validReference ? undefined : referenceError}
    />
  );
}

function ConfirmationPanelFallback() {
  return (
    <div
      aria-live="polite"
      className="rounded-[2rem] bg-white p-8 text-center text-sm font-semibold text-secondary"
      role="status"
    >
      Looking up your booking…
    </div>
  );
}

export default function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  return (
    <div className="bg-lavender">
      <div className="mx-auto w-[min(100%-2.5rem,900px)] py-12 sm:py-20">
        <header className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">
            Booking details
          </p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
            Your booking
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-secondary">
            Review the saved booking, its current status, and ticket price
            details.
          </p>
        </header>

        <div className="mt-12">
          <Suspense fallback={<ConfirmationPanelFallback />}>
            <ConfirmationContent searchParams={searchParams} />
          </Suspense>
        </div>

        <div className="mt-8 text-center">
          <Link
            className="text-sm font-extrabold text-violet hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
            href="/events"
          >
            <span aria-hidden="true">←</span> Browse more events
          </Link>
        </div>
      </div>
    </div>
  );
}
