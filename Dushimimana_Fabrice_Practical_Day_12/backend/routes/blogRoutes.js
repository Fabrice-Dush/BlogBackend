import express from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  createBlog,
} from "../controllers/blogControllers.js";
import { protect, restrictTo } from "../middleware/protect.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, restrictTo("admin"), createBlog);

// router.route("/:slug").get(getBlog).patch(updateBlog).delete(deleteBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(protect, restrictTo("admin"), updateBlog)
  .delete(protect, restrictTo("admin"), deleteBlog);

export default router;
