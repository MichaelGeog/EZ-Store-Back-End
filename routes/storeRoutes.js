import express from "express";
import { createStore, getMyStore } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createStore);
router.get("/me", protect, getMyStore);

export default router;
