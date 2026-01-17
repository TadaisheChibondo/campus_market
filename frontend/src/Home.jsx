import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MessageCircle, ArrowRight } from "lucide-react";
import axios from "axios";

// Helper Component for the Product Card
const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
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

// Main Home Component
function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url = "https://campus-backend-75cs.onrender.com/api/products/?";
      if (search) url += `search=${search}&`;
      if (category) url += `category=${category}&`;

      try {
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly to avoid too many API calls
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          Buy, Sell, & <span className="text-blue-600">Thrive.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          The exclusive marketplace for students. Find cheap textbooks, dorm
          gear, and snacks—all on campus.
        </p>
      </section>

      {/* SEARCH & FILTER BAR */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for textbooks, noodles, sneakers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div className="relative md:w-48">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
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
      </div>

      {/* PRODUCT GRID */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">
          Loading amazing deals...
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No products found. Be the first to sell this!
          </p>
          <Link
            to="/add-product"
            className="mt-4 inline-block text-blue-600 font-medium hover:underline"
          >
            List an Item &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
