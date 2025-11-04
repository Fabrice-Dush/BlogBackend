import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controllers/commentControllers.js";
import { protect } from "../middleware/protect.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").get(protect, getComments).post(protect, createComment);

router
  .route("/:id")
  .get(protect, getComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
