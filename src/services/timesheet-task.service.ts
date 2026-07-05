import type { TaskEntry, TaskFormValues, WeekDay } from "@/types/task";

function createTaskEntry(dayLabel: string, values: TaskFormValues): TaskEntry {
  return {
    ...values,
    dayLabel,
    id: `${dayLabel.toLowerCase()}-${Date.now()}`,
  };
}

export function addTaskEntry(
  days: WeekDay[],
  dayLabel: string,
  values: TaskFormValues,
) {
  return days.map((day) =>
    day.dayLabel === dayLabel
      ? { ...day, tasks: [...day.tasks, createTaskEntry(dayLabel, values)] }
      : day,
  );
}

export function updateTaskEntry(
  days: WeekDay[],
  taskId: string,
  values: TaskFormValues,
) {
  return days.map((day) => ({
    ...day,
    tasks: day.tasks.map((task) =>
      task.id === taskId ? { ...task, ...values } : task,
    ),
  }));
}

export function deleteTaskEntry(days: WeekDay[], taskId: string) {
  return days.map((day) => ({
    ...day,
    tasks: day.tasks.filter((task) => task.id !== taskId),
  }));
}
