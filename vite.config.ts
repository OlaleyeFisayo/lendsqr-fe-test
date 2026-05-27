/// <reference types="vitest" />
import {
  fileURLToPath,
  URL,
} from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          const normalizedId = id.replaceAll("\\", "/");

          if (normalizedId.includes("/@radix-ui/")) {
            return "radix-vendor";
          }

          if (normalizedId.includes("/@tanstack/")) {
            return "tanstack-vendor";
          }

          if (normalizedId.includes("/@iconify/")) {
            return "iconify-vendor";
          }

          if (
            normalizedId.includes("/react/")
            || normalizedId.includes("/react-dom/")
            || normalizedId.includes("/scheduler/")
          ) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      ...(mode === "test"
        ? [
            {
              find: /^.*\.svg(\?.*)?$/,
              replacement: fileURLToPath(new URL("./src/test/__mocks__/svg-mock.ts", import.meta.url)),
            },
          ]
        : []),
    ],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/shared/lib/router.tsx",
        "src/features/dashboard/utils/users.json",
        "src/test/**",
      ],
    },
  },
}));
