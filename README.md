# Lendsqr FE Test

A React + TypeScript frontend assessment for Lendsqr. The app implements three pages — Login, Users Dashboard, and User Detail — against a provided Figma design, with 500 mock users, state persistence, and a unit test suite.

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Login | Email/password form with client-side validation |
| `/users` | Users Dashboard | Stat cards + a paginated, filterable table of 500 users |
| `/users/:id` | User Detail | Full user profile with activate/blacklist actions |

## Assessment Requirements

| Requirement | Status |
|---|---|
| Login page with validation | Done |
| Users list page (500 mock records) | Done |
| User detail page | Done |
| State persisted across page reloads | Done — Zustand `persist` to `localStorage` |
| Activate / Blacklist user actions | Done — updates reflected in the table and detail page |
| Mobile responsive | Done |
| Unit tests | Done — 69 tests across 5 suites |
| TypeScript | Done — strict mode, pre-commit `tsc --noEmit` hook |
| SCSS (no CSS framework) | Done |

## Tech Stack

| Technology | Why |
|---|---|
| React 19 + TypeScript | Type-safe component development; the assessment spec requires TypeScript |
| Vite | Fast dev server and build tooling for modern React apps |
| SCSS | The Figma designs are custom — plain SCSS gives full control over every style without fighting a utility framework's conventions |
| Zustand | Less boilerplate than Redux (no actions/reducers/providers setup). Unlike React Context, Zustand uses selectors so components only re-render when the slice of state they care about changes. The `persist` middleware adds localStorage persistence for free |
| TanStack Table | Headless table library — no pre-built styles to override. The column filter, pagination, and accessor APIs do the heavy lifting while the markup and styles remain fully under control to match the Figma |
| Radix UI | Unstyled, accessible primitives for the interactive pieces that are hard to build from scratch: `Popover` (filter panel), `DropdownMenu` (row actions), `AlertDialog` (blacklist confirmation), `Tabs` (user detail sections). Handles focus management, keyboard navigation, and portal rendering, all without imposing any visual style |
| Iconify + Tabler Icons | Large icon library loaded on demand. No bundle bloat — icons are fetched once and cached by the browser |
| React Router v7 | File-free route definition with layout routes, matching the three-page structure |
| Vitest + Testing Library | Fast test runner that shares the Vite config. Testing Library encourages tests that reflect real user behaviour |

## Quick Start

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the app:

```bash
pnpm build
```

This project uses pnpm. See [Installation](docs/installation.md) for full setup details.

## Documentation

| Doc | Contents |
|---|---|
| [Installation](docs/installation.md) | Install dependencies, start the dev server, build, and preview |
| [Architecture](docs/architecture.md) | Folder structure, features, data flow, and routing |
| [Testing](docs/testing.md) | Test stack, infrastructure files, and all 69 test cases |
| [Linting](docs/linting.md) | ESLint setup, key rules, and lint commands |
| [Icons](docs/icons.md) | Iconify usage and the Tabler Icons collection |
