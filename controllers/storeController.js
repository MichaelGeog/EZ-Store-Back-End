import Store from "../models/store.js";

// @desc    Create a store for the logged-in admin
// @route   POST /api/store
// @access  Private
export const createStore = async (req, res) => {
  try {
    const existingStore = await Store.findOne({ ownerAdmin: req.admin._id });
    if (existingStore) {
      return res.status(400).json({ message: "Store already exists for this admin" });
    }

    const store = await Store.create({
      ownerAdmin: req.admin._id,
      storeName: req.admin.businessName, // auto from admin
      email: req.admin.email,             // auto from admin
      phone: req.body.phone || "",
      address: req.body.address || "",
      settings: req.body.settings || { currency: "USD", taxRate: 0 },
    });

    res.status(201).json(store);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ message: "Server error while creating store" });
  }
};

// @desc    Get store info for the logged-in admin
// @route   GET /api/store/me
// @access  Private
export const getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({ ownerAdmin: req.admin._id });

    if (!store) {
      return res.status(404).json({ message: "No store found for this admin" });
    }

    res.status(200).json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ message: "Server error while fetching store" });
  }
};
