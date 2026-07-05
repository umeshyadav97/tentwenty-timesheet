import {
  allDateRangeValue,
  allStatusValue,
  completedTimesheetHours,
  dateRangeFilters,
  timesheetSeeds,
  workWeekDayCount,
} from "@/constants/timesheet.constants";
import type { TaskEntry, WeekDay } from "@/types/task";
import type {
  TimesheetDateRangeFilter,
  TimesheetEntry,
  TimesheetStatus,
} from "@/types/timesheet";

const taskNames = [
  "Homepage Development",
  "Design System Cleanup",
  "API Integration",
  "QA Fixes",
];

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
});

export function getTimesheetStatus(hours: number): TimesheetStatus {
  if (hours >= completedTimesheetHours) {
    return "completed";
  }

  if (hours > 0) {
    return "incomplete";
  }

  return "missing";
}

export const timesheetEntries: TimesheetEntry[] = timesheetSeeds.map((entry) => ({
  ...entry,
  status: getTimesheetStatus(entry.hours),
}));

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
    dateRangeFilters.find((range) => range.value === allDateRangeValue) ??
    dateRangeFilters[0];

  return entries.filter((entry) => {
    const matchesDateRange = overlapsDateRange(entry, selectedDateRange);
    const matchesStatus =
      statusValue === allStatusValue || entry.status === statusValue;

    return matchesDateRange && matchesStatus;
  });
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function makeTask(dayLabel: string, index: number): TaskEntry {
  return {
    dayLabel,
    hours: 4,
    id: `${dayLabel.toLowerCase()}-${index}`,
    projectName: "Project Name",
    taskName: taskNames[index % taskNames.length],
    typeOfWork: "Bug fixes",
  };
}

function getTaskCount(dayIndex: number, status: TimesheetEntry["status"]) {
  if (status === "missing") {
    return dayIndex === 4 ? 0 : 1;
  }

  if (status === "incomplete") {
    return dayIndex < 3 ? 2 : 1;
  }

  return dayIndex === 0 ? 2 : 3;
}

export function getTimesheetById(id: string) {
  return timesheetEntries.find((entry) => entry.id === id);
}

export function getWeekDays(timesheet: TimesheetEntry): WeekDay[] {
  const startDate = new Date(`${timesheet.startDate}T00:00:00`);

  return Array.from({ length: workWeekDayCount }, (_, dayIndex) => {
    const date = addDays(startDate, dayIndex);
    const dayLabel = weekdayFormatter.format(date);

    return {
      dateLabel: dayFormatter.format(date),
      dayLabel,
      tasks: Array.from({ length: getTaskCount(dayIndex, timesheet.status) }, (_, index) =>
        makeTask(dayLabel, index),
      ),
    };
  });
}
