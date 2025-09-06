import prisma from "../prisma/client.js";

export const getCurrentUser = async ({ id }) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });
  if (!user) {
    const error = new Error("User is not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};
