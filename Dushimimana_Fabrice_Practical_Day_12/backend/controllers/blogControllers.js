import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Blog from "../models/blogModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

//? make .env configuration file available
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../../config.env` });

//? Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//? Creating storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//? multer middleware
export const uploadBlogImage = upload.single("image");

//? middleware to upload image to cloudinary
export const uploadImage = function (req, res, next) {
  try {
    cloudinary.uploader.upload(req.file?.path, function (err, result) {
      if (err) throw new Error(err);

      //? calling the next middleware in the middleware stack
      req.result = result;
      next();
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const createBlog = async function (req, res, next) {
  try {
    const blog = await Blog.create({ ...req.body, image: req.result?.url });

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: { blog: { ...blog._doc, image: req.result.url } },
    });
  } catch (err) {
    next(new AppError(err, 500));
  }
};

export const getBlogs = async function (req, res, next) {
  try {
    //? 1. creating a query
    const apiFeatures = new APIFeatures(Blog.find(), req.query)
      .filtering()
      .limitingFields()
      .sorting()
      .pagination();

    //? 2. Executing a query
    const blogs = await apiFeatures.query;

    res.status(200).json({
      status: "success",
      message: "Fetched all blogs successfully",
      results: blogs.length,
      data: { blogs },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getBlog = async function (req, res, next) {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate({
      path: "comments",
      select: "-__v",
    });

    if (!blog) {
      return next(new AppError("Blog not found for the specified id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Fetched blog successfully",
      data: { blog: blog._doc },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const updateBlog = async function (req, res, next) {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body, image: req.result?.url },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!blog) {
      return next(new AppError("Blog not found for the specified id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: { blog: { ...blog._doc, image: req.result?.url } },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const deleteBlog = async function (req, res, next) {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return next(new AppError("Blog not found for the specified id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
      data: { blog },
    });
  } catch (err) {
    next(new AppError(err));
  }
};
