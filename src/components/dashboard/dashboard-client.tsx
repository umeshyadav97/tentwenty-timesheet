"use client";

import { FilterSelect } from "@/components/dashboard/filter-select";
import { Pagination } from "@/components/dashboard/pagination";
import { TimesheetTable } from "@/components/timesheets/timesheet-table";
import { useTimesheets } from "@/hooks/use-timesheets";
import {
  dateRangeFilters,
  statusFilterOptions,
} from "@/lib/timesheets/filters";

export function DashboardClient() {
  const {
    dateRange,
    entries,
    error,
    filteredCount,
    isLoading,
    page,
    pageSize,
    setDateRange,
    setPage,
    setPageSize,
    setStatus,
    status,
    totalPages,
  } = useTimesheets();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h1 className="text-xl font-bold text-slate-950">Your Timesheets</h1>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <FilterSelect
          ariaLabel="Filter by date range"
          options={dateRangeFilters}
          value={dateRange}
          onChange={setDateRange}
        />
        <FilterSelect
          ariaLabel="Filter by status"
          options={statusFilterOptions}
          value={status}
          onChange={setStatus}
        />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="rounded-md border border-slate-200 p-8 text-sm text-slate-500">
            Loading timesheets...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && entries.length > 0 ? (
          <TimesheetTable entries={entries} />
        ) : null}

        {!isLoading && !error && entries.length === 0 ? (
          <div className="rounded-md border border-slate-200 p-8 text-sm text-slate-500">
            No timesheets match the selected filters.
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          totalItems={filteredCount}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
