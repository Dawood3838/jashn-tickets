import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import EventsHeader from "@/components/EventsHeader";

const categories = [
  { icon: "♫", name: "Concerts", description: "Live sounds, loud memories" },
  { icon: "◎", name: "Conferences", description: "Meet minds that move you" },
  { icon: "✳", name: "Workshops", description: "Pick up something new" },
  { icon: "▧", name: "Exhibitions", description: "Art, ideas and everything between" },
  { icon: "✺", name: "Festivals", description: "Make a day of it" },
  { icon: "↗", name: "Sports", description: "Feel every second" },
] as const;

export default function EventsPage() {
  // Division 2 will connect its typed event catalogue here and map records to EventCard props.
  const events: never[] = [];

  return (
    <div className="bg-white">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <EventsHeader />

        <section className="mt-10" aria-labelledby="event-search-heading">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
                Start with a feeling
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-charcoal" id="event-search-heading">
                What are you in the mood for?
              </h2>
            </div>
            <p className="text-sm text-secondary">Search and filters will be connected in Division 2.</p>
          </div>
          <div className="mt-5 flex min-h-14 items-center gap-3 rounded-2xl border border-violet/15 bg-white px-4 shadow-[0_8px_24px_rgba(115,87,255,0.06)]">
            <span className="text-xl text-violet" aria-hidden="true">⌕</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-secondary/70"
              type="search"
              placeholder="Search events by title, venue or city"
              aria-label="Search events"
              readOnly
            />
            <span className="hidden rounded-full bg-lavender px-3 py-1.5 text-xs font-bold text-violet sm:inline">
              Search preview
            </span>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="event-categories-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-charcoal" id="event-categories-heading">
              Browse by category
            </h2>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">6 categories</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                {...category}
                key={category.name}
                number={`0${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="featured-events-heading">
          <div className="flex flex-col gap-4 rounded-3xl bg-lavender p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-extrabold tracking-[-0.03em] text-charcoal" id="featured-events-heading">
                Featured events
              </h2>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet">
                {events.length} available
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-violet/15 bg-white px-3 py-2 text-xs font-bold text-secondary" type="button" disabled>
                Filter
              </button>
              <button className="rounded-full border border-violet/15 bg-white px-3 py-2 text-xs font-bold text-secondary" type="button" disabled>
                Sort: Soonest
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-violet/25 bg-white px-6 py-16 text-center shadow-[0_12px_30px_rgba(115,87,255,0.05)]">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-lavender text-3xl text-violet" aria-hidden="true">
                ✦
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.04em] text-charcoal">
                Your next experience is taking shape.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-secondary">
                The event catalogue will appear here once the typed event data
                is connected. Check back soon or explore the categories above.
              </p>
              <Link
                className="mt-6 inline-flex rounded-full bg-violet px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#6247ed]"
                href="/support"
              >
                Learn more about Jashn <span className="ml-2" aria-hidden="true">↗</span>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Division 2 event records will be mapped to EventCard here. */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
