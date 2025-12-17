const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = err.statusCode || 500;

    const message = String(err.name).toLowerCase().includes("prisma")
      ? "Please connect to a VPN"
      : err.message ||
        (statusCode === 500 ? "Internal Server Error" : "Something went wrong");

    res.status(statusCode).json({
      success: false,
      message,
      error: err,
    });
  } catch (error) {
    next(`User : ${error.code}`);
  }
};

export default errorHandler;
