import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar() {
  const navigate = useNavigate();
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const [cartCount, setCartCount] = useState(0);
useEffect(() => {
  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  updateCart();

  window.addEventListener("storage", updateCart);

  return () => window.removeEventListener("storage", updateCart);
}, []);


  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo} onClick={() => navigate("/home")}>
  🛍️ ShopHub
</h2>

      {/* Right side */}
      <div style={styles.right}>
        {/* User Name */}
        <span style={styles.user}>
          👋 {user ? user.name : "Guest"}
        </span>

        {/* Links */}
        <Link to="/home" style={styles.link}>🏠</Link>
        <Link to="/cart" style={styles.link}> 🛒 {cartCount}</Link>
        <Link to="/wishlist" style={styles.link}>❤️</Link>
        <Link to="/profile" style={styles.link}>👤</Link>
        <Link to="/orders" style={styles.link}>📦Orders</Link>
        <Link to="/dashboard" style={styles.link}>📊Dashboard</Link>
        <Link to="/settings" style={styles.link}>⚙️Settings</Link>
        <Link to="/sell" style={styles.link}> 📦Sell</Link>

{/* Logout Button (only if logged in) */}
 {user ? (
  <button style={styles.logout} onClick={handleLogout}>
    Logout
  </button>
) : (
  <>
    <button style={styles.login} onClick={() => navigate("/login")}>
      Login
    </button>

   
  </>
)}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #7758f4, #ea84cf)",
    padding: "12px 20px",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  logo: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    transition: "0.2s"
  },

  user: {
    fontWeight: "500"
  },

  login: {
    background: "#fff",
    color: "#1e3c72",
    border: "none",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500"
  },

  logout: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500"
  }
};