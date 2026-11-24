import Link from "next/link";
import FAQItem from "@/components/FAQItem";

const faqs = [
  {
    question: "How will I find an event?",
    answer: "Use the Events page to browse the catalogue by category, then search and filter once the discovery controls are connected.",
  },
  {
    question: "How do tickets and booking work?",
    answer: "Select an event and ticket option, review your order, then provide attendee details before confirming your simulated booking.",
  },
  {
    question: "Is this a real ticketing service?",
    answer: "Jashn Tickets is a university project foundation. Payment, live inventory and ticket issuance will be represented by the completed application flow.",
  },
  {
    question: "Which cities are covered?",
    answer: "The experience is designed around event discovery in Islamabad and Rawalpindi.",
  },
] as const;

export default function SupportPage() {
  return (
    <div className="bg-lavender">
      <div className="mx-auto w-[min(100%-2.5rem,1000px)] py-10 sm:py-16">
        <header className="relative overflow-hidden rounded-[2rem] bg-violet px-6 py-12 text-white sm:px-12 sm:py-16">
          <span className="pointer-events-none absolute -right-8 -top-16 text-[12rem] font-black leading-none text-white/10" aria-hidden="true">?</span>
          <div className="relative max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime">Jashn support</p>
            <h1 className="mt-5 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.07em]">
              Need a little help?
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Find guidance for discovering events, reviewing tickets and getting ready for your next experience.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Support information">
          <div className="rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(115,87,255,0.06)]">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender text-xl text-violet" aria-hidden="true">✦</span>
            <h2 className="mt-5 text-xl font-extrabold tracking-[-0.03em] text-charcoal">Support contact</h2>
            <p className="mt-2 text-sm leading-6 text-secondary">A support email address will be configured for the final deployment.</p>
            <span className="mt-4 inline-block rounded-full bg-lavender px-3 py-1.5 text-xs font-bold text-violet">Contact details coming soon</span>
          </div>
          <div className="rounded-3xl bg-charcoal p-6 text-white shadow-[0_12px_30px_rgba(17,24,39,0.1)]">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime text-xl text-charcoal" aria-hidden="true">↗</span>
            <h2 className="mt-5 text-xl font-extrabold tracking-[-0.03em]">Ready to explore?</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">Start with the event catalogue and find your next city experience.</p>
            <Link className="mt-5 inline-flex rounded-full bg-lime px-4 py-2.5 text-sm font-extrabold text-charcoal hover:bg-[#d5fa8b]" href="/events">Browse events <span className="ml-2" aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq-heading">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Common questions</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-charcoal" id="faq-heading">Answers for your next plan.</h2>
          <div className="mt-6 grid gap-3">
            {faqs.map((faq, index) => (
              <FAQItem {...faq} defaultOpen={index === 0} key={faq.question} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
