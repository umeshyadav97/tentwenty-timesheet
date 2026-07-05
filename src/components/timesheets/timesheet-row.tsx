import { StatusBadge } from "@/components/timesheets/status-badge";
import { TimesheetActions } from "@/components/timesheets/timesheet-actions";
import type { TimesheetEntry } from "@/types/timesheet";

type TimesheetRowProps = {
  entry: TimesheetEntry;
  isNavigating: boolean;
  onNavigate: (entryId: string) => void;
};

export function TimesheetRow({
  entry,
  isNavigating,
  onNavigate,
}: TimesheetRowProps) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-4">{entry.weekNumber}</td>
      <td className="min-w-56 whitespace-nowrap px-4 py-4">
        {entry.dateRange}
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <StatusBadge status={entry.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right">
        <TimesheetActions
          entry={entry}
          isLoading={isNavigating}
          onNavigate={onNavigate}
        />
      </td>
    </tr>
  );
}
