"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EventCard, { toEventCardProps } from "@/components/EventCard";
import { getEvents, type EventSortOrder } from "@/lib/event-discovery";
import type {
  Event,
  EventAvailabilityStatus,
  EventCategory,
  EventCity,
} from "@/types/event";

interface EventDiscoveryProps {
  events: readonly Event[];
}

const availabilityLabels: Record<EventAvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited",
  "sold-out": "Sold out",
};

export default function EventDiscovery({
  events,
}: EventDiscoveryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<EventCity | "">("");
  const [availability, setAvailability] =
    useState<EventAvailabilityStatus | "">("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<EventSortOrder>("date-asc");

  const categories = [...new Set(events.map((event) => event.category))];
  const requestedCategory = searchParams.get("category")?.trim().toLowerCase();
  const category =
    categories.find(
      (eventCategory) => eventCategory.toLowerCase() === requestedCategory,
    ) ?? "";
  const cities = [...new Set(events.map((event) => event.city))];
  const availabilityStatuses = [
    ...new Set(events.map((event) => event.availability.status)),
  ];

  const visibleEvents = getEvents(events, {
    query,
    categories: category ? [category] : undefined,
    cities: city ? [city] : undefined,
    availabilityStatuses: availability ? [availability] : undefined,
    featured: featuredOnly ? true : undefined,
    sortBy,
  });

  const hasActiveFilters = Boolean(
    query.trim() ||
      category ||
      city ||
      availability ||
      featuredOnly ||
      sortBy !== "date-asc",
  );

  function updateCategory(value: EventCategory | "") {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      nextSearchParams.set("category", value.toLowerCase());
    } else {
      nextSearchParams.delete("category");
    }

    const queryString = nextSearchParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    setQuery("");
    updateCategory("");
    setCity("");
    setAvailability("");
    setFeaturedOnly(false);
    setSortBy("date-asc");
  }

  return (
    <>
      <section
        className="mt-10"
        aria-labelledby="event-search-heading"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
              Start with a feeling
            </p>
            <h2
              className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
              id="event-search-heading"
            >
              What are you in the mood for?
            </h2>
          </div>
          <p className="text-sm text-secondary">
            Search, filter and sort events across the twin cities.
          </p>
        </div>

        <div className="mt-5 grid gap-4 rounded-3xl border border-violet/15 bg-white p-5 shadow-[0_8px_24px_rgba(115,87,255,0.06)] sm:grid-cols-2 lg:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-charcoal sm:col-span-2 lg:col-span-3">
            Search events
            <input
              className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/70 focus:border-violet"
              type="search"
              placeholder="Search title, description, tags, venue or city"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-charcoal">
            Category
            <select
              className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors focus:border-violet"
              value={category}
              onChange={(event) =>
                updateCategory(event.target.value as EventCategory | "")
              }
            >
              <option value="">All categories</option>
              {categories.map((eventCategory) => (
                <option key={eventCategory} value={eventCategory}>
                  {eventCategory}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-charcoal">
            City
            <select
              className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors focus:border-violet"
              value={city}
              onChange={(event) =>
                setCity(event.target.value as EventCity | "")
              }
            >
              <option value="">All cities</option>
              {cities.map((eventCity) => (
                <option key={eventCity} value={eventCity}>
                  {eventCity}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-charcoal">
            Availability
            <select
              className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors focus:border-violet"
              value={availability}
              onChange={(event) =>
                setAvailability(
                  event.target.value as EventAvailabilityStatus | "",
                )
              }
            >
              <option value="">Any availability</option>
              {availabilityStatuses.map((status) => (
                <option key={status} value={status}>
                  {availabilityLabels[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-charcoal">
            Sort events
            <select
              className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors focus:border-violet"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as EventSortOrder)
              }
            >
              <option value="date-asc">Earliest date</option>
              <option value="date-desc">Latest date</option>
              <option value="price-asc">Lowest price</option>
              <option value="price-desc">Highest price</option>
            </select>
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-border px-4 text-sm font-bold text-charcoal">
            <input
              className="h-4 w-4 accent-violet"
              type="checkbox"
              checked={featuredOnly}
              onChange={(event) => setFeaturedOnly(event.target.checked)}
            />
            Featured events only
          </label>

          <div className="flex items-center sm:col-span-2 lg:col-span-2 lg:justify-end">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-violet/20 px-5 text-sm font-bold text-violet transition-colors hover:bg-lavender focus-visible:outline-violet disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="event-results-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="text-2xl font-extrabold tracking-[-0.04em] text-charcoal"
            id="event-results-heading"
          >
            Events
          </h2>
          <p className="text-sm font-semibold text-secondary" role="status" aria-live="polite">
            {visibleEvents.length}{" "}
            {visibleEvents.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {visibleEvents.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map((event) => (
              <EventCard
                {...toEventCardProps(event)}
                key={event.id}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-violet/25 bg-white px-6 py-14 text-center shadow-[0_12px_30px_rgba(115,87,255,0.05)]">
            <span
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-lavender text-3xl text-violet"
              aria-hidden="true"
            >
              ✦
            </span>
            <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.04em] text-charcoal">
              No events match those filters.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-secondary">
              Try a different search or clear your filters to see all upcoming events.
            </p>
            <button
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-violet px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#6247ed]"
              type="button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
