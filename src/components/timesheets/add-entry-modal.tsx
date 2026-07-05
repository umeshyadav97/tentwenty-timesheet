"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { OverlayLoader } from "@/components/ui/overlay-loader";
import { SelectField } from "@/components/ui/select-field";
import { TextareaField } from "@/components/ui/textarea-field";
import type { TaskEntry, TaskFormValues } from "@/types/task";

type AddEntryModalProps = {
  initialTask?: TaskEntry;
  isSaving: boolean;
  mode: "add" | "edit";
  onClose: () => void;
  onSave: (values: TaskFormValues) => void;
};

const projectOptions = [
  { label: "Project Name", value: "Project Name" },
  { label: "Homepage Development", value: "Homepage Development" },
  { label: "Design System", value: "Design System" },
];

const workOptions = [
  { label: "Bug fixes", value: "Bug fixes" },
  { label: "Feature work", value: "Feature work" },
  { label: "Code review", value: "Code review" },
];

export function AddEntryModal({
  initialTask,
  isSaving,
  mode,
  onClose,
  onSave,
}: AddEntryModalProps) {
  const [hours, setHours] = useState(initialTask?.hours ?? 1);
  const [projectName, setProjectName] = useState(
    initialTask?.projectName ?? projectOptions[0].value,
  );
  const [taskName, setTaskName] = useState(initialTask?.taskName ?? "");
  const [typeOfWork, setTypeOfWork] = useState(
    initialTask?.typeOfWork ?? workOptions[0].value,
  );

  return (
    <Modal title={mode === "edit" ? "Edit Entry" : "Add New Entry"} onClose={onClose}>
      <form
        className="relative space-y-4 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (isSaving) {
            return;
          }

          onSave({
            hours,
            projectName,
            taskName: taskName.trim() || projectName,
            typeOfWork,
          });
        }}
      >
        <SelectField
          info="Choose the project this task belongs to."
          label="Select Project *"
          options={projectOptions}
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <SelectField
          info="Choose how this work should be categorized."
          label="Type of Work *"
          options={workOptions}
          value={typeOfWork}
          onChange={(event) => setTypeOfWork(event.target.value)}
        />
        <TextareaField
          label="Task description *"
          placeholder="Write text here ..."
          hint="A note for extra info"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-950">Hours *</p>
          <div className="inline-flex h-8 overflow-hidden rounded-md border border-slate-300">
            <button
              type="button"
              className="flex w-8 cursor-pointer items-center justify-center text-slate-500 transition hover:bg-slate-50"
              onClick={() => setHours((value) => Math.max(1, value - 1))}
            >
              <Minus aria-hidden="true" className="size-3" />
            </button>
            <span className="flex w-10 items-center justify-center border-x border-slate-300 text-xs text-slate-950">
              {hours}
            </span>
            <button
              type="button"
              className="flex w-8 cursor-pointer items-center justify-center text-slate-500 transition hover:bg-slate-50"
              onClick={() => setHours((value) => Math.min(12, value + 1))}
            >
              <Plus aria-hidden="true" className="size-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button type="submit" disabled={isSaving}>
            {mode === "edit" ? "Update entry" : "Add entry"}
          </Button>
          <button
            type="button"
            className="h-8 cursor-pointer rounded-md border border-slate-200 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        {isSaving ? <OverlayLoader label="Saving entry..." /> : null}
      </form>
    </Modal>
  );
}
