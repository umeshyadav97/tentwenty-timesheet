import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
      {children}
    </div>
  );
}
