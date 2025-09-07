import prisma from "../prisma/client.js";
export const createNewPost = async ({ content, imageUrl, userId }) => {
  const post = await prisma.post.create({
    data: {
      content,
      imageUrl,
      authorId: userId,
    },
  });
  return post;
};
