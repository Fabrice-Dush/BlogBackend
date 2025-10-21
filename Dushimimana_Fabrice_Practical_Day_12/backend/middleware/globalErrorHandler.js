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
        err.statusCode = 400;
        err.message = Object.values(err.error.errors)
          .map((error) => error.message)
          .join("\n");
      }

      //? handle castError(wrong id) errors
      else if (name === "CastError") {
        err.statusCode = 400;
        err.message = `${err.error.path} ${err.error.stringValue} doesn't exist`;
      }

      //? Handle duplicate keys errors
      else if (err.error.code === 11000) {
        err.statusCode = 400;
        err.message = `${
          err.error.keyValue[Object.keys(err.error.keyValue).at(0)]
        } already exists`;
      }

      //? handle JsonWebTokenError
      else if (name === "JsonWebTokenError") {
        err.statusCode = 401;
        err.message = err.error.message;
      }

      //? handle TokenExpiredError
      else if (name === "TokenExpiredError") {
        err.statusCode = 401;
        err.message = err.error.message;
      }

      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    //? send a generic error message
    else {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: "Something went very wrong" });
    }
  }
};

export default globalErrorHandler;
