import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-violet">
            {eyebrow}
          </p>
        )}
        <h2 className="font-sans text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] text-charcoal sm:text-5xl">
          {heading}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-7 text-secondary">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
