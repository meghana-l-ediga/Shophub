import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Sell() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  return <h2 style={{ textAlign: "center" }}>Please login to sell products</h2>;
}

  // Convert image to base64
  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); 
    };

    if (file) reader.readAsDataURL(file);
  };

const handleSell = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login required!");
    return;
  }

  const newProduct = {
      id: Date.now(),
      title,
      price,
      image,
      seller: user.name
    };

    const existing = JSON.parse(localStorage.getItem("customProducts")) || [];
    const updated = [...existing, newProduct];

    localStorage.setItem("customProducts", JSON.stringify(updated));

    alert("Product added 🎉");

    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <div>
      <Navbar />
      <h1>📸 Sell Product</h1>

      <input placeholder="Name" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} />

      <input type="file" onChange={handleImage} />

      {image && <img src={image} width="100" alt="preview" />}

      <button onClick={handleSell}>Upload</button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "auto",
    marginTop: "50px"
  }
};