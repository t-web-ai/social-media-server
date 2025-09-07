import prisma from "../prisma/client.js";
import { verifyRefreshToken } from "../utils/jwt.js";

const authRefresh = async (req, res, next) => {
  const refreshToken = req.cookies["token"];
  if (!refreshToken) {
    const error = new Error("No token is provided");
    error.statusCode = 401;
    throw error;
  }
  try {
    const payload = await verifyRefreshToken(refreshToken);
    const user = await prisma.token.findUnique({
      where: { token: refreshToken, userId: payload.id },
    });
    if (!user) {
      const error = new Error("Access token expired");
      error.statusCode = 401;
      throw error;
    }
    req.user = payload;
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

export default authRefresh;
