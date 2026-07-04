import { TaskMenu } from "@/components/timesheets/task-menu";
import { Spinner } from "@/components/ui/spinner";
import type { TaskEntry } from "@/types/task";

type TaskRowProps = {
  isDeleting?: boolean;
  isEditing?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  task: TaskEntry;
};

export function TaskRow({
  isDeleting = false,
  isEditing = false,
  onDelete,
  onEdit,
  task,
}: TaskRowProps) {
  const isBusy = isDeleting || isEditing;

  return (
    <div className="grid min-h-9 grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs">
      <p className="truncate text-slate-950">{task.taskName}</p>
      <p className="whitespace-nowrap text-slate-400">
        {isBusy ? (
          <span className="inline-flex items-center gap-2">
            <Spinner className="size-3" />
            {isDeleting ? "Deleting" : "Opening"}
          </span>
        ) : (
          `${task.hours} hrs`
        )}
      </p>
      <div className="flex items-center gap-2">
        <span className="rounded bg-blue-50 px-2 py-1 text-blue-600">
          {task.projectName}
        </span>
        <TaskMenu
          isDeleting={isDeleting}
          isEditing={isEditing}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
