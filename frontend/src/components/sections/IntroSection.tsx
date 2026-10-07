import { Link } from 'react-router-dom';
import ImageReveal from '../ui/ImageReveal';
import SectionHeading from '../ui/SectionHeading';

export default function IntroSection() {
  return (
    <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
      <ImageReveal
        src="/images/intro-hospitality.svg"
        alt="A member of the service team attending to guests"
        className="order-2 h-[320px] md:order-1 md:h-[520px]"
      />

      <div className="order-1 md:order-2">
        <SectionHeading
          eyebrow="THE ART OF HOSPITALITY"
          heading="More Than Catering. A Part of Your Celebration."
        />
        <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
          A wedding menu is more than a list of dishes — it is shaped around your guests, your
          venue and the rhythm of your celebration. We work closely with every family to plan
          a spread that feels generous without being excessive, and personal rather than
          templated.
        </p>
        <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
          From the first tasting to the last course served, our team pays attention to
          presentation, pacing and the small details of hospitality that guests remember
          long after the celebration ends.
        </p>
        <Link
          to="/about"
          className="mt-7 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal transition-colors hover:text-gold-dark"
        >
          Discover Our Story
        </Link>
      </div>
    </section>
  );
}
