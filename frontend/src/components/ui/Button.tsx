import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-colors duration-200 rounded-sm';

const variants: Record<Variant, string> = {
  primary: 'bg-maroon text-ivory hover:bg-maroon-dark px-7 py-3',
  secondary: 'bg-transparent text-charcoal border border-charcoal/30 hover:border-gold hover:text-gold px-7 py-3',
  ghost: 'bg-transparent text-charcoal hover:text-gold px-2 py-1',
  'outline-light': 'bg-transparent text-ivory border border-ivory/50 hover:border-gold hover:text-gold px-7 py-3',
};

const sizes: Record<Size, string> = {
  md: 'text-sm',
  lg: 'text-base px-9 py-3.5',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

function useClasses({ variant = 'primary', size = 'md', className }: BaseProps) {
  return cn(base, variants[variant], sizes[size], className);
}

export function LinkButton({
  to,
  ...props
}: BaseProps & { to: string }) {
  return (
    <Link to={to} className={useClasses(props)}>
      {props.children}
    </Link>
  );
}

export function AnchorButton({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a href={href} className={useClasses({ variant, size, className, children })} {...rest}>
      {children}
    </a>
  );
}

export default function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={useClasses({ variant, size, className, children })} {...rest}>
      {children}
    </button>
  );
}
