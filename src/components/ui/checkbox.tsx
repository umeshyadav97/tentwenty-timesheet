import type { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function Checkbox({ className = "", label, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs leading-none text-slate-600">
      <input
        type="checkbox"
        className={`size-3 cursor-pointer rounded border border-slate-300 text-blue-600 ${className}`}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
