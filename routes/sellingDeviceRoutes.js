import express from "express";
import {
  addSellingDevice,
  getSellingDevices,
  updateSellingDevice,
  deleteSellingDevice,
} from "../controllers/sellingDeviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addSellingDevice);
router.get("/", protect, getSellingDevices);
router.put("/:id", protect, updateSellingDevice);
router.delete("/:id", protect, deleteSellingDevice);

export default router;
