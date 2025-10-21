import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../../../models/blogModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });

mongoose
  .connect(process.env.DATABASE)
  .then((conn) => console.log(`🎉🎉 Database connected successfully!`))
  .catch((err) => console.log(`⛔⛔ Error connecting to database: ${err}`));

const blogs = [
  {
    title: "Deno Vs. Node.Js Vs. Bun: Full comparison guide",
    image: "img/deno.webp",
    date: "2025-10-16T04:03:21.285Z",
    summary:
      "Not sure which of these runtimes to use in your new project or if it's worth migrating?",
    description:
      "Not sure which of these runtimes to use in your new project or if it's worth migrating? There's a clear winner in the deno vs node debate. Could bun overthrow both? We break down the pros + cons of each so you can decide which to use or learn",
    read: "15 minutes",
    author: "DUSHIMIMANA Fabrice",
    authorImage: "img/face1.jpg",
    tags: ["Web development", "Software Development", "Nodejs"],
    points: [
      "Performance",
      "Industry",
      "Job Opportunity",
      "Personal Preference",
      "Ease of learning",
    ],
  },
  {
    title: "Become a Great Software Engineer(4 Habits)",
    image: "img/habits.webp",
    date: "2025-02-28T22:00:00.000Z",
    summary:
      "I'm sure you've come across a few people who are truly exceptional devs. But what makes them great?",
    description:
      "Not sure which of these runtimes to use in your new project or if it's worth migrating? There's a clear winner in the deno vs node debate. Could bun overthrow both? We break down the pros + cons of each so you can decide which to use or learn",
    read: "24 minutes",
    author: "UMUTAMBYI Gad",
    authorImage: "img/face2.jpg",
    tags: ["Software Development", "Habits", "Developer"],
    summmary:
      "I'm sure you've come across a few people who are truly exceptional devs. But what makes them great?",
  },
  {
    title: "TypeScript vs. JavaScript, Which Is Better and Why?",
    image: "img/typescript.webp",
    date: "2025-05-31T21:00:00.000Z",
    summary:
      "You should 100% learn both. But these are the key pros and cons of each (with code examples)",
    description:
      "Not sure which of these runtimes to use in your new project or if it's worth migrating? There's a clear winner in the deno vs node debate. Could bun overthrow both? We break down the pros + cons of each so you can decide which to use or learn",
    read: "30 minutes",
    author: "TUYISHIME Daniel",
    authorImage: "img/face3.jpg",
    tags: ["Software Development", "Frontend Developer"],
    points: [
      "Ease of learning",
      "Industry",
      "Job Opportunity",
      "Performance",
      "Personal Preference",
    ],
  },
];

const insertManyDocuments = async function (blogs) {
  try {
    const blogsInserted = await Blog.create(blogs);

    console.log("All Blogs inserted: ", blogsInserted);
  } catch (err) {
    console.error(`⛔⛔: ${err}`);
  }
};
insertManyDocuments(blogs);

const deleteManyDocuments = async function () {
  try {
    await Blog.deleteMany();
    console.log("All blogs deleted");
  } catch (err) {
    console.error(`⛔⛔: ${err}`);
  }
};
// deleteManyDocuments();
