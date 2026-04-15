import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem("wishlist")) || []

);
const navigate = useNavigate();


const user = JSON.parse(localStorage.getItem("user"));
const artisanCategories = [
  "Handmade Jewellery",
  "Pottery",
  "Handicrafts",
  "Handloom",
  "Paintings",
  "Wooden Artifacts",
  "Sculptures",
  "Traditional Clothing"
];

const artisanImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1589128777073-263566ae5e4d",
  "https://images.unsplash.com/photo-1582582429416-5c5fbe7b5c9e",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
  "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  "https://images.unsplash.com/photo-1600585154341-be6161a56a0c",
  "https://images.unsplash.com/photo-1589128777072-263566ae5e4d",
  "https://images.unsplash.com/photo-1582582429417-5c5fbe7b5c9e",
  "https://images.unsplash.com/photo-1618354691374-d851c5c3a990",
  "https://images.unsplash.com/photo-1504198458648-3128b932f49b",
  "https://images.unsplash.com/photo-1522335789204-aabd1fc54bc9"
];

const artisanNames = [
  "Necklace",
  "Clay Pot",
  "Wall Art",
  "Saree",
  "Painting",
  "Wood Craft",
  "Bracelet",
  "Decor Item"
];

const generateProducts = () => {
  let data = [];

  for (let i = 1; i <= 200; i++) {
    data.push({
      id: i,
      title: `Handmade ${artisanNames[i % artisanNames.length]} ${i}`,
      price: Math.floor(Math.random() * 2000) + 200,
      image: artisanImages[i % artisanImages.length],
      category: artisanCategories[i % artisanCategories.length],
      seller: "Artisan " + (i % 10 + 1)
    });
  }

  return data;
};
// Fetch Products
useEffect(() => {
  const getProducts = async () => {
    try {
      // 🔥 fetch dummyjson
      const res1 = await fetch("https://dummyjson.com/products?limit=50");
      const data1 = await res1.json();

      // 🔥 fetch escuela
      const res2 = await fetch("https://api.escuelajs.co/api/v1/products");
      const data2 = await res2.json();

      console.log("API1:", data1);
      console.log("API2:", data2);

      const generalCategories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty"
];

const dummy = data1.products.map((p, i) => ({
  id: p.id + 1000,
  title: p.title,
  price: p.price,
  image: p.thumbnail || "https://via.placeholder.com/150",
  category: "Electronics",
  seller: "Store"
}));

const escuela = data2.map((p, i) => ({
  id: p.id + 2000,
  title: p.title,
  price: p.price,
  image: p.images?.[0] || "https://via.placeholder.com/150",
  category: "Fashion",
  seller: "Store"
}));

     const handmadeProducts = generateProducts();
      const custom = JSON.parse(localStorage.getItem("customProducts")) || [];

      const finalData = [
        ...dummy,
        ...escuela,
        ...handmadeProducts,
        ...custom
      ];

      setProducts(finalData);
      setAllProducts(finalData);

    } catch (err) {
      console.log("ERROR:", err);

      // fallback if API fails
      const handmadeProducts = generateProducts();
      const custom = JSON.parse(localStorage.getItem("customProducts")) || [];

      setProducts([...handmadeProducts, ...custom]);
      setAllProducts([...handmadeProducts, ...custom]);
    }
  };

  getProducts(); // ✅ OUTSIDE catch
}, []);

  // Search
  const handleSearch = () => {
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filtered);
    setSuggestions([]);
  };

  // Category Filter
  const handleCategory = (cat) => {
    setCategory(cat);

    if (cat === "All") {
  setProducts(allProducts); // we will fix below
} else {
  const filtered = allProducts.filter(p => p.category === cat);
  setProducts(filtered);
}
  };

  const categories = [
    "All",
    "Handmade Jewellery",
    "Handloom",
    "Pottery",
    "Handicrafts",
    "Paintings",
    "ClayPottery",
    "Wooden Artifacts",
    "Sculptures",
    "Traditional Clothing", 
    "General",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty"
  ];

  const handleInputChange = (e) => {
  const value = e.target.value;
  setSearch(value);

  if (value.length > 1) {
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // show top 5
  } else {
    setSuggestions([]);
  }
};

//cart
const addToCart = (product) => {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];

  const already = existing.find(item => item.id === product.id);

  if (already) {
    alert("Already in cart 🛒");
    return;
  }

  const updated = [...existing, product];
  localStorage.setItem("cart", JSON.stringify(updated));
  alert("Added to cart 🛒");
};

//wishlist
const addToWishlist = (product) => {
  let updated;

  const exists = wishlist.find(item => item.id === product.id);

  if (exists) {
    // remove
    updated = wishlist.filter(item => item.id !== product.id);
  } else {
    // add
    updated = [...wishlist, product];
  }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  
  const deleteProduct = (id) => {
  const products = JSON.parse(localStorage.getItem("customProducts")) || [];

  const updated = products.filter(p => p.id !== id);

  localStorage.setItem("customProducts", JSON.stringify(updated));
  window.location.reload();
};

const editProduct = (product) => {
  const newTitle = prompt("Enter new title", product.title);
  const newPrice = prompt("Enter new price", product.price);

  const products = JSON.parse(localStorage.getItem("customProducts")) || [];

  const updated = products.map(p =>
    p.id === product.id
      ? { ...p, title: newTitle, price: newPrice }
      : p
  );

  localStorage.setItem("customProducts", JSON.stringify(updated));
  window.location.reload();
};

const uploadProduct = async (title, price, image) => {
  //  Check login
  if (!user) {
    alert("Please login first");
    return;
  }

  // Validate fields
  if (!title || !price || !image) {
    alert("Fill all fields");
    return;
  }

  //  Create product
  const newProduct = {
    title,
    price,
    image,
    seller: user.name
  };

  try {
    // SEND TO BACKEND
    await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    alert("Product uploaded successfully 🎉");
  } catch (err) {
    console.log(err);
    alert("Error uploading product");
  }

  await fetch(`http://localhost:5000/api/orders/update/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Shipped" })
  });
};
console.log("TOTAL PRODUCTS:", products.length);

  return (
    <div style={styles.container}>
      <Navbar />
      


      <div style={styles.header}>
        <h2>🛍️ Explore Products</h2>
      </div>

      {/*  Search */}
      <div style={styles.searchBox}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      {suggestions.length > 0 && (
  <div style={styles.suggestionBox}>
    {suggestions.map((item) => (
      <div
        key={item.id}
        onClick={() => {
          setSearch(item.title);
          setSuggestions([]);
        }}
      >
        {item.title}
      </div>
    ))}
  </div>
)}
      </div>

      {/*  Categories */}
      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            style={styles.catBtn}
          >
            {cat}
          </button>
        ))}
      </div>
      

 

  {/*  Products */}
<div style={styles.grid}>
  {products.length === 0 ? (
    <p>No products found</p>
  ) : (
    products.map((p) => (
      <div
        key={p.id}
        style={styles.card}
        onClick={() => navigate("/product", { state: p })}
      >
        <img src={p.image} alt="" style={styles.img} />
        <h3>{p.title}</h3>
        <p>₹{p.price}</p>

        <button onClick={(e) => {
          e.stopPropagation(); 
          addToCart(p);
        }}>
          🛒 Add to Cart
        </button>

        <button onClick={(e) => {
          e.stopPropagation();
          addToWishlist(p);
        }}>
          {wishlist.find(item => item.id === p.id) ? "❤️" : "🤍"}
        </button>

        {p.seller === user?.name && (
          <>
           
          </>
        )}
      </div>
    ))
  )}
</div>
    </div>
  );
}


const styles = {
  container: {
    background: "linear-gradient(to left, #9f7fd9, #d950d2)", 
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif"
  },

  header: {
    textAlign: "center",
    padding: "25px",
    color: "#fff",
    fontSize: "26px",
    fontWeight: "600",
    letterSpacing: "1px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "20px"
  },

  input: {
    padding: "12px",
    width: "280px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  searchBtn: {
    background: "linear-gradient(to right, #db4c28, #cd1539)",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(255,126,95,0.5)"
  },

  categories: {
    textAlign: "center",
    background: "linear-gradient(to right, #d712bd,#ae2ac8)",
    padding: "15px",
    borderRadius: "50px",
    margin: "0 20px 30px",
    boxShadow: "0 4px 12px rgba(255,153,102,0.5)",
    color: "#ddd",
    fontSize: "15px"
  },
  catBtn: {
    background: "linear-gradient(to right, #db2846, #e3440f)",
    color: "white",
    padding: "8px 14px",
    border: "1px solid rgba(255,126,95,0.5)",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(255,126,95,0.5)"
     
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
    gap: "25px",
    padding: "25px"
  },

  card: {
    background: "rgba(255,255,255,0.08)", 
    backdropFilter: "blur(12px)",
    padding: "15px",
    borderRadius: "16px",
    textAlign: "center",
    transition: "0.3s ease",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#fff"
  },

  img: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    borderRadius: "10px",
    background: "#fff",
    padding: "10px",
    marginBottom: "10px"
  },

  addBtn: {
    background: "linear-gradient(to right, #ff003c, #ffa200)",
    color: "white",
    border: "none",
    padding: "8px 14px",
    margin: "5px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.3s"
  },

  buyBtn: {
    background: "linear-gradient(to right, #ff512f, #dd2476)",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.3s"
  }
};
