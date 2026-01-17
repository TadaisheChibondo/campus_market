import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";

// Accept the 'user' prop here
function Home({ user }) {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        {/* Dynamic Badge: Show generic text OR Welcome message */}
        <div className="flex justify-center mb-6">
          {user ? (
            <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Welcome back, {user.username}!
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">
              The #1 Marketplace for Students
            </div>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Campus life, <span className="text-blue-600">upgraded.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The exclusive marketplace for students. Buy cheap textbooks, sell your
          old gear, and connect with your campus community safely.
        </p>

        {/* Dynamic Buttons: Change based on login state */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            // LOGGED IN VIEW (Dashboard Feel)
            <>
              <Link
                to="/browse"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} /> Browse Market
              </Link>
              <Link
                to="/add-product"
                className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} /> Sell an Item
              </Link>
            </>
          ) : (
            // LOGGED OUT VIEW (Marketing Feel)
            <>
              <Link
                to="/browse"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
              >
                Start Browsing <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </section>

      {/* 2. FEATURES GRID (Stays the same) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Verified Students
            </h3>
            <p className="text-gray-600">
              No strangers. Every user is verified with their student ID, making
              transactions safer and more reliable.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Instant Chat
            </h3>
            <p className="text-gray-600">
              Connect directly via WhatsApp with one click. No clunky in-app
              messaging, just fast communication.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Community First
            </h3>
            <p className="text-gray-600">
              Built for students, by students. We understand the struggle of
              expensive textbooks and dorm life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
