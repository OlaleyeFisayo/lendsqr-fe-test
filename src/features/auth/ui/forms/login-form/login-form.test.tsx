import {
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { renderWithRouter } from "@/test/render-with-router";
import LoginForm from "./index";

beforeEach(() => {
  vi.clearAllMocks();
});

function renderLoginForm() {
  return renderWithRouter(<LoginForm />, {
    path: "/",
    initialEntries: ["/"],
    extraRoutes: [{
      path: "/users",
      element: <div>Users page</div>,
    }],
  });
}

describe("loginForm - rendering", () => {
  it("renders an email input", () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("renders a password input", () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders the Log in button", () => {
    renderLoginForm();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("renders Forgot Password? text", () => {
    renderLoginForm();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("does not show validation errors on initial render", () => {
    renderLoginForm();
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
  });
});

describe("loginForm - validation (negative scenarios)", () => {
  it("shows 'Email is required' when submitted with empty email", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("shows 'Password is required' when submitted with empty password", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("shows 'Enter a valid email' for an invalid email format", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByPlaceholderText("Email"), "notanemail");
    await user.type(screen.getByPlaceholderText("Password"), "pass");
    await user.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
  });

  it("does not call toast.success when validation fails", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.click(screen.getByRole("button", { name: /log in/i }));
    await screen.findByText("Email is required");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("does not navigate to /users when validation fails", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.click(screen.getByRole("button", { name: /log in/i }));
    await screen.findByText("Email is required");
    expect(screen.queryByText("Users page")).not.toBeInTheDocument();
  });
});

describe("loginForm - successful login (positive scenarios)", () => {
  it("calls toast.success with 'Login successful' on valid submission", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Login successful");
    });
  });

  it("navigates to /users after successful login", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText("Users page")).toBeInTheDocument();
  });
});
