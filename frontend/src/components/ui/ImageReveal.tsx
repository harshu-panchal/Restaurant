import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

// Gentle fade/rise-in on scroll — the only motion most images in the site
// need. Deliberately not a parallax or zoom effect.
export default function ImageReveal({ src, alt, className, imgClassName }: ImageRevealProps) {
  return (
    <motion.div
      className={cn('overflow-hidden bg-cream', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]', imgClassName)}
      />
    </motion.div>
  );
}
