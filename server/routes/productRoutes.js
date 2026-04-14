// routes/product.js
import express from "express";

const router = express.Router();

// ADD PRODUCT
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  await product.save();

  res.json({ message: "Saved", product });
});

// GET PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

let products = []; // temporary

router.post("/add", (req, res) => {
  const product = req.body;
  products.push(product);

  res.json({ message: "Product saved", product });
});

router.get("/", (req, res) => {
  res.json(products);
});

export default router;