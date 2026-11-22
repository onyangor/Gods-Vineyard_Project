import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import handler from "./api/sermons.js";

// On Vercel, /api/sermons is a serverless function. This small plugin makes the SAME code answer
// when you run the site on your own computer (npm run dev / npm run site), so you can see live videos too.
function localApi() {
  const middleware = async (req, res, next) => {
    if (!req.url.startsWith("/api/sermons")) return next();
    await handler(req, {
      setHeader: (name, value) => res.setHeader(name, value),
      status: (code) => ({
        json: (body) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
        },
      }),
    });
  };
  return {
    name: "local-api",
    // Braces matter here: returning a value from these hooks would make Vite treat it as a "run later" function.
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({ plugins: [react(), localApi()] });
