import express from "express";

import { protect, restrictTo } from "../middleware/protect.js";
import { createLike, getLikes } from "../controllers/likeController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, restrictTo("admin"), getLikes)
  .patch(protect, createLike);

export default router;
