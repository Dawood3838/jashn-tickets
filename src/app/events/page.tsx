import type { Metadata } from "next";
import { Suspense } from "react";
import CategoryCard from "@/components/CategoryCard";
import EventDiscovery from "@/components/EventDiscovery";
import EventsHeader from "@/components/EventsHeader";
import { getAllEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Explore Events",
  description: "Browse upcoming events, discover experiences and find tickets.",
};

const categories = [
  { icon: "♫", name: "Concerts", description: "Live sounds, loud memories" },
  { icon: "◎", name: "Conferences", description: "Meet minds that move you" },
  { icon: "✳", name: "Workshops", description: "Pick up something new" },
  { icon: "▧", name: "Exhibitions", description: "Art, ideas and everything between" },
  { icon: "✺", name: "Festivals", description: "Make a day of it" },
  { icon: "↗", name: "Sports", description: "Feel every second" },
] as const;

function EventDiscoveryFallback() {
  return (
    <div
      className="mt-10 rounded-3xl bg-lavender p-6 text-sm font-semibold text-secondary"
      role="status"
      aria-busy="true"
    >
      Loading events…
    </div>
  );
}

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <div className="bg-white">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <EventsHeader />

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
                href={`/events?category=${encodeURIComponent(category.name.toLowerCase())}`}
              />
            ))}
          </div>
        </section>

        <Suspense fallback={<EventDiscoveryFallback />}>
          <EventDiscovery events={events} />
        </Suspense>
      </div>
    </div>
  );
}
