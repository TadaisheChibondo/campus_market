import About from "./About";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios"; // <--- Don't forget this!
import ProductDetail from "./ProductDetail";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user info here

  // Check if we are logged in AND fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://campus-backend-75cs.onrender.com";
      axios
        .get(`${API_URL}/api/products/?`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Save the user info (username, email, id)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // If the token is invalid/expired, clear it
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
          {/* The Logo Image */}
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
              {/* The New User Greeting */}
              <span
                style={{
                  marginLeft: "20px",
                  fontWeight: "bold",
                  color: "#4b5563",
                }}
              >
                Hi, {user.username}
              </span>

              <Link to="/add-product" style={{ color: "green" }}>
                + Sell Item
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "20px",
                  padding: "5px 15px",
                  width: "auto",
                  background: "#ef4444",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            /* SHOW IF LOGGED OUT */
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
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

// ... Keep your Home function exactly the same ...
function Home() {
  // ... paste your existing Home code here ...
  // (If you deleted it, let me know and I'll provide it again)
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
      <h1>Campus Marketplace</h1>
      {/* Search Bar */}
      <div className="filters" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Categories</option>
          <option value="GROCERIES">Groceries</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
          <option value="BOOKS">Books</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="placeholder-img">No Image</div>
              )}
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
