import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/sendEmail.js";
import createToken from "../utils/createToken.js";

const signToken = function (user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = function (
  res,
  user,
  statusCode = 200,
  message = "Your account has been created successfully"
) {
  const token = signToken(user);

  //? send cookies
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number.parseFloat(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    ...(process.env.NODE_ENV === "production" && { secure: true }),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: "success",
    message,
    token,
  });
};

export const signup = async function (req, res, next) {
  try {
    //? 1. Create an email verification token
    const { token, hashedToken } = createToken();

    //? 2. Get users data, hash password and create user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
      emailVerificationToken: hashedToken,
    });

    //? 3. send the email verification token to the user
    const subject = "Email verification token";
    const message = `To verify your email click this link: ${
      req.protocol
    }://${req.get(
      "host"
    )}/api/v1/users/verifyEmail/${token}.\nIf you didn't signup to our site, then just ignore this email`;

    const mailOptions = {
      email: user?.email,
      message,
      subject,
    };

    await sendEmail(mailOptions);

    //? 4. Create a token and send token
    createSendToken(res, user, 201);
  } catch (err) {
    next(new AppError(err));
  }
};

export const login = async function (req, res, next) {
  try {
    //? 1.Get user data and check if it's there
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Provide your email and password", 400));
    }

    //? 2.Check if user exists and check if password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(new AppError("Wrong email or password", 401));
    }

    //? 3. Check if the user has verified their email on signup
    if (!user.isVerified) {
      return next(
        new AppError(
          "You need to verify your account first before you login",
          401
        )
      );
    }

    //? 4. Create a token and send token
    createSendToken(res, user, 200, "You're logged in successfully");
  } catch (err) {
    next(new AppError(err));
  }
};

export const verifyEmail = async function (req, res, next) {
  try {
    //? 1. Get the token and check if it's associated with a user
    const { hashedToken } = createToken(req.params.token);
    const user = await User.findOne({ emailVerificationToken: hashedToken });

    if (!user) {
      return next(new AppError("Wrong email verification token", 400));
    }

    //? 2. update the user document
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Your email is successfully verified, You can login now",
    });
  } catch (err) {
    next(new AppError(err));
  }
};

export const forgotPassword = async function (req, res, next) {
  try {
    //? 1. Get the email and check if it is associated with a user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("Email doesn't exist", 401));
    }

    //? 2. Generate password reset token
    const passwordResetToken = user.createPasswordResetToken();

    //? 3. Save the user
    await user.save({ validateBeforeSave: false });

    //? 4. Send token to the users email
    const subject = "Reset password token (expires in 10 minute)";
    const message = `To reset your password, send a patch request to ${
      req.protocol
    }://${req.get("host")}/api/v1/users/resetPassword/${passwordResetToken}`;

    const mailOptions = {
      email: user.email,
      subject,
      message,
    };

    await sendEmail(mailOptions);

    res
      .status(200)
      .json({ status: "success", message: "Email sent successfully!" });
  } catch (err) {
    next(new AppError(err, 401));
  }
};

export const resetPassword = async function (req, res, next) {
  try {
    //? 1. Get password reset token and check if it's associated with a user and if it has not expired
    const { token, hashedToken: passwordResetToken } = createToken(
      req.params.token
    );

    const user = await User.findOne({
      passwordResetToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(new AppError("Token invalid or has expired", 401));
    }

    //? 2. Update password, delete resetoken fields and save user
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    //? 3. Update passwordChangedAt field
    await user.save();

    //? 4. generate a new token
    createSendToken(
      res,
      user,
      200,
      "Use your new password next time you login"
    );
  } catch (err) {
    next(new AppError(err));
  }
};

export const updateMyPassword = async function (req, res, next) {
  try {
    //? 1. Get the current password and compare it with currently logged in user
    const user = await User.findOne({ email: req.user.email }).select(
      "+password"
    );

    if (!(await user.verifyPassword(req.body.currentPassword, user.password))) {
      return next(new AppError("Wrong password", 401));
    }

    //? 2. Update user password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    //? 3. Update passwordChangedAt field (happens in pre save hook)and save user
    const updatedUser = await user.save();

    //? 4. generate a new token
    createSendToken(res, user, 200, "Password updated successfully");
  } catch (err) {
    next(new AppError(err));
  }
};
