import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
    
  const { state } = useLocation();
  const product = state;
  const [rating, setRating] = useState(0);
const [reviews, setReviews] = useState([]);
const [text, setText] = useState("");
useEffect(() => {
  if (!product) return;

  const saved = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
  setReviews(saved);
}, [product]);

  if (!product) return <h2>No product found</h2>;
const handlePayment = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  //  Create order from backend
  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: product.price })
  });

  const order = await res.json();

  const options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: "INR",
    order_id: order.id,
    name: "ShopHub",
    description: product.title,

    handler: async function (response) {
      // 🔐 VERIFY PAYMENT
      await fetch("http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...response,
          product,
          user: user.name
        })
      });

      alert("Payment Verified & Order Placed ✅");
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

 const addReview = () => {
  if (!text) return;

  const newReview = {
    text,
    rating,
    date: new Date().toLocaleString()
  };

  const updated = [...reviews, newReview];

  setReviews(updated);
  localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updated));

  setText("");
};
  const addToCart = () => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];

  const already = existing.find(item => item.id === product.id);

  if (already) {
    alert("Already in cart 🛒");
    return;
  }

  const updated = [...existing, product];

  localStorage.setItem("cart", JSON.stringify(updated));
  alert("Added to cart 🛒");
};

  return (
   <div style={styles.page}>
  <Navbar />

  <div style={styles.container}>
    <img src={product.image} style={styles.img} alt="" />

    <div style={styles.details}>
      <h2 style={styles.title}>{product.title}</h2>
      <h3 style={styles.price}>₹{product.price}</h3>
      <p style={styles.seller}>Seller: {product.seller || "Default Store"}</p>

      <div style={styles.btnGroup}>
        <button style={styles.cartBtn} onClick={addToCart}>
          🛒 Add to Cart
        </button>

        <button style={styles.buyBtn} onClick={handlePayment}>
          💳 Buy Now
        </button>
      </div>
    </div>
  </div>

  {/* Reviews Section */}
  <div style={styles.reviewBox}>
    <h3>⭐ Reviews</h3>

    <div style={styles.reviewInput}>
      <input
        placeholder="Write review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />

      <select onChange={(e) => setRating(e.target.value)} style={styles.select}>
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <button onClick={addReview} style={styles.submitBtn}>
        Submit
      </button>
    </div>

    {reviews.map((r, i) => (
      <div key={i} style={styles.reviewCard}>
        <p>⭐ {r.rating}</p>
        <p>{r.text}</p>
        <small>{r.date}</small>
      </div>
    ))}
  </div>
</div>
  );
}   
const styles = {
  page: {
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  img: {
    width: "320px",
    height: "320px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },

  details: {
    maxWidth: "400px"
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#222"
  },

  price: {
    fontSize: "24px",
    color: "#388e3c",
    margin: "10px 0"
  },

  seller: {
    color: "#777",
    marginBottom: "15px"
  },

  btnGroup: {
    display: "flex",
    gap: "15px"
  },

  cartBtn: {
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  buyBtn: {
    background: "linear-gradient(to right, #ff512f, #dd2476)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  reviewBox: {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  reviewInput: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  select: {
    padding: "10px",
    borderRadius: "6px"
  },

  submitBtn: {
    background: "#fb641b",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  reviewCard: {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px"
  }
};