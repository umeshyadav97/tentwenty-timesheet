export type TimesheetStatus = "completed" | "incomplete" | "missing";
export type TimesheetSortDirection = "asc" | "desc";
export type TimesheetSortKey = "startDate" | "status" | "weekNumber";

export type TimesheetEntry = {
  endDate: string;
  hours: number;
  id: string;
  dateRange: string;
  status: TimesheetStatus;
  startDate: string;
  weekNumber: number;
};

export type TimesheetDateRangeFilter = {
  endDate: string;
  label: string;
  startDate: string;
  value: string;
};
