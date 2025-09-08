import prisma from "../prisma/client.js";
export const canUpdateComment = async (req, res, next) => {
  const { id: commentId } = req.params;
  const { id: userId } = req.user;
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw { statucCode: 404, message: "Post not found" };

  if (comment.userId != userId)
    throw { statusCode: 403, message: "You have no permission" };

  next();
};
