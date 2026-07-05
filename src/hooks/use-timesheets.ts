"use client";

import { useEffect, useMemo, useState } from "react";
import {
  allDateRangeValue,
  allStatusValue,
  filterTimesheets,
} from "@/lib/timesheets/filters";
import { timesheetStatusOrder } from "@/lib/timesheets/status";
import { waitForUiTransition } from "@/lib/ui/delay";
import type {
  TimesheetEntry,
  TimesheetSortDirection,
  TimesheetSortKey,
} from "@/types/timesheet";

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
  const [sortDirection, setSortDirection] =
    useState<TimesheetSortDirection>("asc");
  const [sortKey, setSortKey] = useState<TimesheetSortKey>("weekNumber");
  const [status, setStatus] = useState(allStatusValue);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  const sortedEntries = useMemo(() => {
    return [...filteredEntries].sort((firstEntry, secondEntry) => {
      const directionMultiplier = sortDirection === "asc" ? 1 : -1;

      if (sortKey === "startDate") {
        return (
          (new Date(firstEntry.startDate).getTime() -
            new Date(secondEntry.startDate).getTime()) *
          directionMultiplier
        );
      }

      if (sortKey === "status") {
        return (
          (timesheetStatusOrder[firstEntry.status] -
            timesheetStatusOrder[secondEntry.status]) *
          directionMultiplier
        );
      }

      return (
        (firstEntry.weekNumber - secondEntry.weekNumber) * directionMultiplier
      );
    });
  }, [filteredEntries, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedEntries.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedEntries = sortedEntries.slice(startIndex, startIndex + pageSize);

  async function runDelayedTransition(update: () => void) {
    setIsRefreshing(true);
    await waitForUiTransition();
    update();
    setIsRefreshing(false);
  }

  function updateDateRange(value: string) {
    runDelayedTransition(() => {
      setDateRange(value);
      setPage(1);
    });
  }

  function updatePage(nextPage: number) {
    if (nextPage === safePage) {
      return;
    }

    runDelayedTransition(() => {
      setPage(nextPage);
    });
  }

  function updatePageSize(value: number) {
    runDelayedTransition(() => {
      setPageSize(value);
      setPage(1);
    });
  }

  function updateStatus(value: string) {
    runDelayedTransition(() => {
      setStatus(value);
      setPage(1);
    });
  }

  function updateSort(nextSortKey: TimesheetSortKey) {
    runDelayedTransition(() => {
      setPage(1);

      if (nextSortKey === sortKey) {
        setSortDirection((currentDirection) =>
          currentDirection === "asc" ? "desc" : "asc",
        );
        return;
      }

      setSortKey(nextSortKey);
      setSortDirection("asc");
    });
  }

  return {
    dateRange,
    entries: paginatedEntries,
    error: state.error,
    filteredCount: filteredEntries.length,
    isRefreshing,
    isLoading: state.isLoading,
    page: safePage,
    pageSize,
    setDateRange: updateDateRange,
    setPage: updatePage,
    setPageSize: updatePageSize,
    setStatus: updateStatus,
    setSort: updateSort,
    sortDirection,
    sortKey,
    status,
    totalPages,
  };
}
