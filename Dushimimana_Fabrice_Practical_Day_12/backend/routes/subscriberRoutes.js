import express from "express";
import {
  createSubscribe,
  deleteSubscribe,
  getSubscribers,
  subscribeMiddleware,
} from "../controllers/subscriberControllers.js";
import { protect, restrictTo } from "../middleware/protect.js";

const router = express.Router();

router
  .route("/")
  .post(subscribeMiddleware, createSubscribe)
  .get(protect, restrictTo("admin"), getSubscribers);

router.delete("/unsubscribe", deleteSubscribe);

export default router;
