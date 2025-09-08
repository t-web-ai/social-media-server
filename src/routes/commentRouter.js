import { Router } from "express";
import {
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";
import { canUpdateComment } from "../middlewares/canUpdateComment.js";
import validate from "../middlewares/validate.js";
import { commentScheme } from "../schemes/commentScheme.js";
import { canDeleteComment } from "../middlewares/canDeleteComment.js";
const router = Router();

router.patch("/:id", canUpdateComment, validate(commentScheme), updateComment);
router.delete("/:id", canDeleteComment, deleteComment);

export default router;
