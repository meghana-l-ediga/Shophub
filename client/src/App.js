import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Sell from "./pages/Sell";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetails from "./pages/ProductDetails";


function App() {
  const isLoggedIn = localStorage.getItem("user");

  useEffect(() => {
  const theme = JSON.parse(localStorage.getItem("theme"));
  document.body.style.background = theme ? "#121212" : "#ffffff";
}, []);

  return (
    <BrowserRouter>
      <Routes>
        {/*  Auto redirect */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Welcome />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/home" element={<Home />} />
        {/*  Protected routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist /> : <Navigate to="/" />}
        />
        <Route
          path="/sell"
          element={isLoggedIn ? <Sell /> : <Navigate to="/" />}
        />
        <Route
          path="/categories"
          element={isLoggedIn ? <Categories /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/" />}
        />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;