import express from "express";
import { addSellingDevice, getSellingDevices } from "../controllers/sellingDeviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addSellingDevice);
router.get("/", protect, getSellingDevices);

export default router;
