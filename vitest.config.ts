import { defineConfig } from "vitest/config";
import path from "node:path";

// Vitest config kept minimal: TS path alias `@/*` mirrored from
// tsconfig.json, and pure node environment because the unit tests
// in this repo cover Redux reducers and pure filter/sort logic
// (no DOM). Component tests can opt-in to jsdom later via a `// @vitest-environment jsdom` directive without changing this config.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
