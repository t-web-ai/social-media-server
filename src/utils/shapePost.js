export const shapePost = (post, userId) => {
  return {
    id: post.id,
    content: post.content,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    author: post.user,
    likes: post.likes.map((like) => like.user),
    likeCount: post.likes.length,
    userHasLiked: post.likes.some((like) => like.userId === userId),
  };
};
