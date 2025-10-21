import express from "express";
import {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
} from "../controllers/deviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDevice);
router.get("/", protect, getDevices);
router.put("/:id", protect, updateDevice);
router.delete("/:id", protect, deleteDevice);

export default router;
