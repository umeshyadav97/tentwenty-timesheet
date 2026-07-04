"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type TaskMenuProps = {
  isDeleting?: boolean;
  isEditing?: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export function TaskMenu({
  isDeleting = false,
  isEditing = false,
  onDelete,
  onEdit,
}: TaskMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleEdit() {
    setIsOpen(false);
    onEdit();
  }

  function handleDelete() {
    setIsOpen(false);
    onDelete();
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="flex size-6 cursor-pointer items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="sr-only">Open task actions</span>
        <MoreHorizontal aria-hidden="true" className="size-4" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-7 z-10 w-24 rounded-md border border-slate-200 bg-white py-1 text-xs shadow-lg">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleting || isEditing}
            onClick={handleEdit}
          >
            {isEditing ? <Spinner className="size-3" /> : null}
            <span>{isEditing ? "Opening" : "Edit"}</span>
          </button>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleting || isEditing}
            onClick={handleDelete}
          >
            {isDeleting ? <Spinner className="size-3" /> : null}
            <span>{isDeleting ? "Deleting" : "Delete"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
