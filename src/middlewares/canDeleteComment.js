import prisma from "../prisma/client.js";
export const canDeleteComment = async (req, res, next) => {
  const { id: commentId } = req.params;
  const { id: userId } = req.user;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      post: {
        select: { authorId: true },
      },
    },
  });
  if (!comment) throw { statucCode: 404, message: "Comment not found" };

  if (!(comment.userId === userId || comment.post.authorId === userId))
    throw { statusCode: 403, message: "You have no permission" };

  next();
};
