import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto flex w-[min(100%-2.5rem,1180px)] flex-col gap-7 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Link className="text-lg font-extrabold tracking-[-0.03em]" href="/">
            Jashn <span className="text-lime">Tickets</span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-white/60">
            Your modern guide to memorable events across Islamabad and Rawalpindi.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/70" aria-label="Footer navigation">
          <Link className="transition-colors hover:text-lime" href="/">Home</Link>
          <Link className="transition-colors hover:text-lime" href="/events">Events</Link>
          <Link className="transition-colors hover:text-lime" href="/booking">Booking</Link>
          <Link className="transition-colors hover:text-lime" href="/support">Support</Link>
        </nav>
        <p className="text-xs leading-5 text-white/45 sm:text-right">
          © Jashn Tickets
          <br />
          Built for your next big moment.
        </p>
      </div>
    </footer>
  );
}
