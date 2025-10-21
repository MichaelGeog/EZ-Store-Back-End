import AccessoryProduct from "../models/accessoryProduct.js";
import Accessory from "../models/accessory.js";

// @desc Add a new accessory product under a category
// @route POST /api/accessory-products
// @access Private
export const addAccessoryProduct = async (req, res) => {
  try {
    const { accessoryId, name, price, quantity } = req.body;

    const accessory = await Accessory.findById(accessoryId);
    if (!accessory)
      return res.status(404).json({ message: "Accessory not found" });

    const product = await AccessoryProduct.create({
      storeId: req.admin._id,
      accessoryId,
      name,
      price,
      quantity,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding accessory product:", err);
    res
      .status(500)
      .json({ message: "Server error while adding accessory product" });
  }
};

// @desc Get all products (optionally by accessoryId)
// @route GET /api/accessory-products
// @access Private
export const getAccessoryProducts = async (req, res) => {
  try {
    const { accessoryId } = req.query;
    const query = { storeId: req.admin._id };
    if (accessoryId) query.accessoryId = accessoryId;

    const products = await AccessoryProduct.find(query).populate(
      "accessoryId",
      "name"
    );
    res.json(products);
  } catch (err) {
    console.error("Error fetching accessory products:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching accessory products" });
  }
};

// @desc Update accessory product
export const updateAccessoryProduct = async (req, res) => {
  try {
    const product = await AccessoryProduct.findOneAndUpdate(
      { _id: req.params.id, storeId: req.admin._id },
      req.body,
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Accessory product not found" });
    res.json(product);
  } catch (err) {
    console.error("Update accessory product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete accessory product
export const deleteAccessoryProduct = async (req, res) => {
  try {
    const product = await AccessoryProduct.findOneAndDelete({
      _id: req.params.id,
      storeId: req.admin._id,
    });
    if (!product)
      return res.status(404).json({ message: "Accessory product not found" });
    res.json({ message: "Accessory product deleted successfully" });
  } catch (err) {
    console.error("Delete accessory product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
