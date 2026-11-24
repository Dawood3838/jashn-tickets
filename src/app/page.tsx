import Link from "next/link";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <section className="mx-auto flex w-[min(100%-2.5rem,1180px)] flex-col gap-14 py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-coral-dark">
          Islamabad · Rawalpindi
        </p>
        <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.06em] text-ink sm:text-7xl">
          Make room for{" "}
          <span className="text-coral-dark italic">something unforgettable.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Jashn Tickets helps you discover events, make plans and find your
          next memorable experience across the Twin Cities.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/events">
            <Button>Explore events <span aria-hidden="true">↗</span></Button>
          </Link>
          <Link
            className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-coral-dark hover:bg-muted-surface"
            href="/support"
          >
            Visit support
          </Link>
        </div>
      </div>

      <SectionHeading
        eyebrow="A better way to make plans"
        heading={<>Your city, a little more <span className="text-coral-dark italic">alive.</span></>}
        description="A polished event discovery and ticketing experience is coming together here. Explore the current foundation or get help getting started."
      />
    </section>
  );
}
