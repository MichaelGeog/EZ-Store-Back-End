import express from "express";
import {
  addAccessory,
  getAccessories,
  updateAccessory,
  deleteAccessory,
} from "../controllers/accessoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAccessory);
router.get("/", protect, getAccessories);
router.put("/:id", protect, updateAccessory);
router.delete("/:id", protect, deleteAccessory);

export default router;
