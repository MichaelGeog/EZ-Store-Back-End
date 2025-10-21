import Customer from "../models/customer.js";

// @desc Add new customer
// @route POST /api/customers
// @access Private
export const addCustomer = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;

    // check if customer already exists for this store by phone
    const existing = await Customer.findOne({ storeId: req.admin._id, phone });
    if (existing) return res.status(400).json({ message: "Customer already exists" });

    const customer = await Customer.create({
      storeId: req.admin._id,
      fullName,
      phone,
      email,
    });

    res.status(201).json(customer);
  } catch (err) {
    console.error("Add customer error:", err);
    res.status(500).json({ message: "Server error while adding customer" });
  }
};

// @desc Get all customers
// @route GET /api/customers
// @access Private
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ storeId: req.admin._id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error("Get customers error:", err);
    res.status(500).json({ message: "Server error while fetching customers" });
  }
};

// @desc Search customer by phone (for register sale lookup)
// @route GET /api/customers/search?phone=...
export const searchCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const customer = await Customer.findOne({ storeId: req.admin._id, phone });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (err) {
    console.error("Search customer error:", err);
    res.status(500).json({ message: "Server error while searching customer" });
  }
};

// @desc Update customer
// @route PUT /api/customers/:id
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, storeId: req.admin._id },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ message: "Server error while updating customer" });
  }
};

// @desc Delete customer
// @route DELETE /api/customers/:id
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      storeId: req.admin._id,
    });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ message: "Server error while deleting customer" });
  }
};
