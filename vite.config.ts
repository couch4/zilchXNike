import { defineConfig } from "vite";

import terser from "@rollup/plugin-terser";

export default defineConfig({
  build: {
    target: "es2022",
    rollupOptions: {
      plugins: [terser()],
    },
  },
});
