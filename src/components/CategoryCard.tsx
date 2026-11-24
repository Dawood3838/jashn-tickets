import Link from "next/link";

export interface CategoryCardProps {
  icon: string;
  name: string;
  description: string;
  number: string;
  href?: string;
}

export default function CategoryCard({
  icon,
  name,
  description,
  number,
  href = "/events",
}: CategoryCardProps) {
  return (
    <Link
      className="group relative flex min-h-44 flex-col items-start overflow-hidden rounded-3xl border border-violet/10 bg-white p-5 text-charcoal shadow-[0_12px_30px_rgba(115,87,255,0.07)] transition-all hover:-translate-y-1 hover:border-violet/30 hover:shadow-[0_18px_38px_rgba(115,87,255,0.15)]"
      href={href}
    >
      <span className="absolute right-5 top-5 text-xs font-extrabold tracking-[0.1em] text-violet/40">
        {number}
      </span>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lavender text-2xl font-extrabold text-violet transition-colors group-hover:bg-violet group-hover:text-white" aria-hidden="true">
        {icon}
      </span>
      <span className="mt-6 text-base font-extrabold tracking-[-0.02em]">{name}</span>
      <span className="mt-1 max-w-[12rem] text-sm leading-5 text-secondary">{description}</span>
      <span className="absolute bottom-5 right-5 text-lg font-bold text-violet opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
