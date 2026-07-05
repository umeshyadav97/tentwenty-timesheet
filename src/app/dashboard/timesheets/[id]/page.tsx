import { notFound } from "next/navigation";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { AppLayout } from "@/components/layout/app-layout";
import { WeekTimesheetClient } from "@/components/timesheets/week-timesheet-client";
import { getTimesheetById, getWeekDays } from "@/lib/timesheets/week-detail";

type TimesheetDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TimesheetDetailPage({
  params,
}: TimesheetDetailPageProps) {
  const { id } = await params;
  const timesheet = getTimesheetById(id);

  if (!timesheet) {
    notFound();
  }

  return (
    <AppLayout>
      <WeekTimesheetClient days={getWeekDays(timesheet)} timesheet={timesheet} />
      <DashboardFooter />
    </AppLayout>
  );
}
