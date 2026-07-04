import type { TaskEntry, WeekDay } from "@/types/task";
import type { TimesheetEntry } from "@/types/timesheet";
import { timesheetEntries } from "@/lib/timesheets/data";

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

  return Array.from({ length: 5 }, (_, dayIndex) => {
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
