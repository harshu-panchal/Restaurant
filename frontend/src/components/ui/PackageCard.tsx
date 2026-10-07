import { Link } from 'react-router-dom';
import type { Package } from '../../types';

export default function PackageCard({ pkg, featured = false }: { pkg: Package; featured?: boolean }) {
  return (
    <div
      className={
        featured
          ? 'flex flex-col border border-gold bg-charcoal p-8 text-ivory'
          : 'flex flex-col border border-charcoal/12 bg-ivory p-8'
      }
    >
      <p className={featured ? 'text-xs font-semibold uppercase tracking-[0.2em] text-gold-light' : 'text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark'}>
        {pkg.suitableFor || 'Wedding Catering'}
      </p>
      <h3 className={featured ? 'font-display mt-3 text-3xl text-ivory' : 'font-display mt-3 text-3xl text-charcoal'}>
        {pkg.title}
      </h3>
      <p className={featured ? 'mt-3 text-sm leading-relaxed text-ivory/70' : 'mt-3 text-sm leading-relaxed text-charcoal/65'}>
        {pkg.description}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className={
              featured
                ? 'flex items-start gap-2.5 text-sm text-ivory/80'
                : 'flex items-start gap-2.5 text-sm text-charcoal/75'
            }
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
            {feature}
          </li>
        ))}
      </ul>

      <div className={featured ? 'mt-8 border-t border-ivory/15 pt-6' : 'mt-8 border-t border-charcoal/10 pt-6'}>
        <p className={featured ? 'text-sm text-ivory/60' : 'text-sm text-charcoal/50'}>
          {pkg.isPriceVisible && pkg.price ? `From ₹${pkg.price.toLocaleString('en-IN')} / guest` : 'Pricing on request'}
        </p>
        <Link
          to={`/get-a-quote?package=${pkg.slug}`}
          className={
            featured
              ? 'mt-4 inline-flex w-full items-center justify-center bg-gold px-6 py-3 text-sm font-medium tracking-wide text-charcoal transition-colors hover:bg-gold-light'
              : 'mt-4 inline-flex w-full items-center justify-center border border-charcoal/25 px-6 py-3 text-sm font-medium tracking-wide text-charcoal transition-colors hover:border-gold hover:text-gold-dark'
          }
        >
          Customize Your Package
        </Link>
      </div>
    </div>
  );
}
