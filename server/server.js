import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import orderRoutes from "./routes/order.js";
//import paymentRoutes from "./routes/payment.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";



// 🔥 CREATE APP FIRST
const app = express();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
//app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// 🔥 ROOT ROUTE
app.get("/", (req, res) => {
  res.send("ShopHub API Running ✅");
});

// 🔥 MONGODB (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shophub")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
console.log("KEY:", process.env.RAZORPAY_KEY_ID);