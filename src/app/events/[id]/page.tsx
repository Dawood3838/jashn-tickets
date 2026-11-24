import Link from "next/link";
import BookingSummary from "@/components/BookingSummary";
import EventInformation from "@/components/EventInformation";

export const instant = false;

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="bg-white">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <Link className="text-sm font-bold text-violet hover:underline" href="/events">
          ← Back to events
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <div className="relative mb-10 flex h-64 items-end overflow-hidden rounded-[2rem] bg-violet p-7 sm:h-80">
              <span className="absolute -right-12 -top-20 h-72 w-72 rounded-full border-[34px] border-lime/80" />
              <span className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full border-[45px] border-white/15" />
              <span className="relative text-7xl font-black text-white/90">✦</span>
              <span className="absolute right-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-violet">
                Event artwork
              </span>
            </div>
            <EventInformation
              category="Event category"
              title="Event details are ready for your next experience."
              date="Date and time to be connected"
              venue="Venue to be connected"
              city="Islamabad or Rawalpindi"
              description="This presentation is ready to display a selected event from the Division 2 catalogue. Its title, schedule, venue, description and availability will be supplied by the typed event model."
            />
            <div className="mt-10 rounded-3xl bg-lavender p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Route integration</p>
              <p className="mt-3 text-sm leading-6 text-secondary">
                Event route <code className="rounded bg-white px-2 py-1 font-mono text-xs text-charcoal">/events/{id}</code> is ready for Division 2&apos;s event lookup.
              </p>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <BookingSummary
              heading="Choose your tickets"
              lines={[]}
              subtotal="—"
              serviceFee="—"
              total="—"
            />
            <button className="mt-4 w-full rounded-full bg-lime px-5 py-4 text-sm font-extrabold text-charcoal transition-colors hover:bg-[#d5fa8b]" type="button" disabled>
              Select tickets to continue
            </button>
            <p className="mt-3 text-center text-xs text-secondary">Ticket availability and selection will be connected later.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
