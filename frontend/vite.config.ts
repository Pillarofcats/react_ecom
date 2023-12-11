//For testing
/// <reference types='vitest' />
/// <reference types='vite/client' />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //For testing
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./__tests__/setupTests.ts"],
  },
});
