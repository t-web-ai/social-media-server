import { Router } from "express";
import { me } from "../controllers/profileController.js";
import authAccess from "../middlewares/authAccess.js";
const router = Router();

router.get("/me", authAccess, me);

export default router;
