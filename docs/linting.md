# Linting

This app uses ESLint with the shared `@antfu/eslint-config` preset.

The lint setup lives in `eslint.config.js` and is configured for:

- Application code.
- React.
- TypeScript.
- Code formatting rules.
- Two-space indentation.
- Semicolons.
- Double quotes.

## Commands

Run lint checks:

```bash
pnpm lint
```

Run lint checks and apply automatic fixes:

```bash
pnpm lint:fix
```

## Ignored Files

The lint config ignores generated and documentation output:

- `docs`
- `dist`

## Important Rules

The project enforces a few app-specific rules on JavaScript and TypeScript files:

- Type aliases are preferred over interfaces.
- Imports are sorted.
- File names should use kebab-case.
- JSX props should be placed one per line.
- `console` usage is allowed, but reported as a warning.
- Direct `process.env` access is disallowed.

## File Coverage

The custom rules apply to:

```txt
**/*.{js,jsx,ts,tsx}
```

If a file fails linting, run `pnpm lint:fix` first, then fix any remaining reported issues manually.
