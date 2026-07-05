"use client";

import { useState } from "react";
import { TimesheetRow } from "@/components/timesheets/timesheet-row";
import { SortableTableHeader } from "@/components/ui/sortable-table-header";
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
              <TimesheetRow
                key={entry.id}
                entry={entry}
                isNavigating={loadingEntryId === entry.id}
                onNavigate={setLoadingEntryId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
