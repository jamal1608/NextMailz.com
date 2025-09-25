import type { Express } from "express";

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
  const express = require("express");
  const path = require("path");

  app.use(express.static(path.resolve("dist/public")));
};

export const log = (msg: string) => {
  console.log(`[SERVER] ${msg}`);
};
