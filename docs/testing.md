# Testing

This app uses Vitest with Testing Library for unit testing.

## Commands

Run all tests in watch mode:

```bash
pnpm test
```

Run all tests once and generate a coverage report:

```bash
pnpm test:coverage
```

Coverage output is written to the `coverage/` directory.

## Stack

| Tool | Purpose |
|---|---|
| Vitest | Test runner, configured inline in `vite.config.ts` |
| jsdom | DOM environment for React component rendering in Node |
| `@testing-library/react` | Component rendering and querying |
| `@testing-library/user-event` | Realistic pointer and keyboard interactions |
| `@testing-library/jest-dom` | Custom DOM matchers (`toBeInTheDocument`, etc.) |

## Infrastructure

### `src/test/setup.ts`

Runs before every test file. It registers jest-dom matchers and installs global mocks that every suite needs:

- **`sonner`** — `toast.success`, `toast.error`, `toast.info`, `toast.warning` are replaced with `vi.fn()` so tests can assert on calls without triggering UI side-effects.
- **`@iconify/react`** — `Icon` is replaced with a component that renders the icon name as a text node, allowing button and element lookups by icon name.
- **`ResizeObserver`** — Stubbed as a class with no-op `observe`, `unobserve`, and `disconnect` methods (required by TanStack Table).
- **`matchMedia`** — Stubbed to return a non-matching media query object (required by Radix UI).

### `src/test/__mocks__/svg-mock.ts`

All SVG imports are redirected to this file during test runs via a mode-gated regex alias in `vite.config.ts`. The file exports `"test-svg"` as a default string, preventing bundler errors from raw SVG syntax.

### `src/test/render-with-router.tsx`

A shared helper that wraps a component in a `createMemoryRouter` + `RouterProvider`. Use it whenever the component under test calls `useNavigate` or reads URL params.

```tsx
renderWithRouter(<MyComponent />, {
  path: "/some/:id",
  initialEntries: ["/some/42"],
  extraRoutes: [{ path: "/other", element: <div>Other</div> }],
});
```

## Test Files

### `src/features/dashboard/utils/users-data.test.ts`

Pure function tests. No React, no mocks.

**`getDashboardUserById`** (6 tests)
- Returns a defined value for a known valid id
- The returned user's `id` matches the queried id
- Returns `undefined` for a non-existent id
- Returns `undefined` when called with `undefined`
- Returns `undefined` for an empty string `""`
- Exact match only — querying `"1"` does not return the user with id `"10"`

**`userTableData`** (4 tests)
- Has the same length as `dashboardUsers`
- Each row contains exactly the 7 expected keys with no extra fields
- `id` values match `dashboardUsers` in order
- `status` field preserves the original value from the source data

**`organizations`** (3 tests)
- Contains no duplicate organization names
- Covers every organization name present in `dashboardUsers`
- Every element is a string

---

### `src/features/auth/ui/forms/login-form/login-form.test.tsx`

Rendered via `renderWithRouter` at `"/"`. A sentinel route at `"/users"` renders `<div>Users page</div>` to verify navigation.

**Rendering** (5 tests)
- Email input is present
- Password input is present
- "Log in" button is present
- "Forgot Password?" text is present
- No validation error messages on initial render

**Validation — negative scenarios** (5 tests)
- Shows "Email is required" when submitted with an empty email
- Shows "Password is required" when submitted with a valid email but empty password
- Shows "Enter a valid email" when submitted with a non-email string
- `toast.success` is not called when validation fails
- The `/users` sentinel page is not rendered when validation fails

**Successful login — positive scenarios** (2 tests)
- `toast.success("Login successful")` is called on a valid submission
- The app navigates to `/users` after a successful login

---

### `src/features/dashboard/ui/components/user-table/user-table.test.tsx`

The `../../../utils/users-data` module is mocked with three controlled rows:

| id | username | status |
|---|---|---|
| u1 | alice | Active |
| u2 | bob | Inactive |
| u3 | carol | Blacklisted |

Wrapped in `MemoryRouter` because the table renders `<Link>` elements.

**Column rendering** (6 tests)
- All 6 column headers are present (Organization, Username, Email, Phone Number, Date Joined, Status)
- Exactly 4 rows rendered (1 header + 3 data rows)
- Username cell content displays correctly
- Active status badge has the `user-table-status--active` CSS class
- Blacklisted status badge has the `user-table-status--blacklisted` CSS class
- One action trigger button rendered per data row (3 total)

**Dropdown menu** (2 tests)
- Clicking a row's action trigger opens a dropdown containing "View Details"
- The "View Details" item has `href="/users/u1"` for alice's row

**"Blacklist User" conditional rendering** (2 tests)
- "Blacklist User" is visible for alice (Active)
- "Blacklist User" is absent for carol (already Blacklisted)

**"Activate User" conditional rendering** (2 tests)
- "Activate User" is visible for bob (Inactive)
- "Activate User" is absent for alice (already Active)

**Status updates** (5 tests)
- Clicking "Activate User" for bob changes his status cell to "Active"
- After activating bob, reopening his dropdown no longer shows "Activate User"
- Clicking "Blacklist User" for alice opens the confirmation dialog
- Confirming the dialog changes alice's status cell to "Blacklisted"
- Cancelling the dialog leaves alice's status as "Active"

---

### `src/features/dashboard/ui/pages/user-detail/user-detail.test.tsx`

Uses `createMemoryRouter` with `path: "/users/:id"`. `getDashboardUserById` is mocked per `describe` block via `vi.mocked().mockReturnValue()`.

**User not found — negative scenarios** (3 tests)
- Renders a "User not found" heading for an unrecognised id
- "User Details" heading is absent
- "Back to Users" link is still present

**User found as Inactive** (5 tests)
- "User Details" heading is present
- "Back to Users" link is present
- The user's full name is visible on the page
- "Blacklist User" button is present
- "Activate User" button is present

**User found as Active** (2 tests)
- "Blacklist User" button is present
- "Activate User" button is absent

**User found as Blacklisted** (2 tests)
- "Blacklist User" button is absent
- "Activate User" button is present

**Blacklist dialog interaction** (2 tests)
- Clicking "Blacklist User" opens the confirmation dialog
- Clicking "Cancel" closes the dialog

---

### `src/shared/ui/table/table.test.tsx`

Uses a minimal fixture: one `"Name"` column and a `makeRows(count)` helper that generates `{ name: "User N" }` objects. No router wrapping needed.

**Rendering** (6 tests)
- The provided column header is rendered
- All rows within the current page are rendered (5 rows, `pageSize=10`)
- A custom `emptyMessage` prop is shown when data is empty
- The default "No records found" message is shown when data is empty and no `emptyMessage` is provided
- Row action buttons are rendered when `rowActions` prop is provided
- No action buttons are rendered when `rowActions` is not provided

**Pagination controls** (7 tests)
- Previous page button is disabled on the first page
- Next page button is disabled when there is only one page (5 rows, `pageSize=10`)
- Next page button is enabled when there are multiple pages (25 rows, `pageSize=10`)
- Clicking next page advances to page 2 (page 2 button gains active class)
- All 7 page buttons shown when `pageCount === 7` (70 rows, `pageSize=10`)
- Only 3 page buttons shown when `pageCount === 3` (30 rows, `pageSize=10`)
- A `...` gap indicator appears when there are more than 7 pages (100 rows, `pageSize=10`)

**Filtering** (2 tests)
- Applying a text filter hides non-matching rows
- Resetting the filter after applying it restores all rows
