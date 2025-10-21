import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    ownerAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true, // one store per admin for now
    },
    storeName: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    settings: {
      currency: { type: String, default: "USD" },
      taxRate: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
