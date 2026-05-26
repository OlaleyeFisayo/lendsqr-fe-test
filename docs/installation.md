# Installation

This app uses pnpm for package management.

## Requirements

- Node.js
- pnpm

Check that both are available:

```bash
node --version
pnpm --version
```

## Install Dependencies

From the project root, install all dependencies:

```bash
pnpm install
```

This reads `package.json` and `pnpm-lock.yaml`, then installs the exact dependency tree for the app.

## Start Development Server

Run the Vite development server:

```bash
pnpm dev
```

The app is configured to use port `3000`.

## Build For Production

Create a production build:

```bash
pnpm build
```

This runs TypeScript project checks first, then builds the app with Vite.

## Preview Production Build

After building, preview the production output:

```bash
pnpm preview
```

## Other Useful Commands

Run lint checks:

```bash
pnpm lint
```

Run lint checks with automatic fixes:

```bash
pnpm lint:fix
```
