import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const filterObj = function (data, ...fields) {
  const filteredObj = Object.entries(data).reduce((acc, [key, value]) => {
    if (fields.includes(key)) acc[key] = value;
    return acc;
  }, {});

  return filteredObj;
};

export const updateMe = async function (req, res, next) {
  try {
    //? 1. Check if the password's fields are not in here
    if (req.body.password?.trim() || req.body.passwordConfirm?.trim()) {
      return next(
        new AppError(
          `This route is not for updating password. use /updateMyPassword route insted`,
          400
        )
      );
    }

    //? 2. Update user's data
    const filteredObj = filterObj(req.body, "name", "email");

    const user = await User.findByIdAndUpdate(req.user._id, filteredObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Your data is successfully updated",
      data: { user },
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const deleteMe = async function (req, res, next) {
  try {
    //? 1. Get user and check if the password is correct
    const user = await User.findById(req.user._id).select("+password");
    if (
      !user ||
      !(await user.verifyPassword(req.body.password, user.password))
    ) {
      next(new AppError("Wrong password", 401));
    }

    //? 2. Deactivate|Delete user
    await User.findByIdAndUpdate(user._id, { active: false });

    res.status(204).json({
      status: "success",
      message: "Your account has been deleted",
      data: null,
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (err) {
    next(new AppError(err));
  }
};
