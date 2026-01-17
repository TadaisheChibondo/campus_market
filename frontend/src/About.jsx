import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Globe,
  Code2,
  Database,
  Server,
  Terminal,
} from "lucide-react";

function About() {
  // Animation variants for smooth entry
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-8 pb-10">
          {/* Profile Picture (Overlapping the banner) */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="p-1.5 bg-white rounded-full shadow-md">
              <img
                src="/my-photo.jpg" // Make sure this file exists in your public folder!
                alt="Tadaishe Chibondo"
                className="w-32 h-32 rounded-full object-cover border-4 border-white bg-gray-200"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="text-center mb-8">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Tadaishe Chibondo
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-blue-600 font-medium text-lg mb-4"
            >
              Full Stack Developer & Quant Trader
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 max-w-lg mx-auto leading-relaxed"
            >
              Hello! I built <strong>CampusMarket</strong> to solve a real
              problem: connecting students to buy and sell safely. I love
              solving complex problems with code, whether it's building scalable
              web apps or analyzing market data.
            </motion.p>
          </div>

          {/* Tech Stack Pills */}
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center mb-4">
              Built With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2">
                <Code2 size={16} /> React.js
              </span>
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                <Server size={16} /> Django
              </span>
              <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold flex items-center gap-2">
                <Database size={16} /> PostgreSQL
              </span>
              <span className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold flex items-center gap-2">
                <Terminal size={16} /> Tailwind CSS
              </span>
            </div>
          </motion.div>

          <hr className="border-gray-100 mb-10" />

          {/* Connect Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-3 gap-4"
          >
            <a
              href="https://www.linkedin.com/in/tadaishe-chibondo-915247349?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
            <a
              href="https://github.com/TadaisheChibondo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <Github size={20} /> GitHub
            </a>
            <a
              href="https://tadaishe-chibondo.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              <Globe size={20} /> Portfolio
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
