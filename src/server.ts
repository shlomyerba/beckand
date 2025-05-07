import { env } from "process";
import express from "express";
import cors from "cors";

import App from "./app";
import loggerMiddleware from "./middleware/logger";
import { HealthController } from "./controllers/health.controller";
import { ExampleController } from "./controllers/example.controller";
import { ItemController } from "./controllers/item.controller";

const whiteListDomain = process.env.WHITE_LIST_DOMAIN?.split(",") || [];

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "Access-Control-Allow-Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
  ],
  credentials: false,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: whiteListDomain,
  preflightContinue: false,
};

const app = new App({
  port: env.PORT ? parseInt(env.PORT) : 80,
  controllers: [
    // new HealthController(),
    // new ExampleController(),
    new ItemController(),
  ],
  middleWares: [
    express.json(),
    express.urlencoded({ extended: true }),
    cors(options),
    loggerMiddleware,
  ],
});

app.listen();
