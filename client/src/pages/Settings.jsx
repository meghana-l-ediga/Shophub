import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";




export default function Settings() {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <div style={{
      background: dark ? "#121212" : "#ffffff",
      color: dark ? "white" : "black",
      minHeight: "100vh"
    }}>
      <Navbar />

      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>⚙️ Settings</h1>

        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
const styles = {
  lightPage: {
    background: "linear-gradient(to left, #9f7fd9, #d950d2)",
    minHeight: "100vh"
  },

  darkPage: {
    background: "#121212",
    color: "#fff",
    minHeight: "100vh"
  },

  card: {
    maxWidth: "400px",
    margin: "50px auto",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
  },

  option: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px"
  },

  btn: {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(to right, #9f7fd9, #d950d2)",
    color: "#fff",
    cursor: "pointer"
  }
};