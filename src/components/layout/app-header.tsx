"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { OverlayLoader } from "@/components/ui/overlay-loader";

type AppHeaderProps = {
  userName: string;
};

export function AppHeader({ userName }: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="flex items-center gap-8">
          <p className="text-xl font-bold tracking-tight text-slate-950">
            ticktock
          </p>
          <p className="hidden text-xs font-semibold text-slate-950 sm:block">
            Timesheets
          </p>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center rounded-md px-2 py-1 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {userName}
            <ChevronDown
              aria-hidden="true"
              className={`ml-1 size-4 transition ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMenuOpen ? (
            <div
              className="absolute right-0 top-9 z-20 w-36 rounded-md border border-slate-200 bg-white py-1 text-sm shadow-lg"
              role="menu"
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-red-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSigningOut}
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSigningOut(true);
                  signOut({ callbackUrl: "/" });
                }}
              >
                <LogOut aria-hidden="true" className="size-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {isSigningOut ? (
        <OverlayLoader label="Logging out..." variant="fullscreen" />
      ) : null}
    </>
  );
}
