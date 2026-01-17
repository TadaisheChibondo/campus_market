import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import axios from "axios";

// Reusing the same card style
const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <Link to={`/product/${product.id}`} className="block relative">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-slate-50">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
          ${product.price}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {product.category || "General"}
        </p>
      </div>
    </Link>
  </div>
);

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // We are going back to the full URL because it's reliable
      let url = "https://campus-backend-75cs.onrender.com/api/products/?";
      if (search) url += `search=${search}&`;
      if (category) url += `category=${category}&`;

      try {
        const res = await axios.get(url);

        // 🔍 DEBUG: See exactly what the backend sends in the console
        console.log("API Response:", res.data);

        // ✅ SAFETY CHECK: Handle both Array and Django Pagination
        if (Array.isArray(res.data)) {
          // Case A: It's a simple list [ {...}, {...} ]
          setProducts(res.data);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          // Case B: It's a paginated object { count: 10, results: [...] }
          setProducts(res.data.results);
        } else {
          // Case C: Unexpected format (prevent crash)
          console.error(
            "Unexpected API format. Expected array or results key.",
            res.data,
          );
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to prevent spamming the API
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-500 mt-2">
          Find the best deals on campus today.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        <div className="relative md:w-64">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="GROCERIES">Groceries</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="CLOTHING">Clothing</option>
            <option value="BOOKS">Books</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No products found.</p>
          <Link
            to="/add-product"
            className="mt-2 inline-block text-blue-600 font-medium"
          >
            Sell something &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

export default Marketplace;
