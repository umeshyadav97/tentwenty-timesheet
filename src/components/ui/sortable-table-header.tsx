import { ArrowDown } from "lucide-react";

type SortDirection = "asc" | "desc";

type SortableTableHeaderProps<TSortKey extends string> = {
  activeSortKey: TSortKey;
  label: string;
  onSort: (sortKey: TSortKey) => void;
  sortDirection: SortDirection;
  sortKey: TSortKey;
};

export function SortableTableHeader<TSortKey extends string>({
  activeSortKey,
  label,
  onSort,
  sortDirection,
  sortKey,
}: SortableTableHeaderProps<TSortKey>) {
  const isActive = activeSortKey === sortKey;

  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-4 uppercase transition hover:text-slate-700"
      onClick={() => onSort(sortKey)}
    >
      <span>{label}</span>
      <ArrowDown
        aria-hidden="true"
        className={`size-3 transition ${
          isActive ? "text-slate-700" : "text-slate-400"
        } ${isActive && sortDirection === "asc" ? "rotate-180" : ""}`}
      />
      <span className="sr-only">
        Sort by {label} {isActive && sortDirection === "asc" ? "descending" : "ascending"}
      </span>
    </button>
  );
}
