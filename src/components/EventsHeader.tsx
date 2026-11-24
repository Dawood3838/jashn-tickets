export interface EventsHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function EventsHeader({
  eyebrow = "Explore what is happening",
  title = "Discover your next experience.",
  description = "Browse the moments, meetups and memories waiting across Islamabad and Rawalpindi.",
}: EventsHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] bg-lavender px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
      <span className="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full border-[28px] border-violet/15" />
      <span className="pointer-events-none absolute bottom-[-3rem] right-1/4 h-20 w-20 rotate-45 bg-lime/70" />
      <div className="relative max-w-3xl">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-violet">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime align-[1px]" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-[clamp(2.75rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
}
