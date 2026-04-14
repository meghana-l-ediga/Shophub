import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const styles = {
    page: {
      background: "linear-gradient(to right, #9f7fd9, #d950d2)", // light gradient
      minHeight: "100vh",
      paddingBottom: "30px"
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
      display: "flex",
      gap: "20px",
      padding: "15px",
      margin: "15px auto",
      width: "90%",
      maxWidth: "700px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(149, 20, 20, 0.1)",
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

    product: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#222"
    },

    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#388e3c",
      margin: "5px 0"
    },

    statusBox: {
      marginTop: "5px",
      marginBottom: "5px"
    },

    processing: {
      background: "#fff3cd",
      color: "#be1335",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "13px"
    },

    shipped: {
      background: "#d1ecf1",
      color: "#0c5460",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "13px"
    },

    out: {
      background: "#ffe0b2",
      color: "#e65100",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "13px"
    },

    delivered: {
      background: "#d4edda",
      color: "#155724",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "13px"
    },

    date: {
      fontSize: "13px",
      color: "#777"
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${user.name}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
  <div style={styles.page}>
    <Navbar />

    <h1 style={styles.title}>📦 Order Tracking</h1>

    {orders.length === 0 ? (
      <p style={styles.empty}>No orders yet 😔</p>
    ) : (
      orders.map((item) => (
        <div key={item._id} style={styles.card}>
          
          <img src={item.image} style={styles.img} alt="" />

          <div style={styles.details}>
            <h3 style={styles.product}>{item.title}</h3>
            <p style={styles.price}>₹{item.price}</p>

            {/* Status Badge */}
            <div style={styles.statusBox}>
              {item.status === "Processing" && <span style={styles.processing}>🟡 Processing</span>}
              {item.status === "Shipped" && <span style={styles.shipped}>🚚 Shipped</span>}
              {item.status === "Out for Delivery" && <span style={styles.out}>📦 Out for Delivery</span>}
              {item.status === "Delivered" && <span style={styles.delivered}>✅ Delivered</span>}
            </div>

            <p style={styles.date}>
              🕒 {new Date(item.date).toLocaleString()}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
  );
}