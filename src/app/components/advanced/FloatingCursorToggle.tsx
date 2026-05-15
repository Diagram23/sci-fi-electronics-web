import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

type FloatingCursorToggleProps = {
  enabled: boolean;
  visible: boolean;
  onToggle: () => void;
};

export default function FloatingCursorToggle({ enabled, visible, onToggle }: FloatingCursorToggleProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="fixed bottom-6 right-6 z-[140]"
    >
      <AnimatePresence>
        <motion.div
          key={enabled ? 'on' : 'off'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="mb-2 rounded-lg border border-white/15 bg-black/70 px-3 py-1 text-xs text-[#9A9994] backdrop-blur"
        >
          Cursor {enabled ? 'ON' : 'OFF'}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#B8936D]/55 bg-[#0D0B09]/85 text-[#F4F1EA]"
        aria-label="Toggle custom cursor"
      >
        <MousePointer2 className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

