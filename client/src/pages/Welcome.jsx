import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <h1 style={styles.loaderText}>🛍️ ShopHub</h1>
        <div style={styles.loader}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Glow background */}
      <div style={styles.glow}></div>

      {/* Floating emojis */}
      <div style={styles.floatingIcons}>
        <span>🛒</span>
        <span>👗</span>
        <span>💄</span>
        <span>📱</span>
        <span>🎧</span>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
          alt="logo"
          style={styles.logo}
        />

        <h1 style={styles.title}> Welcome to ShopHub🛍️</h1>
        <p style={styles.tagline}>Shop. Sell. Repeat. 🚀</p>

        <div style={styles.buttons}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    position: "relative",
    overflow: "hidden"
  },

  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "20%",
    left: "30%"
  },

floatingIcons: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontSize: "32px",
  opacity: 0.15,
  pointerEvents: "none", 
  zIndex: 0,
  animation: "floatIcons 15s ease-in-out infinite"
},

card: {
    background: "linear-gradient(to right, #7d43e1, #481fdf, #7114c7)",
    backdropFilter: "blur(15px)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    width: "350px",
    color: "white",
    boxShadow: "0 10px 40px rgba(233, 51, 51, 0.4)"
  },

  logo: {
    width: "80px",
    marginBottom: "10px",
    animation: "float 3s ease-in-out infinite"
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px"
  },

  tagline: {
    opacity: 0.8,
    marginBottom: "20px"
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  loginBtn: {
    padding: "12px",
    background: "#18d23d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  registerBtn: {
    padding: "12px",
    background: "linear-gradient(90deg, #ff9f00, #fb641b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  loaderContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#210876",
    color: "white"
  },

  loaderText: {
    marginBottom: "20px"
  },

  loader: {
    width: "40px",
    height: "40px",
    border: "5px solid white",
    borderTop: "5px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};