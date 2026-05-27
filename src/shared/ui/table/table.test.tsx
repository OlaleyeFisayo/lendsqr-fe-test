import type { DataTableColumn } from "./index";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "./index";

type Row = { name: string };

const columns: DataTableColumn<Row>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];

const filterColumns: DataTableColumn<Row>[] = [
  {
    accessorKey: "name",
    header: "Name",
    filterType: "text",
  },
];

function makeRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({ name: `User ${i + 1}` }));
}

describe("dataTable - rendering", () => {
  it("renders the provided column header", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(3)}
      />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders all rows within the current page", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(5)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 5")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(6); // 1 header + 5 data rows
  });

  it("renders a custom emptyMessage when data is empty", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="Nothing here"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders the default 'No records found' message when data is empty", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
      />,
    );
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("renders row actions when rowActions prop is provided", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(2)}
        rowActions={() => <button>action</button>}
      />,
    );
    expect(screen.getAllByRole("button", { name: "action" })).toHaveLength(2);
  });

  it("does not render action buttons when rowActions is not provided", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(2)}
      />,
    );
    expect(screen.queryByRole("button", { name: "action" })).not.toBeInTheDocument();
  });
});

describe("dataTable - pagination controls", () => {
  it("previous page button is disabled on the first page", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(5)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByRole("button", { name: "tabler:chevron-left" })).toBeDisabled();
  });

  it("next page button is disabled when there is only one page", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(5)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByRole("button", { name: "tabler:chevron-right" })).toBeDisabled();
  });

  it("next page button is enabled when there are multiple pages", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(25)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByRole("button", { name: "tabler:chevron-right" })).not.toBeDisabled();
  });

  it("clicking next page advances to page 2", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={makeRows(25)}
        initialPageSize={10}
      />,
    );
    await user.click(screen.getByRole("button", { name: "tabler:chevron-right" }));
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("data-table-page--active");
  });

  it("shows all 7 page buttons when pageCount equals 7", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(70)}
        initialPageSize={10}
      />,
    );
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByRole("button", { name: String(i) })).toBeInTheDocument();
    }
  });

  it("shows only 3 page buttons when pageCount equals 3", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(30)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument();
  });

  it("shows a gap indicator when there are more than 7 pages", () => {
    render(
      <DataTable
        columns={columns}
        data={makeRows(100)}
        initialPageSize={10}
      />,
    );
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});

describe("dataTable - filtering", () => {
  it("applying a text filter shows only matching rows", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={filterColumns}
        data={[{ name: "Alice" }, { name: "Bob" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /open table filters/i }));
    const input = await screen.findByPlaceholderText("Name");
    await user.type(input, "Alice");
    await user.click(screen.getByRole("button", { name: "Filter" }));

    await waitFor(() => {
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("resetting filters after applying restores all rows", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={filterColumns}
        data={[{ name: "Alice" }, { name: "Bob" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /open table filters/i }));
    const input = await screen.findByPlaceholderText("Name");
    await user.type(input, "Alice");
    await user.click(screen.getByRole("button", { name: "Filter" }));

    await waitFor(() => expect(screen.queryByText("Bob")).not.toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /open table filters/i }));
    await user.click(await screen.findByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });
});
