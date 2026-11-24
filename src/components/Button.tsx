import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

const variantClasses = {
  primary: "border-transparent bg-violet text-white hover:bg-[#6247ed]",
  secondary: "border-transparent bg-charcoal text-white hover:bg-[#1f2937]",
  outline: "border-violet bg-transparent text-violet hover:bg-lavender",
} as const;

export default function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-3 rounded-full border px-5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
