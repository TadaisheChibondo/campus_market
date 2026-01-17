import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Trash2,
  PlusCircle,
  AlertCircle,
  Eye,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const MyListings = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [deleteId, setDeleteId] = useState(null); // ID of item to delete (null = modal closed)
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for the delete action

  // Fetch only my products
  useEffect(() => {
    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(
        "https://campus-backend-75cs.onrender.com/api/products/",
      );
      const allProducts = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];
      const myItems = allProducts.filter(
        (product) => product.seller_username === user.username,
      );
      setProducts(myItems);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Open Modal
  const promptDelete = (id) => {
    setDeleteId(id);
  };

  // 2. Close Modal
  const cancelDelete = () => {
    setDeleteId(null);
  };

  // 3. Actual Delete Action
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://campus-backend-75cs.onrender.com/api/products/${deleteId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      // Remove from UI immediately
      setProducts(products.filter((p) => p.id !== deleteId));
      setDeleteId(null); // Close modal
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete item. You might not have permission.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Inventory</h1>
            <p className="text-gray-500 mt-1">
              Manage your active listings and remove sold items.
            </p>
          </div>
          <Link
            to="/add-product"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircle size={20} /> Add New Item
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading your stock...
          </div>
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group relative"
              >
                {/* Image Area */}
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                      product.listing_type === "SERVICE"
                        ? "bg-purple-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {product.listing_type === "SERVICE" ? "Service" : "Item"}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="font-bold text-gray-900">${product.price}</p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={16} /> View
                    </Link>
                    <button
                      onClick={() => promptDelete(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No active listings
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              You haven't listed any items for sale yet. Start selling to earn
              extra cash!
            </p>
            <Link
              to="/add-product"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create your first listing &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* --- CUSTOM DELETE MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop (Darkens the background) */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={cancelDelete}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Listing?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to remove this listing? This action cannot
                be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
