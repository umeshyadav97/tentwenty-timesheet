import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth/session";
import { timesheetEntries } from "@/utils/timesheet.utils";

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ entries: timesheetEntries });
}
