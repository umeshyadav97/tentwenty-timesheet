import { ArrowDown } from "lucide-react";
import { StatusBadge } from "@/components/timesheets/status-badge";
import type { TimesheetEntry } from "@/types/timesheet";

type TimesheetTableProps = {
  entries: TimesheetEntry[];
};

function getActionLabel(status: TimesheetEntry["status"]) {
  if (status === "incomplete") {
    return "Update";
  }

  if (status === "missing") {
    return "Create";
  }

  return "View";
}

function SortableHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-4">
      {label}
      <ArrowDown aria-hidden="true" className="size-3" />
    </span>
  );
}

export function TimesheetTable({ entries }: TimesheetTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableHeader label="Week #" />
              </th>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableHeader label="Date" />
              </th>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableHeader label="Status" />
              </th>
              <th className="whitespace-nowrap px-4 py-4 text-right font-bold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="whitespace-nowrap px-4 py-4">
                  {entry.weekNumber}
                </td>
                <td className="min-w-56 whitespace-nowrap px-4 py-4">
                  {entry.dateRange}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <StatusBadge status={entry.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-right">
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    {getActionLabel(entry.status)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
