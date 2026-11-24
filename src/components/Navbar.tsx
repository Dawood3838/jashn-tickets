import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/booking", label: "Booking" },
  { href: "/support", label: "Support" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-charcoal/10 bg-white/90 text-charcoal shadow-[0_4px_20px_rgba(17,24,39,0.04)] backdrop-blur-md">
      <div className="mx-auto flex w-[min(100%-2.5rem,1180px)] flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 sm:min-h-20 sm:flex-nowrap sm:py-0">
        <Link
          className="inline-flex items-center gap-2.5 text-base font-extrabold tracking-[-0.03em]"
          href="/"
          aria-label="Jashn Tickets home"
        >
          <span
            className="grid h-8 w-8 rotate-[-6deg] place-items-center rounded-xl bg-violet text-sm font-black text-white shadow-[3px_3px_0_0_#c7f36b]"
            aria-hidden="true"
          >
            J
          </span>
          <span>
            Jashn <strong className="font-black text-violet">Tickets</strong>
          </span>
        </Link>

        <nav
          className="order-3 flex w-full items-center justify-between gap-4 text-sm font-semibold text-secondary sm:order-none sm:w-auto sm:gap-7"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              className="rounded-full px-2 py-2 transition-colors hover:bg-lavender hover:text-violet sm:py-2"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex items-center gap-2 rounded-full bg-violet px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(115,87,255,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#6247ed]"
          href="/events"
        >
          Explore events <span className="text-base text-lime" aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
