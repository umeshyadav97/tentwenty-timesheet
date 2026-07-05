import type { TimesheetEntry } from "@/types/timesheet";
import { apiRequest } from "@/lib/api/http-client";

type TimesheetsResponse = {
  entries: TimesheetEntry[];
};

export async function getTimesheets() {
  const payload = await apiRequest<TimesheetsResponse>("/api/timesheets");
  return payload.entries;
}
