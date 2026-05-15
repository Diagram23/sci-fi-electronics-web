import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { useCursorStore } from '@/app/store/cursorStore';

export default function CursorToggle() {
  const { customCursorEnabled, toggleCustomCursor } = useCursorStore();

  return (
    <motion.button
      onClick={toggleCustomCursor}
      className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-400/50 rounded-lg transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={customCursorEnabled ? 'Desactivar cursor personalizado' : 'Activar cursor personalizado'}
    >
      <motion.div
        animate={{
          opacity: customCursorEnabled ? 1 : 0.4,
          scale: customCursorEnabled ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      >
        <MousePointer2 
          className={`w-4 h-4 transition-colors ${
            customCursorEnabled ? 'text-cyan-400' : 'text-gray-500'
          }`} 
        />
      </motion.div>
      
      {/* Indicator dot */}
      {customCursorEnabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full"
        />
      )}
    </motion.button>
  );
}

