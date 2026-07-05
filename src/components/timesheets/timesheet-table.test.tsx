import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimesheetTable } from "@/components/timesheets/timesheet-table";
import type { TimesheetEntry } from "@/types/timesheet";

const entries: TimesheetEntry[] = [
  {
    endDate: "2026-07-03",
    hours: 40,
    id: "week-1",
    dateRange: "29 June - 3 July, 2026",
    startDate: "2026-06-29",
    status: "completed",
    weekNumber: 1,
  },
  {
    endDate: "2026-07-17",
    hours: 32,
    id: "week-3",
    dateRange: "13 - 17 July, 2026",
    startDate: "2026-07-13",
    status: "incomplete",
    weekNumber: 3,
  },
];

describe("TimesheetTable", () => {
  it("renders rows with status and action labels", () => {
    render(
      <TimesheetTable
        entries={entries}
        sortDirection="asc"
        sortKey="weekNumber"
        onSort={vi.fn()}
      />,
    );

    expect(screen.getByText("29 June - 3 July, 2026")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute(
      "href",
      "/dashboard/timesheets/week-1",
    );
    expect(screen.getByRole("link", { name: "Update" })).toHaveAttribute(
      "href",
      "/dashboard/timesheets/week-3",
    );
  });

  it("calls sorting when a sortable header is clicked", async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();

    render(
      <TimesheetTable
        entries={entries}
        sortDirection="asc"
        sortKey="weekNumber"
        onSort={handleSort}
      />,
    );

    const table = screen.getByRole("table");
    await user.click(within(table).getByRole("button", { name: /Sort by Date/i }));

    expect(handleSort).toHaveBeenCalledWith("startDate");
  });
});
