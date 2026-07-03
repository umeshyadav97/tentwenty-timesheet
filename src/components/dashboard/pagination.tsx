import { ChevronLeft, ChevronRight } from "lucide-react";

const pageSizeOptions = [5, 10, 20];

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

function getVisiblePages(totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function Pagination({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  totalItems,
  totalPages,
}: PaginationProps) {
  const visiblePages = getVisiblePages(totalPages);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative w-fit">
        <span className="sr-only">Rows per page</span>
        <select
          className="h-8 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-600 outline-none transition hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
        <ChevronRight
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-3 rotate-90 -translate-y-1/2 text-slate-400"
        />
      </label>

      <div className="flex flex-col gap-3 sm:items-end">
        <p className="text-xs text-slate-500">{totalItems} results</p>
        <nav className="flex w-fit flex-wrap items-center overflow-hidden rounded-lg border border-slate-200 text-xs text-slate-600">
          <button
            type="button"
            className="flex h-8 cursor-pointer items-center gap-1 border-r border-slate-200 bg-white px-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
            disabled={!canGoPrevious}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft aria-hidden="true" className="size-3" />
            Previous
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              className={`h-8 min-w-8 cursor-pointer border-r border-slate-200 px-3 transition hover:bg-slate-50 ${
                page === currentPage ? "bg-slate-100 text-blue-600" : "bg-white"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="flex h-8 cursor-pointer items-center gap-1 bg-white px-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
            disabled={!canGoNext}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <ChevronRight aria-hidden="true" className="size-3" />
          </button>
        </nav>
      </div>
    </div>
  );
}
