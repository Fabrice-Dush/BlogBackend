import mongoose from "mongoose";
import validator from "validator";

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Wrong email format"],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;
