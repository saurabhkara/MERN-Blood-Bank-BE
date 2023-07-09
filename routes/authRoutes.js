import express from "express";
import * as auth from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", auth.registerController);
router.post("/login", auth.loginController);
router.get("/current-user", authMiddleware, auth.getCurrentUserController);

export default router;
