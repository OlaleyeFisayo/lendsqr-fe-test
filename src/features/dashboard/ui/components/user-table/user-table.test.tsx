import type { DashboardUser } from "../../../utils/users-data";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { useUsersStore } from "../../../utils/users-store";
import UserTable from "./index";

function createMockUser(overrides: Partial<DashboardUser> & Pick<DashboardUser, "id" | "username" | "status">): DashboardUser {
  return {
    organization: "OrgA",
    email: `${overrides.username}@test.com`,
    phoneNumber: "111",
    dateJoined: "2024-01-01",
    userCode: "TST001",
    tier: 1,
    accountBalance: "₦0.00",
    accountNumber: "0000000000",
    bankName: "Test Bank",
    fullName: overrides.username ?? "Test User",
    personalInformation: {
      fullName: overrides.username ?? "Test User",
      phoneNumber: "111",
      emailAddress: `${overrides.username}@test.com`,
      bvn: "00000000000",
      gender: "Female",
      maritalStatus: "Single",
      children: "None",
      typeOfResidence: "Apartment",
    },
    educationAndEmployment: {
      levelOfEducation: "B.Sc",
      employmentStatus: "Employed",
      sectorOfEmployment: "Tech",
      durationOfEmployment: "1 year",
      officeEmail: `${overrides.username}@company.com`,
      monthlyIncome: "₦50,000.00",
      loanRepayment: "₦5,000.00",
    },
    socials: {
      twitter: "",
      facebook: "",
      instagram: "",
    },
    guarantor: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      relationship: "",
    },
    ...overrides,
  };
}

const alice = createMockUser({
  id: "u1",
  username: "alice",
  status: "Active",
  organization: "OrgA",
});
const bob = createMockUser({
  id: "u2",
  username: "bob",
  status: "Inactive",
  organization: "OrgB",
  email: "bob@test.com",
  phoneNumber: "222",
});
const carol = createMockUser({
  id: "u3",
  username: "carol",
  status: "Blacklisted",
  organization: "OrgA",
  email: "carol@test.com",
  phoneNumber: "333",
});

beforeEach(() => {
  useUsersStore.setState({ users: [alice, bob, carol] });
});

function renderUserTable() {
  return render(
    <MemoryRouter>
      <UserTable />
    </MemoryRouter>,
  );
}

describe("userTable - column rendering", () => {
  it("renders all 6 column headers", () => {
    renderUserTable();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Date Joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders one row per user (3 data rows + 1 header row)", () => {
    renderUserTable();
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });

  it("renders the username cell content correctly", () => {
    renderUserTable();
    expect(screen.getByText("alice")).toBeInTheDocument();
  });

  it("renders active status badge with correct CSS class", () => {
    renderUserTable();
    expect(screen.getByText("Active")).toHaveClass("user-table-status--active");
  });

  it("renders blacklisted status badge with correct CSS class", () => {
    renderUserTable();
    expect(screen.getByText("Blacklisted")).toHaveClass("user-table-status--blacklisted");
  });

  it("renders one action trigger button per row", () => {
    renderUserTable();
    expect(screen.getAllByRole("button", { name: /open user actions/i })).toHaveLength(3);
  });
});

describe("userTable - dropdown menu", () => {
  it("clicking the action trigger opens a dropdown with View Details", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [firstTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(firstTrigger);
    expect(await screen.findByText("View Details")).toBeInTheDocument();
  });

  it("view Details link points to the correct user route for alice", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [firstTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(firstTrigger);
    const link = await screen.findByRole("menuitem", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/users/u1");
  });
});

describe("userTable - Blacklist User conditional rendering", () => {
  it("shows Blacklist User for a non-blacklisted user (alice - Active)", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [aliceTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(aliceTrigger);
    expect(await screen.findByText("Blacklist User")).toBeInTheDocument();
  });

  it("does not show Blacklist User for an already-blacklisted user (carol)", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const triggers = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(triggers[2]);
    await screen.findByText("View Details");
    expect(screen.queryByText("Blacklist User")).not.toBeInTheDocument();
  });
});

describe("userTable - Activate User conditional rendering", () => {
  it("shows Activate User for a non-active user (bob - Inactive)", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const triggers = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(triggers[1]);
    expect(await screen.findByText("Activate User")).toBeInTheDocument();
  });

  it("does not show Activate User for an already-active user (alice)", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [aliceTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(aliceTrigger);
    await screen.findByText("View Details");
    expect(screen.queryByText("Activate User")).not.toBeInTheDocument();
  });
});

describe("userTable - status updates", () => {
  it("clicking Activate User changes bob's status to Active", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const triggers = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(triggers[1]);
    await user.click(await screen.findByText("Activate User"));
    await waitFor(() => {
      expect(screen.getAllByText("Active")).toHaveLength(2);
    });
  });

  it("after activating bob, Activate User is no longer in his dropdown", async () => {
    const user = userEvent.setup();
    renderUserTable();
    let triggers = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(triggers[1]);
    await user.click(await screen.findByText("Activate User"));
    await waitFor(() => {
      expect(screen.getAllByText("Active")).toHaveLength(2);
    });
    triggers = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(triggers[1]);
    await screen.findByText("View Details");
    expect(screen.queryByText("Activate User")).not.toBeInTheDocument();
  });

  it("clicking Blacklist User opens the confirmation dialog", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [aliceTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(aliceTrigger);
    await user.click(await screen.findByText("Blacklist User"));
    expect(await screen.findByText("Blacklist user?")).toBeInTheDocument();
  });

  it("confirming the blacklist dialog changes alice's status to Blacklisted", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [aliceTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(aliceTrigger);
    await user.click(await screen.findByText("Blacklist User"));
    await screen.findByText("Blacklist user?");
    await user.click(screen.getByRole("button", { name: /^blacklist$/i }));
    await waitFor(() => {
      expect(screen.getAllByText("Blacklisted")).toHaveLength(2);
    });
  });

  it("cancelling the blacklist dialog keeps alice's status as Active", async () => {
    const user = userEvent.setup();
    renderUserTable();
    const [aliceTrigger] = screen.getAllByRole("button", { name: /open user actions/i });
    await user.click(aliceTrigger);
    await user.click(await screen.findByText("Blacklist User"));
    await screen.findByText("Blacklist user?");
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getAllByText("Blacklisted")).toHaveLength(1);
  });
});
