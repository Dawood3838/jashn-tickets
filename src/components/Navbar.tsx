import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/booking", label: "Booking" },
  { href: "/support", label: "Support" },
] as const;

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-navy text-paper">
      <div className="mx-auto flex w-[min(100%-2.5rem,1180px)] flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 sm:min-h-20 sm:flex-nowrap sm:py-0">
        <Link
          className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight"
          href="/"
          aria-label="Jashn Tickets home"
        >
          <span
            className="flex h-7 w-7 rotate-[-8deg] items-end justify-center gap-0.75 rounded-lg border border-white/40 p-1"
            aria-hidden="true"
          >
            <span className="h-2 w-0.75 rounded-full bg-coral" />
            <span className="h-4 w-0.75 rounded-full bg-coral" />
            <span className="h-3 w-0.75 rounded-full bg-coral" />
          </span>
          <span>
            Jashn <strong className="font-bold text-coral">Tickets</strong>
          </span>
        </Link>

        <nav
          className="order-3 flex w-full items-center justify-between gap-4 text-sm text-white/70 sm:order-none sm:w-auto sm:gap-7"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              className="py-2 transition-colors hover:text-paper sm:py-7"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-2 text-xs font-semibold transition-colors hover:border-coral hover:bg-white/5"
          href="/events"
        >
          Find an event <span className="text-base text-coral" aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
