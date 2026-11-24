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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-coral-dark">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-4xl leading-tight tracking-[-0.045em] text-ink sm:text-5xl">
          {heading}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
