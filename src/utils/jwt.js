import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ quiet: true });

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;

export const generateAccessToken = async ({ id }) => {
  return jwt.sign({ id }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRE });
};

export const generateRefreshToken = async ({ id }) => {
  return jwt.sign({ id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE });
};

export const verifyAccessToken = async (token) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = async (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};
