import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`h-8 cursor-pointer rounded-md bg-brand px-4 text-xs font-medium text-white transition hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
