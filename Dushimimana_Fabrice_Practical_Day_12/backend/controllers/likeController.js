import Blog from "../models/blogModel.js";
import AppError from "../utils/appError.js";

export const createLike = async function (req, res, next) {
  try {
    const blog = await Blog.findById(req.params.blogId);

    //? Like and unlike
    const likes = blog.likes.some((like) => like.id === req.user.id)
      ? blog.likes.filter((like) => like.id !== req.user.id)
      : [...blog.likes, req.user.id];

    blog.likes = [...likes];
    const updatedBlog = await blog.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({
        status: "success",
        message: "You liked this blog",
        data: { blog: updatedBlog },
      });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getLikes = async function (req, res, next) {
  try {
    const blog = await Blog.findById(req.params.blogId);

    res.status(200).json({
      status: "success",
      message: "All likes fetched successfully!",
      numLikes: blog.likes.length,
      data: { likes: blog.likes },
    });
  } catch (err) {
    next(new AppError(err));
  }
};
