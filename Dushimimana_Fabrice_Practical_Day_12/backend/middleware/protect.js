import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel.js";

export const protect = async function (req, res, next) {
  try {
    //? 1. Get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ").at(-1);
    }

    if (!token) {
      return next(new AppError("Login to gain access", 401));
    }

    //? 2. Verify the token to check if it has not expired yet or if it is valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //? 3. Check if the user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("Your account is deleted. Signup again", 401));
    }

    //? 4. Check if the user hasn't changed the password after the token has been issued
    if (user.passwordChangedAfter(decoded.iat)) {
      return next(new AppError("Password has been changed, Login again", 401));
    }

    //?5. grant access to the protected route
    req.user = user;
    next();
  } catch (err) {
    next(new AppError(err));
  }
};

export const restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("You don't have permission to access this recource", 403)
      );
    }

    next();
  };
};
