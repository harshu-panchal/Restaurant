import DietaryBadge from './DietaryBadge';
import type { MenuItem } from '../../types';

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group">
      <div className="aspect-square overflow-hidden bg-cream">
        <img
          src={item.image || '/images/dish-main-course.svg'}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="font-display text-lg leading-snug text-charcoal">{item.name}</p>
        <div className="mt-1.5">
          <DietaryBadge type={item.dietaryType} />
        </div>
      </div>
      {item.description && <p className="mt-1 text-sm leading-relaxed text-charcoal/60">{item.description}</p>}
    </div>
  );
}
