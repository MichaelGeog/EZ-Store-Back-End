import SellingDevice from "../models/sellingDevice.js";
import Device from "../models/device.js";

// @desc Add a new selling device (individual unit)
// @route POST /api/selling-devices
// @access Private
export const addSellingDevice = async (req, res) => {
  try {
    const { deviceId, imei, price } = req.body;

    // check device exists
    const device = await Device.findById(deviceId);
    if (!device) return res.status(404).json({ message: "Device not found" });

    // create selling device
    const sellingDevice = await SellingDevice.create({
      storeId: req.admin._id,
      deviceId,
      imei,
      price,
    });

    res.status(201).json(sellingDevice);
  } catch (err) {
    console.error("Error adding selling device:", err);
    res
      .status(500)
      .json({ message: "Server error while adding selling device" });
  }
};

// @desc Get all selling devices (optionally filter by deviceId)
// @route GET /api/selling-devices
// @access Private
export const getSellingDevices = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const query = { storeId: req.admin._id };
    if (deviceId) query.deviceId = deviceId;

    const sellingDevices = await SellingDevice.find(query).populate(
      "deviceId",
      "brand model"
    );
    res.json(sellingDevices);
  } catch (err) {
    console.error("Error fetching selling devices:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching selling devices" });
  }
};

// @desc Update selling device (e.g., price or status)
// @route PUT /api/selling-devices/:id
export const updateSellingDevice = async (req, res) => {
  try {
    const sellingDevice = await SellingDevice.findOneAndUpdate(
      { _id: req.params.id, storeId: req.admin._id },
      req.body,
      { new: true }
    );
    if (!sellingDevice)
      return res.status(404).json({ message: "Selling device not found" });
    res.json(sellingDevice);
  } catch (err) {
    console.error("Update selling device error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete selling device
// @route DELETE /api/selling-devices/:id
export const deleteSellingDevice = async (req, res) => {
  try {
    const sellingDevice = await SellingDevice.findOneAndDelete({
      _id: req.params.id,
      storeId: req.admin._id,
    });
    if (!sellingDevice)
      return res.status(404).json({ message: "Selling device not found" });
    res.json({ message: "Selling device deleted successfully" });
  } catch (err) {
    console.error("Delete selling device error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
