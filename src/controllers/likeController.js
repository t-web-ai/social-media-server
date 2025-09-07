import { likePost, unlikePost } from "../services/likeService.js";

export const like = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  try {
    const like = await likePost(postId, userId);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
};

export const unlike = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  try {
    const unlike = await unlikePost(postId, userId);
    res.status(200).json(unlike);
  } catch (error) {
    next(error);
  }
};
