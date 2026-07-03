import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export function TextField({
  className = "",
  error,
  label,
  id,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-xs font-medium leading-none text-slate-950"
      >
        {label}
      </label>
      <input
        id={fieldId}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={`h-8 w-full rounded-md border bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? "border-red-600 focus:border-red-600 focus:ring-red-600/10"
            : "border-slate-300 focus:border-blue-600 focus:ring-blue-600/10"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-xs leading-none text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
