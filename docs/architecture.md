# Architecture

This document explains the high-level folder structure and data flow of the app.

## Folder Structure

```
src/
├── features/           # Business features, each self-contained
│   ├── auth/           # Login feature
│   └── dashboard/      # Users list and user detail feature
├── shared/             # Reusable code with no feature dependency
│   ├── lib/            # App-wide utilities (router)
│   ├── ui/             # Generic UI components (Button, Select, Table, etc.)
│   └── main.scss       # Global styles and CSS custom properties
├── test/               # Test infrastructure (setup, mocks, helpers)
└── main.tsx            # App entry point
```

Each feature follows a consistent internal layout:

```
features/<name>/
├── assets/     # SVG icons and images used only by this feature
├── ui/
│   ├── components/   # Smaller, reusable pieces within the feature
│   ├── layouts/      # Page-level layout wrappers
│   └── pages/        # Route-level components
└── utils/      # Data, store, and pure helper functions
```

## Features

### `auth`

Handles the login page. Contains a single form (`login-form`) that validates credentials and navigates to `/users` on success. No persistent state — no store.

### `dashboard`

Handles everything after login. Broken into:

| Layer | What lives here |
|---|---|
| `utils/users.json` | 500 mock user records (source of truth for all user data) |
| `utils/users-data.ts` | Typed data models, derived exports (`dashboardUsers`, `userTableData`, `organizations`), and the `getUserStatusPermissions` utility |
| `utils/users-store.ts` | Zustand store holding the live users list; `updateUserStatus` is the only mutation |
| `ui/layouts/main-layout` | Header + sidebar shell shared by all dashboard pages |
| `ui/pages/users` | The `/users` route — renders stat cards and the users table |
| `ui/pages/user-detail` | The `/users/:id` route — renders the full user profile |
| `ui/components/user-stats` | The four summary stat cards at the top of the dashboard |
| `ui/components/user-table` | Configures and renders the generic `DataTable` with user-specific columns and row actions |
| `ui/components/user-detail-card` | The user info card at the top of the detail page (avatar, name, tier, balance) |
| `ui/components/user-detail-section` | A labelled group of fields used to build out the personal info, employment, socials, and guarantor sections |
| `ui/components/blacklist-user-dialog` | Confirmation dialog shown before blacklisting a user (used in both the table and the detail page) |

## Shared UI

`src/shared/ui/` contains generic components with no feature knowledge:

| Component | Purpose |
|---|---|
| `Button` | Styled button with `default` and `outline` variants |
| `Select` | Radix UI Select wrapper with standard and `pagination` variants |
| `Input` | Labelled text/email/password input with error state |
| `Table` (`DataTable`) | Generic headless table built on TanStack Table — handles pagination, column filters, and custom cell renderers |
| `Tab` | Radix UI Tabs wrapper used on the user detail page |
| `AlertDialog` | Radix UI AlertDialog wrapper — the base for `BlacklistUserDialog` |
| `Logo` | SVG logo component |

## Data Flow

```
users.json
    └─▶ users-data.ts (dashboardUsers, userTableData, organizations)
              └─▶ users-store.ts (Zustand, persisted to localStorage)
                        └─▶ ui/pages/users        (reads users list)
                        └─▶ ui/pages/user-detail  (reads single user by id)
                        └─▶ ui/components/user-table (reads + mutates status)
```

State mutations flow in a single direction: components call `updateUserStatus` on the store, the store updates the users array, and all subscribed components re-render with the new data. Because the store uses Zustand's `persist` middleware with the key `"lendsqr-users-store"`, status changes survive page reloads via `localStorage`.

## Routing

Routes are defined in `src/shared/lib/router.tsx`:

| Path | Component |
|---|---|
| `/` | Login page |
| `/users` | Dashboard — users list |
| `/users/:id` | Dashboard — user detail |

The dashboard routes share `MainLayout` (header + sidebar) via a layout route wrapper.
