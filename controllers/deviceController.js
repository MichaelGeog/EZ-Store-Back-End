import Device from "../models/device.js";

// Create new device (for either selling or repair type)
// Create new device (for either selling or repair type)
export const createDevice = async (req, res) => {
  try {
    let { brand, model, type } = req.body;

    brand = brand.trim().toLowerCase();
    model = model.trim().toLowerCase();

    // Check if a device with the same normalized values already exists
    const existing = await Device.findOne({
      storeId: req.admin._id,
      brand,
      model,
      type,
    });

    if (existing) {
      return res.status(400).json({ message: "Device already exists" });
    }

    // Save with normalized lowercase brand/model for consistency
    const device = await Device.create({
      storeId: req.admin._id,
      brand,
      model,
      type,
    });

    res.status(201).json(device);
  } catch (err) {
    console.error("Create device error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all devices for this store
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ storeId: req.admin._id });
    res.json(devices);
  } catch (err) {
    console.error("Get devices error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update a device
// @route PUT /api/devices/:id
// @access Private
export const updateDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndUpdate(
      { _id: req.params.id, storeId: req.admin._id },
      req.body,
      { new: true }
    );
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.json(device);
  } catch (err) {
    console.error("Update device error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a device
// @route DELETE /api/devices/:id
// @access Private
export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
      storeId: req.admin._id,
    });
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.json({ message: "Device deleted successfully" });
  } catch (err) {
    console.error("Delete device error:", err);
    res.status(500).json({ message: "Server error" });
  }
};