export interface EventInformationProps {
  category: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
}

export default function EventInformation({
  category,
  title,
  date,
  venue,
  city,
  description,
}: EventInformationProps) {
  return (
    <article>
      <span className="inline-flex rounded-full bg-lavender px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-violet">
        {category}
      </span>
      <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
        {title}
      </h1>
      <div className="mt-8 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-3">
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.1em] text-secondary">When</span>
          <strong className="mt-1 block text-charcoal">{date}</strong>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.1em] text-secondary">Where</span>
          <strong className="mt-1 block text-charcoal">{venue}</strong>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.1em] text-secondary">City</span>
          <strong className="mt-1 block text-charcoal">{city}</strong>
        </div>
      </div>
      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-extrabold tracking-[-0.03em] text-charcoal">About this experience</h2>
        <p className="mt-3 text-base leading-8 text-secondary">{description}</p>
      </div>
    </article>
  );
}
