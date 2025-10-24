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
import commentRouter from "./commentRoutes.js";
import likeRouter from "./likeRoutes.js";

const router = express.Router();

//? Implementing nested routes
router.use("/:blogId/comments", commentRouter);
router.use("/:blogId/likes", likeRouter);

router.route("/").get(getBlogs).post(uploadBlogImage, uploadImage, createBlog);

router
  .route("/:id")
  .get(getBlog)
  .put(uploadBlogImage, uploadImage, updateBlog)
  .delete(deleteBlog);

export default router;
