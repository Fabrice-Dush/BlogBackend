import express from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
  updateMyPassword,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/protect.js";
import {
  deleteMe,
  getAllUsers,
  updateMe,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updateMyPassword);
router.patch("/updateMe", protect, updateMe);

router.delete("/deleteMe", protect, deleteMe);

router.get("/", protect, restrictTo("admin"), getAllUsers);

export default router;
