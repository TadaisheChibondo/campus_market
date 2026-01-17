import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, LogOut, PlusCircle } from "lucide-react";
import { useState } from "react";
import Footer from "./Footer";

const Layout = ({ children, user, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Sticky Glass Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CampusMarket
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/browse" className={isActive("/browse")}>
                Browse
              </Link>
              <Link
                to="/requests"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Requests
              </Link>
              <Link to="/about" className={isActive("/about")}>
                About
              </Link>

              {user ? (
                <div className="flex items-center gap-6 pl-6 border-l border-gray-200">
                  <span className="text-sm font-medium text-gray-500">
                    Hi, {user.username || "Student"}
                  </span>
                  <Link
                    to="/add-product"
                    className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    <PlusCircle size={18} /> Sell Item
                  </Link>
                  {/* Inside the Desktop User Section */}
                  <Link
                    to="/my-listings"
                    className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    My Listings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 font-medium text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-lg">
            {/* ✅ FIXED: Added proper styling and click handler */}
            <Link
              to="/browse"
              className="block py-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/requests"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Requests
            </Link>
            {/* Inside the Mobile Menu (logged in section) */}
            <Link
              to="/my-listings"
              className="block py-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Listings
            </Link>

            <Link
              to="/about"
              className="block py-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            {user && (
              <Link
                to="/add-product"
                className="block py-2 text-green-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                + Sell Item
              </Link>
            )}

            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-500 font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="block text-center py-2 border rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Padding */}
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
