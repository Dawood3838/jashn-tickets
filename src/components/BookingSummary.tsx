export interface BookingSummaryLine {
  label: string;
  value: string;
}

export interface BookingSummaryProps {
  heading?: string;
  lines: readonly BookingSummaryLine[];
  subtotal: string;
  serviceFee: string;
  total: string;
}

export default function BookingSummary({
  heading = "Order summary",
  lines,
  subtotal,
  serviceFee,
  total,
}: BookingSummaryProps) {
  return (
    <aside className="rounded-3xl bg-charcoal p-6 text-white shadow-[0_18px_40px_rgba(17,24,39,0.12)] sm:p-7" aria-labelledby="booking-summary-heading">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime">Your booking</p>
      <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]" id="booking-summary-heading">{heading}</h2>
      <div className="mt-7 space-y-4 border-b border-white/15 pb-6">
        {lines.length > 0 ? lines.map((line) => (
          <div className="flex items-start justify-between gap-4 text-sm" key={line.label}>
            <span className="text-white/60">{line.label}</span>
            <strong className="text-right text-white">{line.value}</strong>
          </div>
        )) : (
          <p className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/60">
            Your selected tickets will appear here.
          </p>
        )}
      </div>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 text-white/60"><dt>Subtotal</dt><dd>{subtotal}</dd></div>
        <div className="flex justify-between gap-4 text-white/60"><dt>Service fee</dt><dd>{serviceFee}</dd></div>
        <div className="flex justify-between gap-4 border-t border-white/15 pt-4 text-base font-extrabold"><dt>Total</dt><dd className="text-lime">{total}</dd></div>
      </dl>
    </aside>
  );
}
