import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      trim: true,
      unique: true,
    },
    slug: String,
    image: {
      type: String,
      required: [true, "A blog must have an image"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    summary: {
      type: String,
      required: [true, "A blog must have a summary"],
      minLength: [10, "A blog summary must be at least 10 characters long"],
    },
    description: {
      type: String,
      required: [true, "A blog must have a description"],
      minLength: [30, "A blog description must be at least 30 characters long"],
    },
    read: {
      type: String,
      default: "15 minutes",
    },
    author: {
      type: String,
      default: "DUSHIMIMANA Fabrice",
    },
    authorImage: {
      type: String,
      default: "img/face1.jpg",
    },
    tags: {
      type: [String],
      default: ["Web development", "Software Development", "Nodejs"],
    },
    points: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//? virtual property
blogSchema.virtual("id").get(function () {
  this.id = this._id;
});

//? document middleware | run before any document is saved with .save() or .create
//? used to create a slug in this case
blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
