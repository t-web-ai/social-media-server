import { createNewPost } from "../services/postService.js";
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
