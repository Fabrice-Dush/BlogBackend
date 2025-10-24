import express from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  createBlog,
  uploadBlogImage,
  uploadImage,
} from "../controllers/blogControllers.js";
import { protect, restrictTo } from "../middleware/protect.js";
import commentRouter from "./commentRoutes.js";
import likeRouter from "./likeRoutes.js";

const router = express.Router();

//? Implementing nested routes
router.use("/:blogId/comments", commentRouter);
router.use("/:blogId/likes", likeRouter);

router
  .route("/")
  .get(getBlogs)
  .post(protect, restrictTo("admin"), uploadBlogImage, uploadImage, createBlog);

// router.route("/:slug").get(getBlog).patch(updateBlog).delete(deleteBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(protect, restrictTo("admin"), updateBlog)
  .delete(protect, restrictTo("admin"), deleteBlog);

export default router;
