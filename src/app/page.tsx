import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import EventCard, { toEventCardProps } from "@/components/EventCard";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import { getAllEvents } from "@/data/events";
import { getEvents } from "@/lib/event-discovery";

const categories = [
  { icon: "♫", name: "Concerts", description: "Live sounds, loud memories" },
  { icon: "◎", name: "Conferences", description: "Meet minds that move you" },
  { icon: "✳", name: "Workshops", description: "Pick up something new" },
  { icon: "▧", name: "Exhibitions", description: "Art, ideas and everything between" },
  { icon: "✺", name: "Festivals", description: "Make a day of it" },
  { icon: "↗", name: "Sports", description: "Feel every second" },
] as const;

export default function Home() {
  const events = getAllEvents();
  const featuredEvents = getEvents(events, {
    featured: true,
    sortBy: "date-asc",
  });
  const homepageEvents = (
    featuredEvents.length > 0
      ? featuredEvents
      : getEvents(events, { sortBy: "date-asc" })
  ).slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto w-[min(100%-2.5rem,1180px)]">
          <SectionHeading
            eyebrow="The city, on your calendar"
            heading={<>Plans made <span className="text-violet">brighter.</span></>}
            description={
              featuredEvents.length > 0
                ? "Find something that fits your mood, your calendar and your city."
                : "No events are featured just yet, so here are some upcoming experiences."
            }
            action={
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-violet/20 px-4 py-2.5 text-sm font-bold text-violet transition-colors hover:border-violet hover:bg-lavender"
                href="/events"
              >
                Browse all events <span className="text-lg" aria-hidden="true">↗</span>
              </Link>
            }
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homepageEvents.map((event) => (
              <EventCard
                {...toEventCardProps(event)}
                key={event.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender py-20 sm:py-28">
        <div className="mx-auto w-[min(100%-2.5rem,1180px)]">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
                Follow your curiosity
              </p>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] text-charcoal sm:text-5xl">
                Pick your <span className="text-violet">energy.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-secondary">
              From a packed arena to a quiet creative afternoon, your next
              experience starts with a feeling.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                {...category}
                key={category.name}
                number={`0${index + 1}`}
                href={`/events?category=${encodeURIComponent(category.name.toLowerCase())}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto w-[min(100%-2.5rem,1180px)]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
                Why Jashn Tickets
              </p>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] text-charcoal sm:text-5xl">
                Less scrolling. <span className="text-violet">More showing up.</span>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Find your kind of event", "A lively calendar of things worth making time for."],
                ["02", "Choose with confidence", "Clear details and ticket options before you book."],
                ["03", "Make the moment yours", "Keep your plans together for your next big story."],
              ].map(([number, title, description]) => (
                <article className="rounded-3xl bg-lavender p-5" key={number}>
                  <p className="text-xs font-extrabold tracking-[0.12em] text-violet">{number}</p>
                  <h3 className="mt-7 text-lg font-extrabold leading-tight tracking-[-0.03em] text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-violet px-5 py-16 sm:py-24">
        <span className="pointer-events-none absolute -right-8 -top-20 text-[13rem] font-black leading-none text-white/10" aria-hidden="true">✦</span>
        <span className="pointer-events-none absolute bottom-[-5rem] left-[8%] text-[10rem] font-black leading-none text-lime/20" aria-hidden="true">✳</span>
        <div className="relative mx-auto flex w-[min(100%,1116px)] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-lime">
              Ready when you are
            </p>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] text-white sm:text-6xl">
              Your next story starts <span className="text-lime">here.</span>
            </h2>
          </div>
          <Link
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-lime px-6 text-sm font-extrabold text-charcoal transition-all hover:-translate-y-1 hover:bg-[#d5fa8b]"
            href="/events"
          >
            Explore all events <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
