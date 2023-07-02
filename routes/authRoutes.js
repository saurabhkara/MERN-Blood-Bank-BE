import express from "express";
import * as auth from "../controller/authController.js";

const router = express.Router();

router.post("/register", auth.registerController);
router.post("/login", auth.loginController);

export default router;
