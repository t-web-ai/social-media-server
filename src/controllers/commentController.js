import { createComment } from "../services/commentService.js";

export const addComment = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { comment } = req.body;
  try {
    const response = await createComment(postId, userId, comment);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
