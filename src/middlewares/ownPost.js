import { getPostById } from "../services/postService.js";

const ownPost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  try {
    const post = await getPostById(postId, userId);
    if (post.author.id != userId)
      throw { statusCode: 403, message: "You have no permission" };
    next();
  } catch (error) {
    next(error);
  }
};

export default ownPost;
