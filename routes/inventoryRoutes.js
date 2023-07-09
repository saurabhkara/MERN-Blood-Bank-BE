import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createInventoryController,
  getInventoryController,
} from "../controller/inventoryController.js";

const router = express.Router();

//CREATE INVENTORY RECORD
router.post("/create-inventory", authMiddleware, createInventoryController);

//Get ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);

export default router;
