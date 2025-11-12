import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  const plugins: any[] = [react()];

  // Only load Replit plugins in development
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    try {
      const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
      plugins.push((runtimeErrorOverlay as any).default());

      const cartographer = await import("@replit/vite-plugin-cartographer");
      plugins.push((cartographer as any).cartographer());
    } catch (e) {
      console.log("Replit plugins not available, skipping...");
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
        "@client": path.resolve(__dirname, "client", "src"),
        "@server": path.resolve(__dirname, "server"),
        "@/data": path.resolve(__dirname, "data"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
        allow: [".."],
      },
    },
  };
});