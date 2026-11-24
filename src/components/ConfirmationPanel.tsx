export interface ConfirmationPanelProps {
  referenceLabel?: string;
  heading?: string;
  description?: string;
}

export default function ConfirmationPanel({
  referenceLabel = "Booking reference",
  heading = "Your confirmation will appear here.",
  description = "Complete a valid booking to receive your ticket summary and confirmation reference.",
}: ConfirmationPanelProps) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(115,87,255,0.1)] sm:p-10" aria-labelledby="confirmation-panel-heading">
      <div className="flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime text-2xl font-black text-charcoal" aria-hidden="true">✓</span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet">Success awaits</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-charcoal" id="confirmation-panel-heading">{heading}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-secondary">{description}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-lavender px-4 py-3 sm:text-right">
          <span className="block text-xs font-bold text-secondary">{referenceLabel}</span>
          <strong className="mt-1 block text-sm text-violet">Available after booking</strong>
        </div>
      </div>
      <div className="mt-7 rounded-2xl border border-dashed border-violet/20 bg-lavender/50 p-8 text-center">
        <p className="text-sm font-bold text-charcoal">Ticket summary preview</p>
        <p className="mt-2 text-sm text-secondary">Confirmed event and ticket details will be displayed here.</p>
      </div>
    </section>
  );
}
