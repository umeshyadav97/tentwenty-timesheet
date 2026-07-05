"use client";

import { FilterSelect } from "@/components/dashboard/filter-select";
import { Pagination } from "@/components/dashboard/pagination";
import { TimesheetTable } from "@/components/timesheets/timesheet-table";
import { OverlayLoader } from "@/components/ui/overlay-loader";
import { Spinner } from "@/components/ui/spinner";
import {
  dateRangeFilters,
  statusFilterOptions,
} from "@/constants/timesheet.constants";
import { useTimesheets } from "@/hooks/use-timesheets";

export function DashboardClient() {
  const {
    dateRange,
    entries,
    error,
    filteredCount,
    isRefreshing,
    isLoading,
    page,
    pageSize,
    setDateRange,
    setPage,
    setPageSize,
    setStatus,
    setSort,
    sortDirection,
    sortKey,
    status,
    totalPages,
  } = useTimesheets();

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
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

      <div className="relative mt-5">
        {isLoading ? (
          <div className="flex items-center gap-2 rounded-md border border-slate-200 p-8 text-sm text-slate-500">
            <Spinner className="size-4" />
            <span>Loading timesheets...</span>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && entries.length > 0 ? (
          <div className="relative">
            <TimesheetTable
              entries={entries}
              sortDirection={sortDirection}
              sortKey={sortKey}
              onSort={setSort}
            />

            {isRefreshing ? (
              <OverlayLoader label="Updating results..." />
            ) : null}
          </div>
        ) : null}

        {!isLoading && !error && entries.length === 0 ? (
          <div className="relative rounded-md border border-slate-200 p-8 text-sm text-slate-500">
            <span>No timesheets match the selected filters.</span>
            {isRefreshing ? (
              <OverlayLoader label="Updating results..." />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <Pagination
          currentPage={page}
          isLoading={isRefreshing}
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
