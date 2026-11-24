import Link from "next/link";
import type { ReactNode } from "react";

export interface HeroSectionProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
}

export default function HeroSection({
  eyebrow = "Jashn Tickets · Islamabad & Rawalpindi",
  title = (
    <>
      Find your next{" "}
      <span className="text-lime">big moment.</span>
    </>
  ),
  description = "Discover concerts, workshops, exhibitions and more with a faster, brighter way to make plans.",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-violet/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 left-1/4 h-80 w-80 rounded-full bg-violet/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[14%] top-12 h-4 w-4 rotate-45 bg-lime shadow-[0_0_30px_rgba(199,243,107,0.8)]" />

      <div className="relative mx-auto grid w-[min(100%-2.5rem,1180px)] items-center gap-12 py-16 sm:py-24 lg:min-h-[650px] lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:py-12">
        <div className="max-w-2xl">
          <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.18em] text-lime">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime shadow-[0_0_0_4px_rgba(199,243,107,0.15)]" />
            {eyebrow}
          </p>
          <h1 className="max-w-2xl text-[clamp(3.2rem,8vw,6.6rem)] font-extrabold leading-[0.93] tracking-[-0.075em]">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-lime px-6 text-sm font-extrabold text-charcoal shadow-[0_12px_30px_rgba(199,243,107,0.2)] transition-all hover:-translate-y-1 hover:bg-[#d5fa8b]"
              href="/events"
            >
              Explore events <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:border-lime hover:text-lime"
              href="/support"
            >
              Discover Jashn
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-[0.12em] text-white/45">
            <span>Live experiences</span>
            <span>Local energy</span>
            <span>Easy discovery</span>
          </div>
        </div>

        <div
          className="relative mx-auto h-[350px] w-full max-w-[540px] lg:h-[480px] lg:justify-self-end"
          role="img"
          aria-label="Abstract geometric artwork representing a festival experience"
        >
          <div className="absolute inset-5 rotate-[-6deg] rounded-[3rem] bg-violet shadow-[24px_24px_0_rgba(199,243,107,0.9)] sm:inset-8" />
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/25 bg-[linear-gradient(135deg,#8c76ff,#5a3fe0)]">
            <span className="absolute -right-16 -top-12 h-64 w-64 rounded-full border-[22px] border-lime/90" />
            <span className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border-[36px] border-white/15" />
            <span className="absolute left-[13%] top-[17%] h-28 w-28 rotate-12 rounded-[2rem] bg-white/15 backdrop-blur-sm" />
            <span className="absolute right-[18%] top-[38%] h-20 w-20 rotate-45 bg-lime shadow-[0_0_45px_rgba(199,243,107,0.55)]" />
            <span className="absolute bottom-[18%] left-[18%] h-24 w-24 rounded-full bg-charcoal/80" />
            <span className="absolute bottom-[22%] left-[25%] h-10 w-10 rounded-full bg-lime" />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-charcoal/75 p-5 backdrop-blur-md">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-lime">
                Make it count
              </p>
              <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">
                Your city is on.
              </p>
              <p className="mt-1 text-sm text-white/60">Find your people. Feel the energy.</p>
            </div>
          </div>
          <span className="absolute -right-1 top-8 grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl font-black text-violet shadow-xl sm:right-[-1.25rem]">
            ✦
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-[min(100%-2.5rem,1180px)] items-center gap-4 pb-6 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/40">
        <span className="hidden sm:inline">01 · Start exploring</span>
        <span className="h-px flex-1 bg-white/15" />
        <span>33.6844° N · 73.0479° E</span>
      </div>
    </section>
  );
}
