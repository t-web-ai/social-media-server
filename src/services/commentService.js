import prisma from "../prisma/client.js";

export const createComment = async (postId, userId, comment) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const data = await prisma.comment.create({
    data: { postId, userId, comment },
  });

  return { success: true, data };
};
