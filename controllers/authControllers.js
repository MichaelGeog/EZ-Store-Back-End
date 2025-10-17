import Admin from "../models/admins.js";
import jwt from "jsonwebtoken";

// helper: create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc Register new admin
// @route POST /api/auth/register
export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, businessName } = req.body;

    // check if user exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // create admin
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      businessName,
      password,
    });

    // respond with token
    res.status(201).json({
      _id: admin._id,
      firstName: admin.firstName,
      email: admin.email,
      businessName: admin.businessName,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error("Server error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc Login admin
// @route POST /api/auth/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // send token
    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      email: admin.email,
      businessName: admin.businessName,
      token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get current logged-in admin
// @route GET /api/auth/me
// @access Private
export const getAdminProfile = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      _id: req.admin._id,
      firstName: req.admin.firstName,
      lastName: req.admin.lastName,
      email: req.admin.email,
      businessName: req.admin.businessName,
      createdAt: req.admin.createdAt,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
