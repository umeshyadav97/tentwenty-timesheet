"use client";

import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

type AppHeaderProps = {
  userName: string;
};

export function AppHeader({ userName }: AppHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-8">
        <p className="text-xl font-bold tracking-tight text-slate-950">
          ticktock
        </p>
        <p className="hidden text-xs font-semibold text-slate-950 sm:block">
          Timesheets
        </p>
      </div>

      <button
        type="button"
        className="inline-flex cursor-pointer items-center text-sm text-slate-600 transition hover:text-slate-950"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        {userName}
        <ChevronDown aria-hidden="true" className="ml-1 size-4" />
      </button>
    </header>
  );
}
