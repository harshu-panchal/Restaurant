import { cn } from '../../utils/cn';

interface DietaryBadgeProps {
  type: 'veg' | 'non-veg' | 'egg';
}

// The familiar green/brown square indicator used on Indian menus —
// understated, not a generic icon-font symbol.
export default function DietaryBadge({ type }: DietaryBadgeProps) {
  const color = type === 'veg' ? 'border-green-700 text-green-700' : 'border-maroon text-maroon';
  const label = type === 'veg' ? 'Vegetarian' : type === 'egg' ? 'Contains egg' : 'Non-vegetarian';

  return (
    <span
      title={label}
      aria-label={label}
      className={cn('inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border', color)}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', type === 'veg' ? 'bg-green-700' : 'bg-maroon')} />
    </span>
  );
}
