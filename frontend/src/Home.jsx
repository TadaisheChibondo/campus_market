import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

// High-quality placeholder images for the slider
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // University Hall
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", // Graduates
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", // Students talking
];

function Home({ user }) {
  // Logic to cycle through images every 5 seconds
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* 1. HERO SECTION WITH SLIDER */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image Slider */}
        {/* {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-40" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))} */}
        {/* Background Image Slider with Zoom Effect */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
              index === currentImage
                ? "opacity-40 scale-110" // Zoom IN when active
                : "opacity-0 scale-100" // Zoom out when inactive
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Dark Overlay (to ensure text is readable) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          {/* Dynamic Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            {user ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Welcome back, {user.username}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                The #1 Marketplace for Students
              </div>
            )}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-xl"
          >
            Campus life, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              upgraded.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
          >
            Buy cheap textbooks, sell your old gear, and connect with your
            campus community safely.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {user ? (
              <>
                <Link
                  to="/browse"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <ShoppingBag size={20} /> Browse Market
                </Link>
                <Link
                  to="/add-product"
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle size={20} /> Sell an Item
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/browse"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 hover:scale-105"
                >
                  Start Browsing <ArrowRight size={20} />
                </Link>
                <Link
                  to="/register"
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. ANIMATED FEATURES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 bg-white">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Verified Students
            </h3>
            <p className="text-gray-600 leading-relaxed">
              No strangers. Every user is verified with their student ID, making
              transactions safer and more reliable.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Instant Chat
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect directly via WhatsApp with one click. No clunky in-app
              messaging, just fast communication.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Community First
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Built for students, by students. We understand the struggle of
              expensive textbooks and dorm life.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
