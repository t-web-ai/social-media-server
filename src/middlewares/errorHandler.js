const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message =
    err.message ||
    (statusCode === 500 ? "Internal Server Error" : "Something went wrong");

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
