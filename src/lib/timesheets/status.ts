import type { TimesheetStatus } from "@/types/timesheet";

export const timesheetStatusOrder: Record<TimesheetStatus, number> = {
  completed: 1,
  incomplete: 2,
  missing: 3,
};

export function getTimesheetStatus(hours: number): TimesheetStatus {
  if (hours >= 40) {
    return "completed";
  }

  if (hours > 0) {
    return "incomplete";
  }

  return "missing";
}
