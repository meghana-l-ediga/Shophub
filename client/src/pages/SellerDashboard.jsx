import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function SellerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // 📦 Get seller products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const myProducts = data.filter(p => p.seller === user.name);
        setProducts(myProducts);
      });

    // 💰 Get orders
    fetch(`http://localhost:5000/api/orders/${user.name}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const total = orders.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={styles.page}>
  <Navbar />

  <h1 style={styles.title}>📊 Seller Dashboard</h1>

  {/* Earnings Card */}
  <div style={styles.earningsBox}>
    <h2>💰 Total Earnings</h2>
    <h1 style={styles.amount}>₹{total}</h1>
  </div>

  {/* Products */}
  <h2 style={styles.section}>🛍️ My Products</h2>
  <div style={styles.grid}>
    {products.map(p => (
      <div key={p._id} style={styles.productCard}>
        <img src={p.image} style={styles.productImg} alt="" />
        <h3>{p.title}</h3>
        <p style={styles.price}>₹{p.price}</p>
      </div>
    ))}
  </div>

  {/* Orders */}
  <h2 style={styles.section}>📦 Orders</h2>
  <div style={styles.orderList}>
    {orders.map(o => (
      <div key={o._id} style={styles.orderCard}>
        <img src={o.image} style={styles.orderImg} alt="" />

        <div style={{ flex: 1 }}>
          <h3>{o.title}</h3>
          <p style={styles.price}>₹{o.price}</p>
          <button onClick={() => navigate("/sell")} style={styles.sellBtn}>
  ➕ Add Product
</button>

          <span
            style={
              o.status === "Delivered"
                ? styles.delivered
                : o.status === "Shipped"
                ? styles.shipped
                : styles.processing
            }
          >
            {o.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
    
  );
}

const styles = {
  page: {
    background: "linear-gradient(to right, #9f7fd9, #d950d2)",
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

  earningsBox: {
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    margin: "20px auto",
    padding: "25px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },

  amount: {
    fontSize: "32px",
    marginTop: "10px"
  },

  section: {
    margin: "20px",
    color: "#444"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "0 20px"
  },

  productCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  productImg: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px"
  },

  orderList: {
    padding: "0 20px"
  },

  orderCard: {
    display: "flex",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  orderImg: {
    width: "70px",
    height: "70px",
    objectFit: "contain"
  },

  price: {
    fontWeight: "bold",
    color: "#388e3c"
  },

  processing: {
    background: "#fff3cd",
    color: "#856404",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  shipped: {
    background: "#d1ecf1",
    color: "#0c5460",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  delivered: {
    background: "#d4edda",
    color: "#155724",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  sellBtn: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};