import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: { tsconfigPath: "./tsconfig.json" },
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: [
      "**/docs/*",
      "**/dist/*",
      "./README.md",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "ts/no-redeclare": "off",
      "ts/no-unsafe-assignment": ["off"],
      "ts/consistent-type-definitions": ["error", "type"],
      "object-curly-newline": ["error", {
        multiline: true,
        minProperties: 2,
      }],
      "style/function-paren-newline": [
        "error",
        "multiline-arguments",
      ],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "perfectionist/sort-imports": [
        "error",
      ],
      "unicorn/filename-case": ["error", {
        case: "kebabCase",
        ignore: ["README.md"],
      }],
      "style/jsx-max-props-per-line": ["error", { maximum: 1 }],
      "no-undef": "off",
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
    },
  },
);
