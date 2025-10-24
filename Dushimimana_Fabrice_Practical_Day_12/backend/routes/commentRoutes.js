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

router.route("/").get(getComments).post(createComment);

router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);

export default router;
