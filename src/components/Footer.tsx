import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="mx-auto flex w-[min(100%-2.5rem,1180px)] flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Link className="text-lg font-semibold tracking-tight" href="/">
            Jashn <span className="text-coral">Tickets</span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-white/55">
            Discover memorable events and book your next experience across
            Islamabad and Rawalpindi.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70" aria-label="Footer navigation">
          <Link className="hover:text-coral" href="/">Home</Link>
          <Link className="hover:text-coral" href="/events">Events</Link>
          <Link className="hover:text-coral" href="/booking">Booking</Link>
          <Link className="hover:text-coral" href="/support">Support</Link>
        </nav>
        <p className="text-xs text-white/45 sm:text-right">
          © Jashn Tickets
          <br />
          Made for moments that move you.
        </p>
      </div>
    </footer>
  );
}
