import express from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  createBlog,
} from "../controllers/blogControllers.js";

const router = express.Router();

router.route("/").get(getBlogs).post(createBlog);

// router.route("/:slug").get(getBlog).patch(updateBlog).delete(deleteBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

export default router;
