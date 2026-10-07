import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export default function Hero() {
  const settings = useSiteSettings();
  const { eyebrow, heading, description, image } = settings.hero;

  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden bg-charcoal">
      <img
        src={image || '/images/hero-wedding.svg'}
        alt="Elegant Indian wedding catering spread"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle gradient, not a heavy dark overlay — keeps the photography visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/10" />

      <div className="container-page relative z-10 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mt-5 max-w-3xl text-balance text-[2.6rem] leading-[1.1] text-ivory md:text-[4rem]"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-ivory/80 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link to="/get-a-quote" className="inline-flex items-center justify-center bg-maroon px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-maroon-dark">
            Plan Your Wedding
          </Link>
          <Link to="/menu" className="inline-flex items-center justify-center border border-ivory/40 px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:border-gold-light hover:text-gold-light">
            Explore Our Menu
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 text-xs uppercase tracking-[0.15em] text-ivory/55"
        >
          Serving weddings, celebrations &amp; special occasions
        </motion.p>
      </div>
    </section>
  );
}
