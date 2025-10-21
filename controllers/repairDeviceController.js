import RepairDevice from "../models/repairDevice.js";
import Device from "../models/device.js";

// @desc Add a repairable device entry with issues
// @route POST /api/repair-devices
// @access Private
export const addRepairDevice = async (req, res) => {
  try {
    const { deviceId, issues } = req.body; // issues: [{ name, price }]

    const device = await Device.findById(deviceId);
    if (!device) return res.status(404).json({ message: "Device not found" });

    const repairDevice = await RepairDevice.create({
      storeId: req.admin._id,
      deviceId,
      issues,
    });

    res.status(201).json(repairDevice);
  } catch (err) {
    console.error("Error adding repair device:", err);
    res
      .status(500)
      .json({ message: "Server error while adding repair device" });
  }
};

// @desc Get all repair devices (optionally by deviceId)
// @route GET /api/repair-devices
// @access Private
export const getRepairDevices = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const query = { storeId: req.admin._id };
    if (deviceId) query.deviceId = deviceId;

    const repairDevices = await RepairDevice.find(query).populate(
      "deviceId",
      "brand model"
    );
    res.json(repairDevices);
  } catch (err) {
    console.error("Error fetching repair devices:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching repair devices" });
  }
};
