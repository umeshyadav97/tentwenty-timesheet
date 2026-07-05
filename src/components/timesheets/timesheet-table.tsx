"use client";

import Link from "next/link";
import { useState } from "react";
import { SortableTableHeader } from "@/components/ui/sortable-table-header";
import { Spinner } from "@/components/ui/spinner";
import { StatusBadge } from "@/components/timesheets/status-badge";
import type {
  TimesheetEntry,
  TimesheetSortDirection,
  TimesheetSortKey,
} from "@/types/timesheet";

type TimesheetTableProps = {
  entries: TimesheetEntry[];
  onSort: (sortKey: TimesheetSortKey) => void;
  sortDirection: TimesheetSortDirection;
  sortKey: TimesheetSortKey;
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

export function TimesheetTable({
  entries,
  onSort,
  sortDirection,
  sortKey,
}: TimesheetTableProps) {
  const [loadingEntryId, setLoadingEntryId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableTableHeader
                  activeSortKey={sortKey}
                  label="Week #"
                  sortDirection={sortDirection}
                  sortKey="weekNumber"
                  onSort={onSort}
                />
              </th>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableTableHeader
                  activeSortKey={sortKey}
                  label="Date"
                  sortDirection={sortDirection}
                  sortKey="startDate"
                  onSort={onSort}
                />
              </th>
              <th className="whitespace-nowrap px-4 py-4 font-bold uppercase">
                <SortableTableHeader
                  activeSortKey={sortKey}
                  label="Status"
                  sortDirection={sortDirection}
                  sortKey="status"
                  onSort={onSort}
                />
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
                  <Link
                    href={`/dashboard/timesheets/${entry.id}`}
                    className="inline-flex cursor-pointer items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
                    onClick={() => setLoadingEntryId(entry.id)}
                  >
                    {loadingEntryId === entry.id ? (
                      <Spinner className="size-3" />
                    ) : null}
                    {getActionLabel(entry.status)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
