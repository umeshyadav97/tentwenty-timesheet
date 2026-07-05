import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import type { TimesheetEntry } from "@/types/timesheet";

type TimesheetActionsProps = {
  entry: TimesheetEntry;
  isLoading: boolean;
  onNavigate: (entryId: string) => void;
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

export function TimesheetActions({
  entry,
  isLoading,
  onNavigate,
}: TimesheetActionsProps) {
  return (
    <Link
      href={`/dashboard/timesheets/${entry.id}`}
      className="inline-flex cursor-pointer items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700"
      onClick={() => onNavigate(entry.id)}
    >
      {isLoading ? <Spinner className="size-3" /> : null}
      {getActionLabel(entry.status)}
    </Link>
  );
}
