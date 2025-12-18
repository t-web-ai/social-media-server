import { createUser, loginUser } from "../services/userService.js";

export const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);
    res.cookie("token", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
