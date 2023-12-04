//For testing
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //For testing
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  }
})
