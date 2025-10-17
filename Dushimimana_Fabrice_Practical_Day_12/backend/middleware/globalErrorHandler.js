//? GLOBAL ERROR HANDLING MIDDLEWARE
const globalErrorHandler = function (err, req, res, next) {
  //? IN DEVELOPMENT SENDS AN ERROR AS IT IS
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
    });

    //? IN PRODUCTION FORMAT OPERATIONAL ERRORS
  } else if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      //? Get error name
      const { name } = err.error;

      //? handle validation errors
      if (name === "ValidationError") {
        err.message = Object.values(err.error.errors)
          .map((error) => error.message)
          .join("\n");
      }

      //? handle castError(wrong id) errors
      else if (name === "CastError") {
        err.message = `${err.error.path} ${err.error.stringValue} doesn't exist`;
      }

      //? Handle duplicate keys errors
      else if (err.error.code === 11000) {
        err.message = `${
          err.error.keyValue[Object.keys(err.error.keyValue).at(0)]
        } already exists`;
      }

      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: "Something went very wrong" });
    }
  }
};

export default globalErrorHandler;
