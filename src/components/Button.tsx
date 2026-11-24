import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

const variantClasses = {
  primary: "border-transparent bg-coral text-[#201918] hover:bg-[#ff9279]",
  secondary: "border-transparent bg-navy text-paper hover:bg-[#263b4a]",
  outline: "border-coral-dark bg-transparent text-coral-dark hover:bg-[#f9eae4]",
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
      className={`inline-flex min-h-11 items-center justify-center gap-3 rounded-md border px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
