import type {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import * as Popover from "@radix-ui/react-popover";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  useMemo,
  useState,
} from "react";
import filterIcon from "@/shared/assets/filter.svg";
import Button from "@/shared/ui/button";
import "./table.scss";

type FilterOption = {
  label: string;
  value: string;
};

type FilterType = "date" | "select" | "text";

export type DataTableColumn<TData extends Record<string, unknown>> = {
  accessorKey: Extract<keyof TData, string>;
  header: string;
  cell?: (value: unknown, row: TData) => ReactNode;
  enableFilter?: boolean;
  filterOptions?: FilterOption[];
  filterType?: FilterType;
};

type DataTableProps<TData extends Record<string, unknown>> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  emptyMessage?: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  rowActions?: (row: TData) => ReactNode;
};

function getPageNumbers(currentPage: number, pageCount: number) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index);
  }

  const pages = new Set([0, currentPage - 1, currentPage, currentPage + 1, pageCount - 2, pageCount - 1]);

  return Array.from(pages)
    .filter(page => page >= 0 && page < pageCount)
    .sort((firstPage, secondPage) => firstPage - secondPage);
}

export default function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No records found",
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  rowActions,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    const mappedColumns = columns.map<ColumnDef<TData>>(column => ({
      accessorKey: column.accessorKey,
      cell: (info: CellContext<TData, unknown>): ReactNode => {
        const value = info.getValue();
        return column.cell !== undefined ? column.cell(value, info.row.original) : String(value ?? "");
      },
      enableColumnFilter: column.enableFilter !== false,
      filterFn: "includesString",
      header: column.header,
    }));

    if (rowActions === undefined) {
      return mappedColumns;
    }

    return [
      ...mappedColumns,
      {
        cell: (info: CellContext<TData, unknown>): ReactNode => rowActions(info.row.original),
        enableColumnFilter: false,
        id: "actions",
      },
    ];
  }, [columns, rowActions]);

  const table = useReactTable({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  const filterableColumns = columns.filter(column => column.enableFilter !== false);
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pageNumbers = getPageNumbers(currentPage, pageCount);

  function updateFilterValue(accessorKey: string, value: string) {
    setFilterValues(currentValues => ({
      ...currentValues,
      [accessorKey]: value,
    }));
  }

  function applyFilters() {
    setColumnFilters(
      filterableColumns
        .map(column => ({
          id: column.accessorKey,
          value: filterValues[column.accessorKey]?.trim() ?? "",
        }))
        .filter(filter => filter.value !== ""),
    );
    table.setPageIndex(0);
  }

  function resetFilters() {
    setFilterValues({});
    setColumnFilters([]);
    table.setPageIndex(0);
  }

  function renderFilterField(column: DataTableColumn<TData>) {
    const value = filterValues[column.accessorKey] ?? "";
    const inputId = `filter-${column.accessorKey}`;

    if (column.filterType === "select") {
      return (
        <label
          className="data-table-filter-field"
          htmlFor={inputId}
        >
          <span>{column.header}</span>
          <div className="data-table-filter-control data-table-filter-control--select">
            <select
              id={inputId}
              value={value}
              onChange={event => updateFilterValue(column.accessorKey, event.target.value)}
            >
              <option value="">Select</option>
              {column.filterOptions?.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              icon="tabler:chevron-down"
              aria-hidden="true"
            />
          </div>
        </label>
      );
    }

    return (
      <label
        className="data-table-filter-field"
        htmlFor={inputId}
      >
        <span>{column.header}</span>
        <div className="data-table-filter-control">
          <input
            id={inputId}
            type={column.filterType === "date" ? "date" : "text"}
            value={value}
            placeholder={column.header}
            onChange={event => updateFilterValue(column.accessorKey, event.target.value)}
          />
          {column.filterType === "date" && (
            <Icon
              icon="tabler:calendar-month"
              aria-hidden="true"
            />
          )}
        </div>
      </label>
    );
  }

  return (
    <div className="data-table">
      <div className="data-table-card">
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
                          <div className="data-table-header-cell">
                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            {header.column.getCanFilter() && (
                              <Popover.Root>
                                <Popover.Trigger
                                  className="data-table-filter-trigger"
                                  type="button"
                                >
                                  <img
                                    src={filterIcon}
                                    alt=""
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">Open table filters</span>
                                </Popover.Trigger>
                                <Popover.Portal>
                                  <Popover.Content
                                    className="data-table-filter-popover"
                                    align="start"
                                    collisionPadding={16}
                                    side="bottom"
                                    sideOffset={12}
                                    sticky="always"
                                  >
                                    <form
                                      onSubmit={(event) => {
                                        event.preventDefault();
                                        applyFilters();
                                      }}
                                    >
                                      {filterableColumns.map(column => (
                                        <div key={column.accessorKey}>
                                          {renderFilterField(column)}
                                        </div>
                                      ))}
                                      <div className="data-table-filter-actions">
                                        <Button
                                          variant="outline"
                                          onClick={resetFilters}
                                        >
                                          Reset
                                        </Button>
                                        <Button type="submit">
                                          Filter
                                        </Button>
                                      </div>
                                    </form>
                                  </Popover.Content>
                                </Popover.Portal>
                              </Popover.Root>
                            )}
                          </div>
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0
              ? table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              : (
                  <tr>
                    <td
                      colSpan={table.getVisibleFlatColumns().length}
                      className="data-table-empty"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
      <div className="data-table-pagination">
        <div className="data-table-page-size">
          <span>Showing</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={event => table.setPageSize(Number(event.target.value))}
          >
            {pageSizeOptions.map(pageSize => (
              <option
                key={pageSize}
                value={pageSize}
              >
                {pageSize}
              </option>
            ))}
          </select>
          <span>
            out of
            {" "}
            {table.getFilteredRowModel().rows.length}
          </span>
        </div>
        <nav
          className="data-table-page-nav"
          aria-label="Table pagination"
        >
          <button
            className="data-table-page-control"
            type="button"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <Icon
              icon="tabler:chevron-left"
              aria-hidden="true"
            />
          </button>
          {pageNumbers.map((page, index) => {
            const previousPage = pageNumbers[index - 1];
            const showGap = previousPage !== undefined && page - previousPage > 1;

            return (
              <span
                className="data-table-page-group"
                key={page}
              >
                {showGap && <span className="data-table-page-gap">...</span>}
                <button
                  type="button"
                  className={page === currentPage ? "data-table-page--active" : undefined}
                  onClick={() => table.setPageIndex(page)}
                >
                  {page + 1}
                </button>
              </span>
            );
          })}
          <button
            className="data-table-page-control"
            type="button"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <Icon
              icon="tabler:chevron-right"
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>
    </div>
  );
}
