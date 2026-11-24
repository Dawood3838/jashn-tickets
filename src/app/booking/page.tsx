import Link from "next/link";
import BookingSummary from "@/components/BookingSummary";

export default function BookingPage() {
  return (
    <div className="bg-lavender">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">Your booking</p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
            Make it official.
          </h1>
          <p className="mt-5 text-base leading-7 text-secondary sm:text-lg">
            Review your tickets and add your details before you head to your next experience.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(115,87,255,0.06)] sm:p-8" aria-labelledby="customer-information-heading">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Step 01</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-charcoal" id="customer-information-heading">Your information</h2>
              <p className="mt-2 text-sm text-secondary">Tell us who is joining the experience.</p>
              <form className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-charcoal">
                  Full name
                  <input className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus:border-violet" type="text" placeholder="Your full name" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-charcoal">
                  Email address
                  <input className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus:border-violet" type="email" placeholder="you@example.com" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-charcoal sm:max-w-[12rem]">
                  Age
                  <input className="min-h-12 rounded-2xl border border-border bg-white px-4 text-sm font-normal outline-none transition-colors placeholder:text-secondary/60 focus:border-violet" type="number" placeholder="Age" />
                </label>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(115,87,255,0.06)] sm:p-8" aria-labelledby="ticket-summary-heading">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Step 02</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-charcoal" id="ticket-summary-heading">Selected tickets</h2>
              <div className="mt-6 rounded-2xl border border-dashed border-violet/25 bg-lavender p-8 text-center">
                <p className="text-sm font-bold text-charcoal">No tickets selected yet.</p>
                <Link className="mt-3 inline-block text-sm font-extrabold text-violet hover:underline" href="/events">Browse events <span aria-hidden="true">↗</span></Link>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-28">
            <BookingSummary lines={[]} subtotal="—" serviceFee="—" total="—" />
            <button className="mt-4 w-full rounded-full bg-violet px-5 py-4 text-sm font-extrabold text-white transition-colors hover:bg-[#6247ed] disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled>
              Continue to confirmation
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-secondary">Booking validation and submission will be connected by Division 2.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
