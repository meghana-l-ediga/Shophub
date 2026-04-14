import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 📦 Save Order
router.post("/add", async (req, res) => {
  const order = new Order(req.body);
  await order.save();

  res.json({ message: "Order saved", order });
});

// 📦 Get Orders
router.get("/:user", async (req, res) => {
  const orders = await Order.find({ user: req.params.user });
  res.json(orders);
});

// 🔄 Update Status
router.put("/update/:id", async (req, res) => {
  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

export default router;