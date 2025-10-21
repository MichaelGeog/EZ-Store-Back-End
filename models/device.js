import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["selling", "repair"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Device", deviceSchema);
