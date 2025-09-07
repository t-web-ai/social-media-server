import prisma from "../prisma/client.js";
export const likePost = async (postId, userId) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const like = await prisma.like.upsert({
    where: { userId_postId: { userId, postId } },
    update: {},
    create: { userId, postId },
    include: { post: { include: { likes: true } } },
  });
  return {
    postId,
    liked: true,
    totalLikes: like.post.likes.length,
  };
};

export const unlikePost = async (postId, userId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { likes: true },
  });
  if (!post) throw { statusCode: 404, message: "Post not found" };

  const unlike = await prisma.like.deleteMany({
    where: { userId, postId },
  });

  return {
    postId,
    liked: false,
    totalLikes: post.likes.length - unlike.count,
  };
};
