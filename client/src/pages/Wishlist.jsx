import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
   <div style={styles.page}>
  <Navbar />

  <h1 style={styles.title}>❤️ Wishlist</h1>

  {wishlist.length === 0 ? (
    <p style={styles.empty}>No items yet 😔</p>
  ) : (
    wishlist.map((item, i) => (
      <div key={i} style={styles.card}>
        <img src={item.image} alt="" style={styles.img} />

        <div style={styles.details}>
          <h3 style={styles.titleText}>{item.title}</h3>
          <p style={styles.price}>₹{item.price}</p>
        </div>

        <button style={styles.btn} onClick={() => removeItem(i)}>
          Remove
        </button>
      </div>
    ))
  )}
</div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(to left, #9f7fd9, #d950d2)",
    minHeight: "100vh",
    paddingBottom: "30px",
    fontFamily: "'Poppins', sans-serif"
  },

  title: {
    textAlign: "center",
    padding: "20px",
    fontWeight: "600",
    color: "#333"
  },

  empty: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
    color: "#777"
  },

  card: {
    background: "#fff",
    margin: "15px auto",
    padding: "15px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    width: "90%",
    maxWidth: "650px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  img: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    borderRadius: "8px",
    background: "#f9f9f9",
    padding: "5px"
  },

  details: {
    flex: 1
  },

  titleText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#222"
  },

  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e53935", // red for wishlist vibe ❤️
    marginTop: "5px"
  },

  btn: {
    padding: "8px 14px",
    background: "linear-gradient(to right, #ff416c, #ff4b2b)", // stylish red gradient
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s"
  }
};