import { getCurrentUser } from "../services/profileService.js";
import { generateAccessToken } from "../utils/jwt.js";

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const accessToken = await generateAccessToken(req.user);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
