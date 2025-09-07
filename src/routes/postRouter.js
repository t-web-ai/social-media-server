import { Router } from "express";
import validate from "../middlewares/validate.js";
import { postScheme } from "../schemes/postScheme.js";
import {
  createPost,
  deletePost,
  post,
  posts,
  search,
} from "../controllers/postController.js";
import upload from "../middlewares/uploadFile.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import ownPost from "../middlewares/ownPost.js";
import { like, unlike } from "../controllers/likeController.js";
const router = Router();

router.post(
  "/",
  [upload.single("image"), validate(postScheme), uploadImage],
  createPost
);

router.get("/", posts);
router.get("/search", search);
router.get("/:id", post);
router.delete("/:id", ownPost, deletePost);
router.post("/:id/like", like);
router.delete("/:id/like", unlike);

export default router;
