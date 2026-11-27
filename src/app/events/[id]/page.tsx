import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventInformation from "@/components/EventInformation";
import EventTicketSelector from "@/components/EventTicketSelector";
import { toEventCardProps } from "@/components/EventCard";
import { getAllEvents, getEventById } from "@/data/events";

export const instant = false;

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

interface EventMetadataProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EventMetadataProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested Jashn Tickets event could not be found.",
    };
  }

  return {
    title: event.title,
    description: `${event.description} At ${event.venue} in ${event.city}.`,
  };
}

export function generateStaticParams() {
  return getAllEvents().map(({ id }) => ({ id }));
}

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const cardProps = toEventCardProps(event);
  const artwork = cardProps.artwork;
  const startingPrice = cardProps.price;
  const soldOut =
    event.availability.status === "sold-out" ||
    event.availability.remaining <= 0;

  return (
    <div className="bg-white">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <Link
          className="text-sm font-bold text-violet hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
          href="/events"
        >
          <span aria-hidden="true">←</span> Back to events
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <div
              aria-label={
                artwork.type === "image"
                  ? undefined
                  : artwork.alt ?? `${event.title} event artwork`
              }
              className={`relative mb-10 flex h-64 items-end overflow-hidden rounded-[2rem] bg-violet p-7 sm:h-80 ${artwork.className ?? ""}`}
              role={artwork.type === "image" ? undefined : "img"}
            >
              {artwork.type === "image" && artwork.src ? (
                <Image
                  alt={artwork.alt ?? `${event.title} event artwork`}
                  className="object-cover"
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  src={artwork.src}
                />
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute -right-12 -top-20 h-72 w-72 rounded-full border-[34px] border-lime/80"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full border-[45px] border-white/15"
                  />
                  <span
                    aria-hidden="true"
                    className="relative text-7xl font-black text-white/90"
                  >
                    {artwork.symbol ?? "✦"}
                  </span>
                  <span className="absolute right-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-violet">
                    {event.category}
                  </span>
                </>
              )}
            </div>
            <EventInformation
              address={event.address}
              category={event.category}
              city={event.city}
              date={`${formatEventDate(event.date)} · ${event.time}`}
              description={event.description}
              startingPrice={startingPrice}
              title={event.title}
              venue={event.venue}
            />
            <div className="mt-8 rounded-3xl bg-lavender p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
                Ticket availability
              </p>
              <p className="mt-3 text-sm leading-6 text-secondary">
                {soldOut
                  ? "Tickets for this event are sold out."
                  : `${event.availability.remaining} tickets are currently listed as available. Availability is not reserved by selecting tickets.`}
              </p>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <EventTicketSelector event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
