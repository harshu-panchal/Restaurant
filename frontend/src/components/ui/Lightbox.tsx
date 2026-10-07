import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxItem {
  image: string;
  title?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const active = isOpen ? items[activeIndex] : null;

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev]);

  return createPortal(
    <AnimatePresence>
      {isOpen && active && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-charcoal/95 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 text-2xl text-ivory/70 transition-colors hover:text-gold"
          >
            &times;
          </button>

          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-ivory/60 transition-colors hover:text-gold md:left-6"
          >
            &#8249;
          </button>
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-ivory/60 transition-colors hover:text-gold md:right-6"
          >
            &#8250;
          </button>

          <motion.img
            key={active.image}
            src={active.image}
            alt={active.title || ''}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
          {active.title && <p className="mt-4 text-sm text-ivory/70">{active.title}</p>}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
