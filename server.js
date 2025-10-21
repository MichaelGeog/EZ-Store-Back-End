import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import sellingDeviceRoutes from "./routes/sellingDeviceRoutes.js";
import repairDeviceRoutes from "./routes/repairDeviceRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/selling-devices", sellingDeviceRoutes);
app.use("/api/repair-devices", repairDeviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
