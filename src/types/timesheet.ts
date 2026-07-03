export type TimesheetStatus = "completed" | "incomplete" | "missing";

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
