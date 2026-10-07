import { cn } from '../../utils/cn';
import type { Testimonial } from '../../types';

export default function TestimonialCard({
  testimonial,
  centered = false,
}: {
  testimonial: Testimonial;
  centered?: boolean;
}) {
  const initial = testimonial.name?.trim()?.[0]?.toUpperCase() || '?';

  return (
    <div className={cn('flex flex-col', centered && 'items-center')}>
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="text-gold">
        <path
          d="M0 22V12.8C0 8.4 1.1 5.3 3.3 3.1C5.5 1 8.2 0 11.4 0V3.5C9.1 3.5 7.4 4.1 6.3 5.3C5.2 6.4 4.6 8 4.6 10V10.6H10.3V22H0ZM16.6 22V12.8C16.6 8.4 17.7 5.3 19.9 3.1C22.1 1 24.8 0 28 0V3.5C25.7 3.5 24 4.1 22.9 5.3C21.8 6.4 21.2 8 21.2 10V10.6H26.9V22H16.6Z"
          fill="currentColor"
        />
      </svg>
      <p className="font-display mt-5 text-xl leading-snug text-charcoal md:text-2xl">
        &ldquo;{testimonial.testimonial}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream font-display text-base text-brown">
          {initial}
        </span>
        <div className={cn(centered && 'text-left')}>
          <p className="text-sm font-medium text-charcoal">{testimonial.name}</p>
          {testimonial.eventType && <p className="text-xs text-charcoal/50">{testimonial.eventType}</p>}
        </div>
      </div>
    </div>
  );
}
