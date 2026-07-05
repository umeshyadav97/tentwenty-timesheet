import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { PageShell } from "@/components/layout/page-shell";
import { authOptions } from "@/lib/auth/options";

type AppLayoutProps = {
  children: ReactNode;
};

export async function AppLayout({ children }: AppLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <AppHeader userName={session.user?.name ?? "John Doe"} />
      <PageShell>{children}</PageShell>
    </main>
  );
}
