import express from "express";
import {
  addCustomer,
  getCustomers,
  searchCustomerByPhone,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addCustomer);
router.get("/", protect, getCustomers);
router.get("/search", protect, searchCustomerByPhone);
router.put("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

export default router;
