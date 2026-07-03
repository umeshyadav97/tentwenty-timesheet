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
    endDate: "2024-01-31",
    label: "January 2024",
    startDate: "2024-01-01",
    value: "jan-2024",
  },
  {
    endDate: "2024-02-29",
    label: "February 2024",
    startDate: "2024-02-01",
    value: "feb-2024",
  },
  {
    endDate: "2024-02-29",
    label: "Jan - Feb 2024",
    startDate: "2024-01-01",
    value: "jan-feb-2024",
  },
  {
    endDate: "2024-03-31",
    label: "March 2024",
    startDate: "2024-03-01",
    value: "mar-2024",
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
