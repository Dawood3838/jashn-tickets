import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getEventStartingPrice } from "@/lib/event-discovery";
import type { Event, EventArtwork } from "@/types/event";

export interface EventCardArtwork {
  type: "image" | "artwork";
  src?: string;
  alt?: string;
  symbol?: ReactNode;
  className?: string;
}

export interface EventCardProps {
  title: string;
  category: string;
  date: string;
  venue: string;
  city: string;
  price: string;
  artwork: EventCardArtwork;
  href: string;
}

const artworkThemeClasses: Record<EventArtwork["theme"], string> = {
  violet: "bg-violet",
  lime: "bg-lime",
  lavender: "bg-lavender",
  charcoal: "bg-charcoal",
};

function formatEventDate(dateValue: string): string {
  const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue);
  if (!dateParts) {
    return dateValue;
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[Number(dateParts[2]) - 1];
  return month
    ? `${Number(dateParts[3])} ${month} ${dateParts[1]}`
    : dateValue;
}

export function toEventCardProps(event: Event): EventCardProps {
  const artwork: EventCardArtwork =
    event.image.type === "image"
      ? {
          type: "image",
          src: event.image.src,
          alt: event.image.alt,
        }
      : {
          type: "artwork",
          alt: event.image.alt,
          className: artworkThemeClasses[event.image.theme],
        };

  const startingPrice = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(getEventStartingPrice(event));

  return {
    title: event.title,
    category: event.category,
    date: `${formatEventDate(event.date)} · ${event.time}`,
    venue: event.venue,
    city: event.city,
    price: `${event.currency} ${startingPrice}`,
    artwork,
    href: `/events/${encodeURIComponent(event.id)}`,
  };
}

export default function EventCard({
  title,
  category,
  date,
  venue,
  city,
  price,
  artwork,
  href,
}: EventCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-violet/10 bg-white shadow-[0_14px_35px_rgba(17,24,39,0.06)] transition-all hover:-translate-y-1 hover:border-violet/25 hover:shadow-[0_20px_40px_rgba(115,87,255,0.14)]">
      <div
        className={`relative flex h-52 items-end overflow-hidden bg-violet p-5 ${artwork.className ?? ""}`}
        role={
          artwork.type === "image" && artwork.src && artwork.alt
            ? undefined
            : "img"
        }
        aria-label={
          artwork.type === "image" && artwork.src && artwork.alt
            ? undefined
            : `${category} event artwork`
        }
      >
        {artwork.type === "image" && artwork.src && artwork.alt ? (
          <Image
            className="object-cover"
            src={artwork.src}
            alt={artwork.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <>
            <span className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[26px] border-lime/80" />
            <span className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/10" />
            <span className="relative text-6xl font-black text-white/90">
              {artwork.symbol ?? "✦"}
            </span>
          </>
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-violet">
          {category}
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-extrabold leading-tight tracking-[-0.035em] text-charcoal">
          {title}
        </h2>
        <p className="mt-3 text-sm font-semibold text-violet">{date}</p>
        <p className="mt-1 text-sm text-secondary">
          {venue} · {city}
        </p>
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <p>
            <span className="block text-xs font-semibold text-secondary">Starting from</span>
            <strong className="mt-1 block text-base font-extrabold text-charcoal">{price}</strong>
          </p>
          <Link
            className="rounded-full border border-violet/20 px-3 py-2 text-xs font-extrabold text-violet transition-colors hover:bg-violet hover:text-white"
            href={href}
          >
            View details <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
