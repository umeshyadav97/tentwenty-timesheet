import type {
  TimesheetDateRangeFilter,
  TimesheetEntry,
  TimesheetStatus,
} from "@/types/timesheet";

export const allDateRangeValue = "all";
export const allStatusValue = "all";

export const dateRangeFilters: TimesheetDateRangeFilter[] = [
  {
    endDate: "9999-12-31",
    label: "Date Range",
    startDate: "0001-01-01",
    value: allDateRangeValue,
  },
  {
    endDate: "2026-07-31",
    label: "July 2026",
    startDate: "2026-07-01",
    value: "jul-2026",
  },
  {
    endDate: "2026-08-31",
    label: "August 2026",
    startDate: "2026-08-01",
    value: "aug-2026",
  },
  {
    endDate: "2026-08-31",
    label: "July - August 2026",
    startDate: "2026-07-01",
    value: "jul-aug-2026",
  },
  {
    endDate: "2026-09-30",
    label: "September 2026",
    startDate: "2026-09-01",
    value: "sep-2026",
  },
];

export const statusFilterOptions: Array<{
  label: string;
  value: TimesheetStatus | typeof allStatusValue;
}> = [
  { label: "Status", value: allStatusValue },
  { label: "Completed", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
  { label: "Missing", value: "missing" },
];

function toTime(value: string) {
  return new Date(`${value}T00:00:00`).getTime();
}

function overlapsDateRange(entry: TimesheetEntry, range: TimesheetDateRangeFilter) {
  return (
    toTime(entry.startDate) <= toTime(range.endDate) &&
    toTime(entry.endDate) >= toTime(range.startDate)
  );
}

export function filterTimesheets(
  entries: TimesheetEntry[],
  dateRangeValue: string,
  statusValue: string,
) {
  const selectedDateRange =
    dateRangeFilters.find((range) => range.value === dateRangeValue) ??
    dateRangeFilters[0];

  return entries.filter((entry) => {
    const matchesDateRange = overlapsDateRange(entry, selectedDateRange);
    const matchesStatus =
      statusValue === allStatusValue || entry.status === statusValue;

    return matchesDateRange && matchesStatus;
  });
}
