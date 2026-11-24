export interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: FAQItemProps) {
  return (
    <details className="group rounded-2xl border border-violet/10 bg-white p-5 shadow-[0_8px_24px_rgba(115,87,255,0.04)]" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-extrabold text-charcoal marker:hidden">
        {question}
        <span className="text-xl font-normal text-violet transition-transform group-open:rotate-45" aria-hidden="true">+</span>
      </summary>
      <p className="max-w-2xl pt-4 text-sm leading-7 text-secondary">{answer}</p>
    </details>
  );
}
