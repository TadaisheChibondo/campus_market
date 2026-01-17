import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Filter, ShoppingBag, Wrench, ArrowRight } from "lucide-react";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTERS
  const [listingType, setListingType] = useState("PRODUCT"); // 'PRODUCT' or 'SERVICE'
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Categories for each type
  const PRODUCT_CATEGORIES = [
    { id: "GROCERIES", label: "Groceries" },
    { id: "ELECTRONICS", label: "Electronics" },
    { id: "CLOTHING", label: "Clothing" },
    { id: "BOOKS", label: "Textbooks" },
    { id: "OTHER", label: "Other Items" },
  ];

  const SERVICE_CATEGORIES = [
    { id: "RIDE", label: "Ride / Transport" },
    { id: "TUTORING", label: "Tutoring" },
    { id: "BEAUTY", label: "Hair & Beauty" },
    { id: "TECH_SUPPORT", label: "Tech Support" },
    { id: "LABOR", label: "Manual Labor" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // We fetch ALL products, then filter in frontend for smoother experience
      // (For larger apps, you'd filter on backend: /api/products/?listing_type=SERVICE)
      let url = "https://campus-backend-75cs.onrender.com/api/products/?";
      if (search) url += `search=${search}&`;
      if (category) url += `category=${category}&`;

      try {
        const res = await axios.get(url);

        // Handle both Array and Pagination format
        const allItems = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        // CLIENT-SIDE FILTERING BY TYPE
        // We only show items that match the current tab (Product vs Service)
        const filteredItems = allItems.filter(
          (item) =>
            // If item has no listing_type (old data), assume it's a PRODUCT
            (item.listing_type || "PRODUCT") === listingType,
        );

        setProducts(filteredItems);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, category, listingType]); // Re-run when tab changes!

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header / Sidebar Toggle would go here */}

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 gap-8">
        {/* LEFT SIDEBAR - FILTERS */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Marketplace
            </h1>
            <p className="text-gray-500 text-sm">
              Find the best deals on campus today.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
              <Filter size={18} /> Categories
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setCategory("")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === ""
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Categories
              </button>

              {/* Dynamic Category List based on Active Tab */}
              {(listingType === "PRODUCT"
                ? PRODUCT_CATEGORIES
                : SERVICE_CATEGORIES
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT GRID */}
        <main className="flex-1">
          {/* TABS (The Switcher) */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => {
                setListingType("PRODUCT");
                setCategory("");
              }}
              className={`pb-4 px-2 font-bold text-lg flex items-center gap-2 transition-all border-b-2 ${
                listingType === "PRODUCT"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <ShoppingBag size={20} /> Buy Items
            </button>
            <button
              onClick={() => {
                setListingType("SERVICE");
                setCategory("");
              }}
              className={`pb-4 px-2 font-bold text-lg flex items-center gap-2 transition-all border-b-2 ${
                listingType === "SERVICE"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Wrench size={20} /> Find Services
            </button>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              Loading marketplace...
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          No Image
                        </div>
                      )}

                      {/* Price Tag (Color changes by type) */}
                      <div
                        className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ${
                          product.listing_type === "SERVICE"
                            ? "bg-purple-600"
                            : "bg-blue-600"
                        }`}
                      >
                        ${product.price}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 truncate group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                        <span className="text-xs font-medium text-gray-500">
                          @{product.seller_username || "student"}
                        </span>
                        <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          View <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 mb-6">
                {listingType === "PRODUCT"
                  ? "We couldn't find any items matching your search."
                  : "No services found in this category yet."}
              </p>
              <Link
                to="/add-product"
                className="text-blue-600 font-semibold hover:underline"
              >
                {listingType === "PRODUCT"
                  ? "Sell something →"
                  : "Offer a service →"}
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Marketplace;
