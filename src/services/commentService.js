import prisma from "../prisma/client.js";

export const createComment = async (postId, userId, comment) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const data = await prisma.comment.create({
    data: { postId, userId, comment },
  });

  return { success: true, data };
};

const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_PAGE_LIMIT, 10) || 10;
const MAX_LIMIT = parseInt(process.env.MAX_PAGE_LIMIT, 10) || 50;

export const getComments = async (page = 1, limit = DEFAULT_LIMIT, postId) => {
  const safePage = Math.ceil(Math.max(Number(page) || 1, 1));
  const safeLimit = Math.ceil(
    Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)
  );

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const [comments, count] = await Promise.all([
    prisma.comment.findMany({
      where: { postId },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, username: true } } },
    }),
    prisma.comment.count({ where: { postId } }),
  ]);

  return {
    postId,
    comments,
    commentSize: comments.length,
    page: safePage,
    limit: safeLimit,
    total: count,
    totalPages: Math.ceil(count / safeLimit),
  };
};

export const updateCommentById = async (commentId, commentText) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (comment.comment == commentText)
    return { updated: false, message: "No changes" };

  const update = await prisma.comment.update({
    where: { id: commentId },
    data: { comment: commentText },
  });

  return { updated: true, data: update };
};

export const deleteCommentById = async (commentId) => {
  const deleted = await prisma.comment.delete({ where: { id: commentId } });
  return {
    success: true,
    message: "Comment deleted successfully",
    commentId,
  };
};
