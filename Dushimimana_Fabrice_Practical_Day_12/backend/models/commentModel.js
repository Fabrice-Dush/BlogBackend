import mongoose from "mongoose";
import slugify from "slugify";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "A comment must have text"],
    trim: true,
  },
  slug: String,
  user: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
  blog: {
    ref: "Blog",
    type: mongoose.Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// commentSchema.index({ user: 1, blog: 1 }, { unique: true });

commentSchema.pre("save", function (next) {
  this.slug = slugify(this.comment, { lower: true });
  next();
});

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo email" });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
