import { Link } from "react-router-dom";
import { ShoppingBag, MessageCircle, Globe, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CampusMarket
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              The safest way to buy and sell on campus. Verified students,
              secure chats, and great deals.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  to="/browse"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?category=BOOKS"
                  className="hover:text-blue-600 transition-colors"
                >
                  Textbooks
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?category=ELECTRONICS"
                  className="hover:text-blue-600 transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/add-product"
                  className="hover:text-blue-600 transition-colors"
                >
                  Sell an Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="hover:text-blue-600 transition-colors"
                >
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="hover:text-blue-600 transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@campusmarket.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Column (Updated) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              {/* WhatsApp Link */}
              <a
                href="https://wa.me/263789956550"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

              {/* Portfolio Link */}
              <a
                href="https://tadaishe-chibondo.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-all"
                title="Developer Portfolio"
              >
                <Globe size={20} />
              </a>

              {/* Email Link (Placeholder) */}
              <a
                href="mailto:tadaishechibondo@gmail.com"
                className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all"
                title="Email Us"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} CampusMarket Inc.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            by
            <a
              href="https://tadaishe-chibondo.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600 font-medium ml-1"
            >
              Tadaishe Chibondo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
