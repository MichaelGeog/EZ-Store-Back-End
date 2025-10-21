import express from "express";
import {
  addAccessoryProduct,
  getAccessoryProducts,
  updateAccessoryProduct,
  deleteAccessoryProduct,
} from "../controllers/accessoryProductController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAccessoryProduct);
router.get("/", protect, getAccessoryProducts);
router.put("/:id", protect, updateAccessoryProduct);
router.delete("/:id", protect, deleteAccessoryProduct);

export default router;
