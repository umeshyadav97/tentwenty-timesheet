import { ChevronDown } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  ariaLabel: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  value: string;
};

export function FilterSelect({
  ariaLabel,
  onChange,
  options,
  value,
}: FilterSelectProps) {
  return (
    <label className="relative block w-full sm:w-auto">
      <span className="sr-only">{ariaLabel}</span>
      <select
        aria-label={ariaLabel}
        className="h-9 w-full min-w-36 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-xs text-slate-500 outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 sm:w-auto"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
      />
    </label>
  );
}
