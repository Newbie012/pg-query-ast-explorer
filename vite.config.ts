import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      silent: true,
      targets: [
        {
          src: "node_modules/@libpg-query/parser/wasm/libpg-query.wasm",
          dest: ".",
        },
      ],
    }),
    react(),
    tailwindcss(),
  ],
});
