import type { Express } from "express";
import express from "express";
import path from "path";

export const setupVite = async (app: Express, server: any) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode: skipping Vite dev server setup");
    return;
  }
  // ✅ Only run in development
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
};

export const serveStatic = (app: Express) => {
  app.use(express.static(path.resolve("dist/public")));
};

export const log = (msg: string) => {
  console.log(`[SERVER] ${msg}`);
};
