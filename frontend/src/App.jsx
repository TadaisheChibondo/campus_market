import About from "./About";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import "./App.css";

function App() {
  const navigate = useNavigate();

  // 1. Initialize from Memory so it doesn't flicker "Hi," on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Fetch fresh user data securely on load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "https://campus-backend-75cs.onrender.com/auth/users/me/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          // Success! Update state and save to memory
          setUser(response.data);
          localStorage.setItem("user_data", JSON.stringify(response.data));
          console.log("Logged in as:", response.data.username);
        } catch (error) {
          console.error("Token invalid:", error);
          // If token is bad, clear everything
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []); // Run once on app start

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data"); // Clear memory on logout
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="app-container">
      <nav>
        {/* Left side: Brand */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/logo.png"
            alt="Uni Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}
          >
            CampusMarket
          </span>
        </Link>

        {/* Right side: User Info & Menu */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">Browse</Link>
          <Link to="/about" style={{ marginLeft: "15px" }}>
            About
          </Link>

          {user ? (
            /* SHOW IF LOGGED IN */
            <>
              <span
                style={{
                  marginLeft: "20px",
                  fontWeight: "bold",
                  color: "#4b5563",
                }}
              >
                {/* Fallback: If username is empty, show email or "Friend" */}
                Hi, {user.username || user.email || "Friend"}
              </span>

              <Link
                to="/add-product"
                style={{ color: "green", marginLeft: "15px" }}
              >
                + Sell Item
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "20px",
                  padding: "5px 15px",
                  width: "auto",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            /* SHOW IF LOGGED OUT */
            <>
              <Link to="/login" style={{ marginLeft: "15px" }}>
                Login
              </Link>
              <Link to="/register" style={{ marginLeft: "15px" }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

// Home Component
function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = () => {
    let url = "https://campus-backend-75cs.onrender.com/api/products/?";
    if (search) url += `search=${search}&`;
    if (category) url += `category=${category}&`;

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#1f2937" }}>
        Campus Marketplace
      </h1>

      {/* Search Bar */}
      <div
        className="filters"
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Categories</option>
          <option value="GROCERIES">Groceries</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
          <option value="BOOKS">Books</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {/* Product Grid */}
      <div
        className="product-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: "1px solid #eee",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <div
                  className="placeholder-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  No Image
                </div>
              )}
              <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                ${product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
