import { ChevronDown, Info } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  info?: string;
  label: string;
  options: Array<{ label: string; value: string }>;
};

export function SelectField({
  className = "",
  info,
  label,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-1 text-xs font-medium leading-none text-slate-950">
        <span>{label}</span>
        {info ? (
          <span className="group relative inline-flex">
            <Info aria-hidden="true" className="size-3 text-slate-400" />
            <span className="pointer-events-none absolute left-1/2 top-5 z-10 hidden w-40 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs font-normal leading-4 text-white group-hover:block">
              {info}
            </span>
          </span>
        ) : null}
      </span>
      <span className="relative block">
        <select
          className={`h-8 w-full cursor-pointer appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-xs text-slate-600 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        />
      </span>
    </label>
  );
}
