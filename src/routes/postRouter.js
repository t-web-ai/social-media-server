import { Router } from "express";
import validate from "../middlewares/validate.js";
import { postScheme } from "../schemes/postScheme.js";
import {
  createPost,
  deletePost,
  post,
  posts,
} from "../controllers/postController.js";
import upload from "../middlewares/uploadFile.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import ownPost from "../middlewares/ownPost.js";
const router = Router();

router.post(
  "/",
  [upload.single("image"), validate(postScheme), uploadImage],
  createPost
);

router.get("/", posts);
router.get("/:id", post);
router.delete("/:id", ownPost, deletePost);

export default router;
