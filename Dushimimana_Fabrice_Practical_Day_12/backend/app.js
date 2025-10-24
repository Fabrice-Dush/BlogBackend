import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";

import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import subscribeRouter from "./routes/subscriberRoutes.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import AppError from "./utils/appError.js";

//? Initialize express app
const app = express();

//? make .env configuration file available
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../config.env` });

//? Middlewares

//? adding security headers
app.use(helmet());

//? development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//? Allow requests from anywhere
app.use(cors());

//? limit the number of requests a single api can make to 100
app.use(
  "/api",
  rateLimit({
    limit: 100,
    windowMs: 24 * 60 * 60 * 1000,
    message: "You made too many requests. Wait to make another after an hour",
  })
);

//? body parser to add body to the req.body
app.use(express.json());

//? serving static files
app.use(express.static(`${__dirname}/public`));

//? sanitize data to avoid NoSql query injection
app.use(sanitize());

//? avoid parameter pollution
app.use(
  hpp({
    whitelist: ["title", "slug", "date"],
  })
);

//? testing middleware
app.use(function (req, res, next) {
  // req.requestTime = new Date();
  // console.log(req);
  // console.log(req.requestTime);
  next();
});

//? routers
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribers", subscribeRouter);

//? middleware for routes which are not found
app.use(function (req, res, next) {
  next(new AppError("Route not found on this server", 404));
});

//? global error handling middleware
app.use(globalErrorHandler);

export default app;
