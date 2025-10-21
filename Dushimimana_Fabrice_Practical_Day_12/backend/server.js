import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

mongoose
  .connect(process.env.DATABASE)
  .then((conn) => console.log(`🎉🎉 Database connected successfully!`))
  .catch((err) => console.log(`⛔⛔ Error connecting to database: ${err}`));

app.listen(process.env.PORT, () =>
  console.log(`App Started listening on port ${process.env.PORT}`)
);
