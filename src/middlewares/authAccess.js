import { verifyAccessToken } from "../utils/jwt.js";

const authAccess = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"];
    if (!accessToken) {
      const error = new Error("No token is provided");
      error.statusCode = 401;
      throw error;
    }
    const user = await verifyAccessToken(accessToken);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
      error.statusCode = 401;
    }
    if (error.name === "TokenExpiredError") {
      error.message = "Access token expired";
      error.statusCode = 401;
    }
    next(error);
  }
};

export default authAccess;
