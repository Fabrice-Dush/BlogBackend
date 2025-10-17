import Blog from "../models/blogModel.js";
import AppError from "../utils/appError.js";

export const createBlog = async function (req, res, next) {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: { blog },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getBlogs = async function (req, res, next) {
  try {
    //? creating a query
    const query = Blog.find().select("-__v");

    //? Executing a query
    const blogs = await query.find();

    res.status(200).json({
      status: "success",
      message: "Fetched all blogs successfully",
      data: { blogs },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getBlog = async function (req, res, next) {
  try {
    // const { slug } = req.params;
    // const blog = await Blog.findOne({ slug });

    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new AppError("Blog not found for the specified id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Fetched blog successfully",
      data: { blog },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const updateBlog = async function (req, res, next) {
  try {
    // const { slug } = req.params;
    // const blog = await Blog.findOneAndUpdate({ slug }, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return next(new AppError("Blog not found for the specified id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: { blog },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const deleteBlog = async function (req, res, next) {
  try {
    // const { slug } = req.params;
    // const blog = await Blog.findOneAndDelete({ slug });

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
