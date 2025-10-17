import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import blogRouter from "./routes/blogRoutes.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import AppError from "./utils/appError.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/config.env` });

//? Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//? Allow requests from anywhere
app.use(cors());

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/blogs", blogRouter);

app.use(function (req, res, next) {
  next(new AppError("Route not found on this server", 404));
});

app.use(globalErrorHandler);

export default app;
