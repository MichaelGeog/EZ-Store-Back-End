import mongoose from "mongoose";

const sellingDeviceSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    imei: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["in-stock", "sold"], default: "in-stock" },
  },
  { timestamps: true }
);

export default mongoose.model("SellingDevice", sellingDeviceSchema);
