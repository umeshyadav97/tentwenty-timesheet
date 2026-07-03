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
        className="block text-xs font-medium leading-none text-ink"
      >
        {label}
      </label>
      <input
        id={fieldId}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={`h-8 w-full rounded-md border bg-white px-3 text-xs text-ink outline-none transition placeholder:text-placeholder focus:ring-2 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border focus:border-brand focus:ring-brand/10"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-xs leading-none text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
