import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
   <div style={styles.page}>
  <Navbar />

  <h1 style={styles.title}>🛒 Your Cart</h1>

  {cart.length === 0 ? (
    <p style={styles.empty}>Your cart is empty 😔</p>
  ) : (
    <>
      {cart.map((item, i) => (
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
      ))}

      <div style={styles.totalBox}>
        <h2 style={styles.totalText}>Total: ₹{total}</h2>
      </div>
    </>
  )}
</div>
  );
}

const styles = {
  page: {
    background:"linear-gradient(to left, #9f7fd9, #d950d2)",
    minHeight: "100vh",
    paddingBottom: "30px"
  },

  title: {
    textAlign: "center",
    padding: "20px",
    fontWeight: "600",
    color: "#333"
  },

  card: {
    background: "#fff",
    margin: "15px auto",
    padding: "15px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    width: "90%",
    maxWidth: "700px",
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
    color: "#388e3c",
    marginTop: "5px"
  },

  btn: {
    padding: "8px 14px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s"
  },

  totalBox: {
    margin: "20px auto",
    width: "90%",
    maxWidth: "700px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  totalText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#000"
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#777"
  }
  
};