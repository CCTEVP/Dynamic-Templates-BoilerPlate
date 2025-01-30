import { defineConfig } from "vite";

export default defineConfig({
    base: "/", // Adjust this path as needed
    publicDir: "public",
    server: {
        host: "0.0.0.0",
    },
});
