import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-2xl tracking-[0.3em] bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent group-hover:scale-105 transition-transform"
              style={{ fontWeight: 100 }}>
            SCI-FI
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm tracking-wider uppercase transition-colors ${
              location.pathname === '/' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/plugins" 
            className={`text-sm tracking-wider uppercase transition-colors ${
              location.pathname.includes('/plugins') ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Plugins
          </Link>
          <a href="/#features" className="text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="/#coming-soon" className="text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors">
            Membrana
          </a>
        </div>

        {/* CTA Button */}
        <Link to="/plugins">
          <button className="relative px-6 py-3 overflow-hidden rounded-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-white text-sm font-semibold tracking-[0.2em] uppercase">
              Buy Now
            </span>
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}
