import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { AppHeader } from "@/components/dashboard/app-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { WeekTimesheetClient } from "@/components/timesheets/week-timesheet-client";
import { authOptions } from "@/lib/auth/options";
import { getTimesheetById, getWeekDays } from "@/lib/timesheets/week-detail";

type TimesheetDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TimesheetDetailPage({
  params,
}: TimesheetDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const { id } = await params;
  const timesheet = getTimesheetById(id);

  if (!timesheet) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-950">
      <AppHeader userName={session.user?.name ?? "John Doe"} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 sm:px-6 lg:px-0">
        <WeekTimesheetClient
          days={getWeekDays(timesheet)}
          timesheet={timesheet}
        />
        <DashboardFooter />
      </div>
    </main>
  );
}
