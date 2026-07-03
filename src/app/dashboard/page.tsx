import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/dashboard/app-header";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { authOptions } from "@/lib/auth/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <AppHeader userName={session.user?.name ?? "John Doe"} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 sm:px-6 lg:px-0">
        <DashboardClient />
        <DashboardFooter />
      </div>
    </main>
  );
}
