import { Router } from "express";
import { me, refresh } from "../controllers/profileController.js";
import authAccess from "../middlewares/authAccess.js";
import authRefresh from "../middlewares/authRefresh.js";
const router = Router();

router.get("/me", authAccess, me);
router.get("/token/refresh", authRefresh, refresh);

export default router;
