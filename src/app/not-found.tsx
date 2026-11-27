import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-lavender px-5 py-16">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-charcoal px-6 py-14 text-center text-white shadow-[0_24px_60px_rgba(17,24,39,0.16)] sm:px-12 sm:py-20">
        <span
          className="pointer-events-none absolute -right-12 -top-20 text-[12rem] font-black leading-none text-violet/40"
          aria-hidden="true"
        >
          404
        </span>
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime">
            Page not found
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,12vw,7rem)] font-extrabold leading-none tracking-[-0.08em]">
            404
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/70">
            The page or event you requested could not be found. It may have
            moved, or the link may no longer be valid.
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-lime px-6 text-sm font-extrabold text-charcoal transition-colors hover:bg-[#d5fa8b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            href="/events"
          >
            Browse events <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
