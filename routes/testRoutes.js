import express from "express";
import { testController } from "../controller/testController.js";

const router = express.Router();

export default router.get("/test", testController);