import {
  createNewPost,
  deletePostById,
  getPostById,
  getPosts,
} from "../services/postService.js";
export const createPost = async (req, res, next) => {
  try {
    const content = req.body.content;
    const imageUrl = req.imageUrl || null;
    const userId = req.user.id;
    const post = await createNewPost({ content, imageUrl, userId });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const posts = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const posts = await getPosts(page, limit, req.user.id);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const post = await getPostById(postId, req.user.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const deleted = await deletePostById(postId);
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const { page, limit, keyword } = req.query;
  try {
    const posts = await getPosts(page, limit, req.user.id, keyword);
    res.send(posts);
  } catch (error) {
    next(error);
  }
};
