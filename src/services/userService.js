import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const createUser = async ({ email, username, password }) => {
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username, password: hashed },
  });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  await prisma.token.upsert({
    where: { userId: user.id },
    update: { token: refreshToken },
    create: { userId: user.id, token: refreshToken },
  });

  return { accessToken, refreshToken };
};
