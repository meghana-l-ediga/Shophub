import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.message === "Login successful") {
      // ✅ Save user from DB
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ Go to Home
      navigate("/home");
    } else {
      alert("Invalid email or password ❌");
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome Back 👋</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.btn} onClick={handleLogin}>
          Sign In
        </button>

        <p>
          New user?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
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
    background: "linear-gradient(to right, #b420c2, #00c6ff)"
  },
  card: {
    background: "linear-gradient(135deg, #a2d077, #cfd9df)",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(227, 22, 22, 0.2)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#5028f0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer"
  },
  link: {
    color: "#140a9e",
    cursor: "pointer",
    fontWeight: "bold"
  }
};