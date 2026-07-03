"use client";

import { useEffect, useMemo, useState } from "react";
import {
  allDateRangeValue,
  allStatusValue,
  filterTimesheets,
} from "@/lib/timesheets/filters";
import type { TimesheetEntry } from "@/types/timesheet";

const defaultPageSize = 5;

type TimesheetsState = {
  data: TimesheetEntry[];
  error: string | null;
  isLoading: boolean;
};

export function useTimesheets() {
  const [state, setState] = useState<TimesheetsState>({
    data: [],
    error: null,
    isLoading: true,
  });
  const [dateRange, setDateRange] = useState(allDateRangeValue);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [status, setStatus] = useState(allStatusValue);

  useEffect(() => {
    let isMounted = true;

    async function loadTimesheets() {
      try {
        const response = await fetch("/api/timesheets");

        if (!response.ok) {
          throw new Error("Unable to load timesheets");
        }

        const payload = (await response.json()) as {
          entries: TimesheetEntry[];
        };

        if (isMounted) {
          setState({
            data: payload.entries,
            error: null,
            isLoading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: [],
            error:
              error instanceof Error
                ? error.message
                : "Something went wrong",
            isLoading: false,
          });
        }
      }
    }

    loadTimesheets();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEntries = useMemo(
    () => filterTimesheets(state.data, dateRange, status),
    [dateRange, state.data, status],
  );

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + pageSize);

  function updateDateRange(value: string) {
    setDateRange(value);
    setPage(1);
  }

  function updatePageSize(value: number) {
    setPageSize(value);
    setPage(1);
  }

  function updateStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  return {
    dateRange,
    entries: paginatedEntries,
    error: state.error,
    filteredCount: filteredEntries.length,
    isLoading: state.isLoading,
    page: safePage,
    pageSize,
    setDateRange: updateDateRange,
    setPage,
    setPageSize: updatePageSize,
    setStatus: updateStatus,
    status,
    totalPages,
  };
}
