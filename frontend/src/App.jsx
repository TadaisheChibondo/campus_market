import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

// Import our new modern components
import Layout from "./Layout";
import Home from "./Home";
import Marketplace from "./Marketplace";

// Keep your existing pages
import About from "./About";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import MyListings from "./MyListings";
import RequestsBoard from "./RequestsBoard";

function App() {
  const navigate = useNavigate();

  // --- AUTH LOGIC ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "https://campus-backend-75cs.onrender.com/auth/users/me/",
            { headers: { Authorization: `Token ${token}` } },
          );
          setUser(response.data);
          localStorage.setItem("user_data", JSON.stringify(response.data));
        } catch (error) {
          console.error("Token invalid:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    setUser(null);
    navigate("/");
    window.location.reload();
  };
  // ------------------

  return (
    <Layout user={user} handleLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route path="/browse" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* ✅ UPDATED: Pass setUser to both Login and Register */}
        {/* This allows them to update the app state immediately after success */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-listings" element={<MyListings user={user} />} />
        <Route path="/requests" element={<RequestsBoard user={user} />} />
      </Routes>
    </Layout>
  );
}

export default App;
