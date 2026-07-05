"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
};

export function Modal({ children, onClose, title }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-700/85 px-4 py-6"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="w-full max-w-md rounded-md bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 id="modal-title" className="text-sm font-bold text-slate-950">
            {title}
          </h2>
          <button
            type="button"
            className="cursor-pointer rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
          >
            <span className="sr-only">Close modal</span>
            <X aria-hidden="true" className="size-4" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
