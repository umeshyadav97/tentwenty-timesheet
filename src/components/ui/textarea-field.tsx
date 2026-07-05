import type { TextareaHTMLAttributes } from "react";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hint?: string;
  label: string;
};

export function TextareaField({
  className = "",
  hint,
  label,
  ...props
}: TextareaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="block text-xs font-medium leading-none text-slate-950">
        {label}
      </span>
      <textarea
        className={`min-h-28 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}
