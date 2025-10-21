import mongoose from "mongoose";

const accessoryProductSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    accessoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accessory",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("AccessoryProduct", accessoryProductSchema);
