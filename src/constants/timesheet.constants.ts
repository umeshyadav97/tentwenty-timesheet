import type {
  TimesheetDateRangeFilter,
  TimesheetStatus,
} from "@/types/timesheet";

export const allDateRangeValue = "all";
export const allStatusValue = "all";
export const defaultPageSize = 5;
export const workWeekDayCount = 5;
export const completedTimesheetHours = 40;

export const timesheetStatusOrder: Record<TimesheetStatus, number> = {
  completed: 1,
  incomplete: 2,
  missing: 3,
};

export const timesheetSeeds = [
  {
    endDate: "2026-07-03",
    hours: 40,
    id: "week-1",
    dateRange: "29 June - 3 July, 2026",
    startDate: "2026-06-29",
    weekNumber: 1,
  },
  {
    endDate: "2026-07-10",
    hours: 42,
    id: "week-2",
    dateRange: "6 - 10 July, 2026",
    startDate: "2026-07-06",
    weekNumber: 2,
  },
  {
    endDate: "2026-07-17",
    hours: 32,
    id: "week-3",
    dateRange: "13 - 17 July, 2026",
    startDate: "2026-07-13",
    weekNumber: 3,
  },
  {
    endDate: "2026-07-24",
    hours: 40,
    id: "week-4",
    dateRange: "20 - 24 July, 2026",
    startDate: "2026-07-20",
    weekNumber: 4,
  },
  {
    endDate: "2026-07-31",
    hours: 0,
    id: "week-5",
    dateRange: "27 - 31 July, 2026",
    startDate: "2026-07-27",
    weekNumber: 5,
  },
  {
    endDate: "2026-08-07",
    hours: 38,
    id: "week-6",
    dateRange: "3 - 7 August, 2026",
    startDate: "2026-08-03",
    weekNumber: 6,
  },
  {
    endDate: "2026-08-14",
    hours: 40,
    id: "week-7",
    dateRange: "10 - 14 August, 2026",
    startDate: "2026-08-10",
    weekNumber: 7,
  },
  {
    endDate: "2026-08-21",
    hours: 0,
    id: "week-8",
    dateRange: "17 - 21 August, 2026",
    startDate: "2026-08-17",
    weekNumber: 8,
  },
  {
    endDate: "2026-08-28",
    hours: 36,
    id: "week-9",
    dateRange: "24 - 28 August, 2026",
    startDate: "2026-08-24",
    weekNumber: 9,
  },
  {
    endDate: "2026-09-04",
    hours: 40,
    id: "week-10",
    dateRange: "31 August - 4 September, 2026",
    startDate: "2026-08-31",
    weekNumber: 10,
  },
  {
    endDate: "2026-09-11",
    hours: 22,
    id: "week-11",
    dateRange: "7 - 11 September, 2026",
    startDate: "2026-09-07",
    weekNumber: 11,
  },
  {
    endDate: "2026-09-18",
    hours: 0,
    id: "week-12",
    dateRange: "14 - 18 September, 2026",
    startDate: "2026-09-14",
    weekNumber: 12,
  },
] as const;

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
