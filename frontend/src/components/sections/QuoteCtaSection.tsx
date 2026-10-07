import { Link } from 'react-router-dom';

export default function QuoteCtaSection() {
  return (
    <section className="relative overflow-hidden bg-maroon py-20 text-ivory md:py-24">
      <img
        src="/images/quote-cta.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">LET&rsquo;S PLAN TOGETHER</p>
        <h2 className="font-display mt-4 max-w-2xl text-balance text-3xl leading-tight md:text-4xl">
          Ready to Start Planning Your Celebration?
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">
          Tell us about your event and we&rsquo;ll get back to you with a tailored catering plan.
        </p>
        <Link
          to="/get-a-quote"
          className="mt-8 inline-flex items-center justify-center bg-gold px-9 py-3.5 text-sm font-medium tracking-wide text-charcoal transition-colors hover:bg-gold-light"
        >
          Request Catering Quote
        </Link>
      </div>
    </section>
  );
}
