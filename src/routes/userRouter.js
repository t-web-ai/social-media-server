import { Router } from "express";
import { login, register } from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import { registerScheme, loginScheme } from "../schemes/useScheme.js";
const router = Router();

router.post("/register", validate(registerScheme), register);
router.post("/login", validate(loginScheme), login);

export default router;
