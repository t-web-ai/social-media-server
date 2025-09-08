import { Router } from "express";
import { updateComment } from "../controllers/commentController.js";
import { canUpdateComment } from "../middlewares/canUpdateComment.js";
import validate from "../middlewares/validate.js";
import { commentScheme } from "../schemes/commentScheme.js";
const router = Router();

router.patch("/:id", canUpdateComment, validate(commentScheme), updateComment);

export default router;
