import { Router } from "express";
import validate from "../middlewares/validate.js";
import { postScheme } from "../schemes/postScheme.js";
import { createPost, post, posts } from "../controllers/postController.js";
import upload from "../middlewares/uploadFile.js";
import { uploadImage } from "../middlewares/uploadImage.js";
const router = Router();

router.post(
  "/",
  [upload.single("image"), validate(postScheme), uploadImage],
  createPost
);

router.get("/", posts);
router.get("/:id", post);

export default router;
