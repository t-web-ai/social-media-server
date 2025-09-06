import { getCurrentUser } from "../services/profileService.js";

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
