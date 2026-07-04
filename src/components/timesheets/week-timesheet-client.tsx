"use client";

import { useMemo, useState } from "react";
import { AddEntryModal } from "@/components/timesheets/add-entry-modal";
import { WeekDaySection } from "@/components/timesheets/week-day-section";
import type { TaskEntry, TaskFormValues, WeekDay } from "@/types/task";
import type { TimesheetEntry } from "@/types/timesheet";

type WeekTimesheetClientProps = {
  days: WeekDay[];
  timesheet: TimesheetEntry;
};

type ModalState =
  | {
      dayLabel: string;
      mode: "add";
      taskId?: never;
    }
  | {
      dayLabel: string;
      mode: "edit";
      taskId: string;
    };

function createTask(dayLabel: string, values: TaskFormValues): TaskEntry {
  return {
    ...values,
    dayLabel,
    id: `${dayLabel.toLowerCase()}-${Date.now()}`,
  };
}

function getTaskById(days: WeekDay[], taskId?: string) {
  if (!taskId) {
    return undefined;
  }

  return days.flatMap((day) => day.tasks).find((task) => task.id === taskId);
}

function waitForLocalUpdate() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });
}

export function WeekTimesheetClient({
  days,
  timesheet,
}: WeekTimesheetClientProps) {
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [weekDays, setWeekDays] = useState(days);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const totalHours = useMemo(
    () =>
      weekDays.reduce(
        (weekTotal, day) =>
          weekTotal +
          day.tasks.reduce((dayTotal, task) => dayTotal + task.hours, 0),
        0,
      ),
    [weekDays],
  );
  const completionPercent = Math.min(100, Math.round((totalHours / 40) * 100));
  const selectedTask = getTaskById(weekDays, modalState?.taskId);

  function closeModal() {
    setModalState(null);
  }

  async function openEditModal(dayLabel: string, taskId: string) {
    setEditingTaskId(taskId);
    await waitForLocalUpdate();
    setModalState({ dayLabel, mode: "edit", taskId });
    setEditingTaskId(null);
  }

  async function addTask(dayLabel: string, values: TaskFormValues) {
    setIsSavingEntry(true);
    await waitForLocalUpdate();
    setWeekDays((currentDays) =>
      currentDays.map((day) =>
        day.dayLabel === dayLabel
          ? { ...day, tasks: [...day.tasks, createTask(dayLabel, values)] }
          : day,
      ),
    );
    setIsSavingEntry(false);
    closeModal();
  }

  async function updateTask(taskId: string, values: TaskFormValues) {
    setIsSavingEntry(true);
    await waitForLocalUpdate();
    setWeekDays((currentDays) =>
      currentDays.map((day) => ({
        ...day,
        tasks: day.tasks.map((task) =>
          task.id === taskId ? { ...task, ...values } : task,
        ),
      })),
    );
    setIsSavingEntry(false);
    closeModal();
  }

  async function deleteTask(taskId: string) {
    setDeletingTaskId(taskId);
    await waitForLocalUpdate();
    setWeekDays((currentDays) =>
      currentDays.map((day) => ({
        ...day,
        tasks: day.tasks.filter((task) => task.id !== taskId),
      })),
    );
    setDeletingTaskId(null);
  }

  return (
    <>
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-950">
              This week&apos;s timesheet
            </h1>
            <p className="mt-2 text-xs text-slate-500">{timesheet.dateRange}</p>
          </div>

          <div className="min-w-44">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-950">
                {totalHours}/40 hrs
              </span>
              <span className="text-slate-400">{completionPercent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-orange-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div>
          {weekDays.map((day) => (
            <WeekDaySection
              key={day.dateLabel}
              day={day}
              deletingTaskId={deletingTaskId}
              editingTaskId={editingTaskId}
              onAddEntry={() =>
                setModalState({ dayLabel: day.dayLabel, mode: "add" })
              }
              onDeleteTask={deleteTask}
              onEditTask={(taskId) => openEditModal(day.dayLabel, taskId)}
            />
          ))}
        </div>
      </section>

      {modalState ? (
        <AddEntryModal
          initialTask={selectedTask}
          isSaving={isSavingEntry}
          mode={modalState.mode}
          onClose={closeModal}
          onSave={(values) => {
            if (modalState.mode === "edit") {
              updateTask(modalState.taskId, values);
              return;
            }

            addTask(modalState.dayLabel, values);
          }}
        />
      ) : null}
    </>
  );
}
