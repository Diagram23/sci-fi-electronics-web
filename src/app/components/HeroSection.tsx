import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import { pluginsData } from '@/app/data/pluginsData';

export default function HeroSection() {
  const { addToCart, openCheckout, clearCart } = useCart();
  
  const handleBuyBundle = () => {
    clearCart();
    pluginsData.forEach(plugin => {
      addToCart({
        id: plugin.id,
        name: plugin.name,
        price: plugin.price,
        gradient: plugin.gradient
      });
    });
    openCheckout();
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Lightweight grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196, 154, 108, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 154, 108, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-8 text-center pt-32 pb-20"
      >
        {/* Luxury badge */}
        <div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C49A6C]/6 via-[#B8936D]/4 to-[#8B6F47]/6 rounded-full blur-lg" />
            <div className="relative px-8 py-3 bg-white/[0.04] border border-white/10 rounded-full shadow-xl">
              <span className="bg-gradient-to-r from-[#E0D5C5] via-[#B8936D] to-[#9A7A50] bg-clip-text text-transparent text-xs tracking-[0.5em] uppercase font-medium">
                Premium Audio Software
              </span>
            </div>
          </div>
        </div>
        
        {/* Main title with luxury gradient */}
        <div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <h1 className="text-[clamp(5rem,15vw,16rem)] leading-[0.85] mb-6 bg-gradient-to-b from-white via-[#F0E8D8] to-[#A88B5E] bg-clip-text text-transparent"
              style={{ fontWeight: 100, letterSpacing: '0.15em' }}>
            SCI-FI
          </h1>
          
          <h2 className="text-[clamp(2rem,7vw,7rem)] leading-none tracking-[0.3em] bg-gradient-to-r from-gray-300 via-[#E0D5C5] to-gray-300 bg-clip-text text-transparent"
              style={{ fontWeight: 200 }}>
            SOUND PLUGINS
          </h2>
        </div>

        {/* Premium subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed mt-12"
          style={{ fontWeight: 300 }}
        >
          Crafted for perfection.
          <br />
          <span className="bg-gradient-to-r from-[#A88B5E] via-[#9A7A50] to-[#1B6B5A] bg-clip-text text-transparent">
            Designed for excellence.
          </span>
        </motion.p>

        {/* Luxury CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap gap-6 justify-center mb-24"
        >
          <Link to="/plugins">
            <button className="group relative px-12 py-6 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5E4525] via-[#8A6840] to-[#6B5030]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A5C38] via-[#9A7848] to-[#5E4525] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-[#E0D5C5] font-semibold tracking-[0.25em] uppercase text-sm flex items-center gap-3">
                Explore Plugins
                <span className="text-xl">→</span>
              </span>
            </button>
          </Link>
          
          <button className="group relative px-12 py-6 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#8B6F47]/30 rounded-xl transition-all duration-500 shadow-xl">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-semibold tracking-[0.25em] uppercase text-sm">
              Watch Demo
            </span>
          </button>
        </motion.div>

        {/* Premium stats with glass cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            { value: '4', label: 'Premium Plugins', gradient: 'from-[#A88B5E] to-[#9A7A50]' },
            { value: '0.1ms', label: 'Latency', gradient: 'from-[#9A7A50] to-[#1B6B5A]' },
            { value: '∞', label: 'Creative Freedom', gradient: 'from-[#1B6B5A] to-[#9A7A50]' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 + i * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 rounded-2xl p-8 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className={`text-6xl font-light bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 tracking-[0.2em] uppercase">
                  {stat.label}
                </div>
                <div className={`mt-4 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-50`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Elegant scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">Discover More</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-16 bg-gradient-to-b from-[#9A7A50] via-[#8B6F47] to-transparent rounded-full opacity-60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
