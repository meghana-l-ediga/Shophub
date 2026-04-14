import express from "express";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    product,
    user
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ PAYMENT VERIFIED → SAVE ORDER
    const newOrder = new Order({
      title: product.title,
      price: product.price,
      image: product.image,
      user,
      status: "Processing"
    });

    await newOrder.save();

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_" + Date.now()
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
});

export default router;