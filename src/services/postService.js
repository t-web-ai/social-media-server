import prisma from "../prisma/client.js";
import { config } from "dotenv";
import { shapePost } from "../utils/shapePost.js";
config({ quiet: true });
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

const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_PAGE_LIMIT, 10) || 10;
const MAX_LIMIT = parseInt(process.env.MAX_PAGE_LIMIT, 10) || 50;

export const getPosts = async (page = 1, limit = DEFAULT_LIMIT, userId) => {
  const safePage = Math.ceil(Math.max(Number(page) || 1, 1));
  const safeLimit = Math.ceil(
    Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)
  );

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, username: true } },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        comments: {
          include: { user: { select: { username: true, email: true } } },
        },
      },
    }),
    prisma.post.count(),
  ]);

  // ✅ Shape data cleanly
  const data = posts.map((post) => shapePost(post, userId));

  return {
    data,
    page: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit),
  };
};

export const getPostById = async (postId, userId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: { select: { id: true, username: true } },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      comments: {
        include: { user: { select: { username: true, email: true } } },
      },
    },
  });
  if (!post) throw { statusCode: 404, message: "No posts" };
  return shapePost(post, userId);
};
