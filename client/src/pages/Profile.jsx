// pages/Profile.jsx
import Navbar from "../components/Navbar";


export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div style={styles.page}>
  <Navbar />

  <h1 style={styles.title}>👤 My Profile</h1>

  {user ? (
    <div style={styles.card}>
      
      {/* Avatar */}
      <div style={styles.avatar}>
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <h2 style={styles.name}>{user.name}</h2>

      <div style={styles.info}>
        <p><span>📞</span> {user.phone}</p>
        <p><span>📧</span> {user.email}</p>
        <p><span>🏠</span> {user.address}</p>
      </div>

    </div>
  ) : (
    <p style={styles.empty}>Please log in to view your profile 😔</p>
  )}
</div>
   
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to left, #9f7fd9, #d950d2)", // premium bg
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    fontFamily: "'Poppins', sans-serif"
  },

  title: {
    color: "#fff",
    marginBottom: "20px",
    fontWeight: "600"
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "18px",
    width: "90%",
    maxWidth: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff"
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto 15px",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(255,126,95,0.5)"
  },

  name: {
    marginBottom: "15px",
    fontSize: "20px"
  },

  info: {
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "1.8"
  },

  empty: {
    color: "#ddd",
    marginTop: "30px"
  }
};