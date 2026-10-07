import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            tone === 'dark' ? 'text-gold-dark' : 'text-gold-light'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-balance text-[2.1rem] leading-[1.15] md:text-[2.75rem]',
          tone === 'dark' ? 'text-charcoal' : 'text-ivory'
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-[1.05rem]',
            tone === 'dark' ? 'text-charcoal/70' : 'text-ivory/75'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
