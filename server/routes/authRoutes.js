const express = require("express");
const router = express.Router();

// ✅ IMPORT CORRECTLY
const authController = require("../controllers/authController");

// ✅ USE FUNCTIONS CORRECTLY
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, address } = req.body;

    // 🔍 Check missing fields
    if (!name || !phone || !email || !password || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 👉 Dummy save (or Mongo later)
    const user = { name, phone, email, password, address };

    console.log("User Registered:", user);

    res.status(200).json({
      message: "Registered successfully",
      user
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});