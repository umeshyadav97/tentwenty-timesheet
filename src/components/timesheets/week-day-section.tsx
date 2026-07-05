import { Plus } from "lucide-react";
import { TaskRow } from "@/components/timesheets/task-row";
import type { WeekDay } from "@/types/task";

type WeekDaySectionProps = {
  day: WeekDay;
  deletingTaskId: string | null;
  editingTaskId: string | null;
  onAddEntry: () => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
};

export function WeekDaySection({
  day,
  deletingTaskId,
  editingTaskId,
  onAddEntry,
  onDeleteTask,
  onEditTask,
}: WeekDaySectionProps) {
  return (
    <section className="grid gap-3 border-b border-slate-100 py-4 last:border-b-0 md:grid-cols-[5rem_1fr]">
      <div>
        <p className="text-sm font-semibold text-slate-950">{day.dateLabel}</p>
      </div>

      <div className="space-y-2">
        {day.tasks.map((task) => (
          <TaskRow
            key={task.id}
            isDeleting={deletingTaskId === task.id}
            isEditing={editingTaskId === task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={() => onEditTask(task.id)}
          />
        ))}

        <button
          type="button"
          className="flex min-h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-xs text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          onClick={onAddEntry}
        >
          <Plus aria-hidden="true" className="size-3" />
          Add new task
        </button>
      </div>
    </section>
  );
}
