const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = err.statusCode || 500;

    const message =
      err.message ||
      (statusCode === 500 ? "Internal Server Error" : "Something went wrong");

    res.status(statusCode).json({
      success: false,
      message,
    });
  } catch (error) {
    next(`User : ${error.code}`);
  }
};

export default errorHandler;
