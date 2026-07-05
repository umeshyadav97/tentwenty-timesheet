import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { AppLayout } from "@/components/layout/app-layout";

export default async function DashboardPage() {
  return (
    <AppLayout>
      <DashboardClient />
      <DashboardFooter />
    </AppLayout>
  );
}
