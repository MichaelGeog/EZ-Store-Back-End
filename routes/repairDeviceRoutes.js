import express from "express";
import {
  addRepairDevice,
  getRepairDevices,
} from "../controllers/repairDeviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addRepairDevice);
router.get("/", protect, getRepairDevices);

export default router;
