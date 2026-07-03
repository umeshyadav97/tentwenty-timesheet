import type { TimesheetStatus } from "@/types/timesheet";

const statusClassName: Record<TimesheetStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  incomplete: "bg-yellow-100 text-yellow-700",
  missing: "bg-pink-100 text-pink-700",
};

export function StatusBadge({ status }: { status: TimesheetStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold uppercase leading-none ${statusClassName[status]}`}
    >
      {status}
    </span>
  );
}
