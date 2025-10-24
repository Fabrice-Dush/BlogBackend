import Comment from "../models/commentModel.js";
import AppError from "../utils/appError.js";

export const createComment = async function (req, res, next) {
  try {
    const user = req.user.id;
    const blog = req.params.blogId;
    const comment = await Comment.create({ ...req.body, user, blog });

    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: { comment },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getComments = async function (req, res, next) {
  try {
    const filter = req.params?.blogId ? { blog: req.params.blogId } : {};
    const comments = await Comment.find(filter);

    res.status(200).json({
      status: "success",
      message: "Comments fetched successfully",
      results: comments.length,
      data: { comments },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getComment = async function (req, res, next) {
  try {
    const comment = await Comment.findOne({
      id: req.params.id,
      user: req.user.id,
    });

    if (!comment) {
      return next(new AppError("Comment not found for the specified Id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Comment fetched successfully",
      data: { comment },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const updateComment = async function (req, res, next) {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, blog: req.params.blogId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!comment) {
      return next(new AppError("Comment not found for the specified Id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Comment updated successfully",
      data: { comment },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const deleteComment = async function (req, res, next) {
  try {
    const comment = await Comment.findOneAndDelete({
      user: req.user.id,
      _id: req.params.id,
    });

    if (!comment) {
      return next(new AppError("Comment not found for the specified Id", 404));
    }

    res.status(204).json({
      status: "success",
      message: "Comment deleted successfully",
      data: null,
    });
  } catch (err) {
    next(new AppError(err));
  }
};
