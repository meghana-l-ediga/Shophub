import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // ✅ use data directly
    });

    const result = await res.json();

    console.log(result);

    if (res.ok) {
      alert("Registered Successfully 🎉");

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/home");
    } else {
      alert(result.message || "Something went wrong ❌");
    }

  } catch (err) {
    console.log("Error:", err);
    alert("Server error ❌");
  }
};
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account 👤🆕</h2>

        <input
          name="name"
          placeholder="Full Name"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          style={styles.input}
          onChange={handleChange}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          Register
        </button>

        <p>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
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
    background: "linear-gradient(to right, #7d43e1, #49bde3, #392fa8)",
    fontFamily: "'Poppins', sans-serif"
  },

  card: {
    background: "linear-gradient(to right, #ee86a2, #c0ec7e, #e13eb9)", 
    backdropFilter: "blur(12px)",
    padding: "35px",
    borderRadius: "16px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(205, 150, 150, 0.3)",
    border: "1px solid rgba(232, 112, 206, 0.85)",
    color: "#fff"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(220, 212, 212, 0.15)",
    color: "#fff",
    fontSize: "14px",
    backdropFilter: "blur(5px)"
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #FF6F61, #FF9966)", 
    color: "white",
    border: "none",
    borderRadius: "8px",
    marginTop: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "0.3s ease"
  },

  link: {
    color: "#FFB6B9",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    display: "inline-block"
  } 
};