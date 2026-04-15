import { useState } from "react";
import Navbar from "../components/Navbar";


  export default function SellProduct() {
  const [data, setData] = useState({});
  const [preview, setPreview] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    if (name === "image") {
      setPreview(value); // 🔥 live preview
    }
  };

  const handleSubmit = async () => {
    if (!data.title || !data.price) {
      alert("Please fill all required fields ❌");
      return;
    }

    const product = {
      ...data,
      seller: user?.name || "Unknown"
    };

    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      alert("Product Added Successfully ✅");
      setData({});
      setPreview("");
    } catch (err) {
      alert("Error uploading product ❌");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.card}>
        <h2 style={styles.title}>📦 Sell Your Product</h2>

        {/* Image Preview */}
        {preview && (
          <img src={preview} alt="preview" style={styles.preview} />
        )}

        <input
          name="title"
          placeholder=" Handmade Product Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="price"
          placeholder="Price ₹"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          🚀 Upload Product
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
     background: "linear-gradient(to right, #9f7fd9, #d950d2)",
    paddingTop: "20px"
  },

  card: {
    maxWidth: "420px",
    margin: "40px auto",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    color: "white"
  },

  title: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white"
  },

  preview: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px"
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(90deg, #ff9f00, #fb641b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
};