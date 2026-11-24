import Link from "next/link";
import ConfirmationPanel from "@/components/ConfirmationPanel";

export default function ConfirmationPage() {
  return (
    <div className="bg-lavender">
      <div className="mx-auto w-[min(100%-2.5rem,900px)] py-12 sm:py-20">
        <header className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lime text-3xl font-black text-charcoal shadow-[0_10px_25px_rgba(199,243,107,0.3)]" aria-hidden="true">✓</span>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-violet">Booking confirmation</p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.07em] text-charcoal">
            You&apos;re almost there.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-secondary">
            Your confirmed experience, ticket details and booking reference will appear on this page.
          </p>
        </header>

        <div className="mt-12">
          <ConfirmationPanel />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-violet/10 bg-white p-5 sm:flex-row">
          <p className="text-sm text-secondary">A printable ticket view will be available after confirmation.</p>
          <button className="rounded-full border border-violet/20 px-4 py-2.5 text-sm font-extrabold text-violet disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled>
            Print or download ticket
          </button>
        </div>
        <div className="mt-8 text-center">
          <Link className="text-sm font-extrabold text-violet hover:underline" href="/events">← Browse more events</Link>
        </div>
      </div>
    </div>
  );
}
