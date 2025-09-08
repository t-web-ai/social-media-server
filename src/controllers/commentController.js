import {
  createComment,
  getComments,
  updateCommentById,
} from "../services/commentService.js";

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

export const comments = async (req, res, next) => {
  const { id: postId } = req.params;
  const { page, limit } = req.query;
  try {
    const comment = await getComments(page, limit, postId);
    res.send(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { id: commentId } = req.params;
  const { comment: commentText } = req.body;
  try {
    const response = await updateCommentById(commentId, commentText);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
