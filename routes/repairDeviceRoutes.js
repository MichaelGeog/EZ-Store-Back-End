import express from "express";
import {
  addRepairDevice,
  getRepairDevices,
  updateRepairDevice,
  deleteRepairDevice,
} from "../controllers/repairDeviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addRepairDevice);
router.get("/", protect, getRepairDevices);
router.put("/:id", protect, updateRepairDevice);
router.delete("/:id", protect, deleteRepairDevice);

export default router;
