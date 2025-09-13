import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
    build: {
            rollupOptions: {
              input: {
                main: 'index.html',
                admin: 'Admin_dash.html',
                judging: 'judging.html'
              },
            },
          },
});

