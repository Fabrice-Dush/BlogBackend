import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/config.env` });

mongoose
  .connect(process.env.DATABASE)
  .then((conn) => console.log(`🎉🎉 Database connected successfully!`))
  .catch((err) => console.log(`⛔⛔ Error connecting to database: ${err}`));

app.listen(process.env.PORT, () =>
  console.log(`App Started listening on port ${process.env.PORT}`)
);
