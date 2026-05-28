import type { DashboardUser } from "../../../utils/users-data";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router";
import { useUsersStore } from "../../../utils/users-store";
import UserDetail from "./index";

const mockUser: DashboardUser = {
  id: "u1",
  organization: "TestOrg",
  username: "alice",
  fullName: "Alice Smith",
  email: "alice@test.com",
  phoneNumber: "1234567890",
  dateJoined: "Jan 1, 2024",
  status: "Inactive",
  userCode: "TST001",
  tier: 1,
  accountBalance: "₦1,000.00",
  accountNumber: "1234567890",
  bankName: "Test Bank",
  personalInformation: {
    fullName: "Alice Smith",
    phoneNumber: "1234567890",
    emailAddress: "alice@test.com",
    bvn: "12345678901",
    gender: "Female",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Apartment",
  },
  educationAndEmployment: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "Tech",
    durationOfEmployment: "2 years",
    officeEmail: "alice@company.com",
    monthlyIncome: "₦100,000.00",
    loanRepayment: "₦10,000.00",
  },
  socials: {
    twitter: "@alice",
    facebook: "Alice Smith",
    instagram: "@alice",
  },
  guarantor: {
    fullName: "Bob Smith",
    phoneNumber: "0987654321",
    emailAddress: "bob@test.com",
    relationship: "Brother",
  },
};

function renderUserDetail(id: string) {
  const router = createMemoryRouter(
    [{
      path: "/users/:id",
      element: <UserDetail />,
    }],
    { initialEntries: [`/users/${id}`] },
  );
  return render(<RouterProvider router={router} />);
}

describe("userDetail - user not found (negative scenarios)", () => {
  beforeEach(() => {
    useUsersStore.setState({ users: [] });
  });

  it("renders 'User not found' heading for an unrecognised id", () => {
    renderUserDetail("invalid-999");
    expect(screen.getByRole("heading", { name: /user not found/i })).toBeInTheDocument();
  });

  it("does not render 'User Details' heading when user is not found", () => {
    renderUserDetail("invalid-999");
    expect(screen.queryByRole("heading", { name: /user details/i })).not.toBeInTheDocument();
  });

  it("still renders 'Back to Users' link when user is not found", () => {
    renderUserDetail("invalid-999");
    expect(screen.getByText(/back to users/i)).toBeInTheDocument();
  });
});

describe("userDetail - user found as Inactive (positive scenarios)", () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [{
        ...mockUser,
        status: "Inactive",
      }],
    });
  });

  it("renders 'User Details' heading", () => {
    renderUserDetail("u1");
    expect(screen.getByRole("heading", { name: /user details/i })).toBeInTheDocument();
  });

  it("renders 'Back to Users' link", () => {
    renderUserDetail("u1");
    expect(screen.getByText(/back to users/i)).toBeInTheDocument();
  });

  it("renders the user full name on the page", () => {
    renderUserDetail("u1");
    expect(screen.getAllByText("Alice Smith").length).toBeGreaterThan(0);
  });

  it("shows 'Blacklist User' button for an Inactive user", () => {
    renderUserDetail("u1");
    expect(screen.getByRole("button", { name: /blacklist user/i })).toBeInTheDocument();
  });

  it("shows 'Activate User' button for an Inactive user", () => {
    renderUserDetail("u1");
    expect(screen.getByRole("button", { name: /activate user/i })).toBeInTheDocument();
  });
});

describe("userDetail - user found as Active", () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [{
        ...mockUser,
        status: "Active",
      }],
    });
  });

  it("shows 'Blacklist User' button for an Active user", () => {
    renderUserDetail("u1");
    expect(screen.getByRole("button", { name: /blacklist user/i })).toBeInTheDocument();
  });

  it("does not show 'Activate User' button for an Active user", () => {
    renderUserDetail("u1");
    expect(screen.queryByRole("button", { name: /activate user/i })).not.toBeInTheDocument();
  });
});

describe("userDetail - user found as Blacklisted", () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [{
        ...mockUser,
        status: "Blacklisted",
      }],
    });
  });

  it("does not show 'Blacklist User' button for a Blacklisted user", () => {
    renderUserDetail("u1");
    expect(screen.queryByRole("button", { name: /blacklist user/i })).not.toBeInTheDocument();
  });

  it("shows 'Activate User' button for a Blacklisted user", () => {
    renderUserDetail("u1");
    expect(screen.getByRole("button", { name: /activate user/i })).toBeInTheDocument();
  });
});

describe("userDetail - Blacklist dialog interaction", () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [{
        ...mockUser,
        status: "Inactive",
      }],
    });
  });

  it("clicking 'Blacklist User' opens the confirmation dialog", async () => {
    const user = userEvent.setup();
    renderUserDetail("u1");
    await user.click(screen.getByRole("button", { name: /blacklist user/i }));
    expect(await screen.findByText("Blacklist user?")).toBeInTheDocument();
  });

  it("clicking Cancel closes the dialog", async () => {
    const user = userEvent.setup();
    renderUserDetail("u1");
    await user.click(screen.getByRole("button", { name: /blacklist user/i }));
    await screen.findByText("Blacklist user?");
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    await waitFor(() => {
      expect(screen.queryByText("Blacklist user?")).not.toBeInTheDocument();
    });
  });
});
