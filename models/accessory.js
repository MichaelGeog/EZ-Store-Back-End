import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: { type: String, required: true, trim: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Accessory", accessorySchema);
