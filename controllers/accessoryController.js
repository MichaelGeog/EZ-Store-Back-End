import Accessory from "../models/accessory.js";

// @desc Add a new accessory category
// @route POST /api/accessories
// @access Private
export const addAccessory = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Accessory.findOne({ storeId: req.admin._id, name });
    if (exists)
      return res.status(400).json({ message: "Accessory already exists" });

    const accessory = await Accessory.create({
      storeId: req.admin._id,
      name,
    });

    res.status(201).json(accessory);
  } catch (err) {
    console.error("Error adding accessory:", err);
    res.status(500).json({ message: "Server error while adding accessory" });
  }
};

// @desc Get all accessories for this store
// @route GET /api/accessories
// @access Private
export const getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find({ storeId: req.admin._id });
    res.json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching accessories" });
  }
};

// @desc Update accessory category
export const updateAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.findOneAndUpdate(
      { _id: req.params.id, storeId: req.admin._id },
      req.body,
      { new: true }
    );
    if (!accessory)
      return res.status(404).json({ message: "Accessory not found" });
    res.json(accessory);
  } catch (err) {
    console.error("Update accessory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete accessory
export const deleteAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.findOneAndDelete({
      _id: req.params.id,
      storeId: req.admin._id,
    });
    if (!accessory)
      return res.status(404).json({ message: "Accessory not found" });
    res.json({ message: "Accessory deleted successfully" });
  } catch (err) {
    console.error("Delete accessory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
