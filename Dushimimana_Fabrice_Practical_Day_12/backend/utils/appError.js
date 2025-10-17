class AppError {
  constructor(error, statusCode = 500) {
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.error = error;
    this.message = error.message ?? error;
    this.isOperational = true;
  }
}

export default AppError;
