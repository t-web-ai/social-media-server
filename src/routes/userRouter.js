import { Router } from "express";
import { login, logout, register } from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import { registerScheme, loginScheme } from "../schemes/userScheme.js";
const router = Router();

router.post("/register", validate(registerScheme), register);
router.post("/login", validate(loginScheme), login);
router.post("/logout", logout);

export default router;
