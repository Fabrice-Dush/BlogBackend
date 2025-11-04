import Subscribe from "../models/subscriberModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/sendEmail.js";

export const subscribeMiddleware = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("Wrong email address", 401));
  }

  //? prevent user from subscribing twice
  const subscribers = await Subscribe.find();

  if (subscribers.some((subscriber) => subscriber.email === user.email)) {
    return next(new AppError("You have subscribed already", 400));
  }

  req.fetchedUser = user;
  next();
};

export const createSubscribe = async function (req, res, next) {
  try {
    const subscriber = await Subscribe.create({
      user: req.fetchedUser.id,
      email: req.fetchedUser.email,
    });

    const email = req.fetchedUser.email;
    const subject = "Subscription confirmation";
    const message = `You have successfully subscribed to our site.\nYou will, from this day forward,
    receive an email from us everytime a new blog is added to the site.
    If, for some reason, you don't want to receive email about new blogs, unsubscribe here by sending a delete request: ${
      req.protocol
    }://${req.get("host")}/api/v1/subscribers/${subscriber.id}`;

    const mailOptions = {
      email,
      subject,
      message,
    };

    await sendEmail(mailOptions);

    res.status(201).json({
      status: "success",
      message:
        "You've subscribed successfully! Check your email inbox in case we create a new blog",
      data: { subscriber },
    });
  } catch (err) {
    next(new AppError(err));
  }
};
export const getSubscribers = async function (req, res, next) {
  try {
    const subscribers = await Subscribe.find();

    res.status(200).json({
      status: "success",
      message: "Subscribers fetched successfully!",
      results: subscribers.length,
      data: { subscribers },
    });
  } catch (err) {
    next(new AppError(err));
  }
};
export const deleteSubscribe = async function (req, res, next) {
  try {
    const filter = req.user.role === "admin" ? {} : { email: req.body.email };

    const subscriber = await Subscribe.findOneAndDelete(filter);
    if (!subscriber) return next(new AppError("Subscriber not found", 400));

    res.status(204).json({
      status: "success",
      message: "Subscriber deleted successfully",
      data: null,
    });
  } catch (err) {
    next(new AppError(err));
  }
};
