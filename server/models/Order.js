import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  user: String,
  status: {
    type: String,
    default: "Processing"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);