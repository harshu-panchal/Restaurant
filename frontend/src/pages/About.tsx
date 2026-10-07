import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import ImageReveal from '../components/ui/ImageReveal';
import SectionHeading from '../components/ui/SectionHeading';
import OrnamentDivider from '../components/ui/OrnamentDivider';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Our story, our kitchen, and the approach we bring to every wedding and celebration we cater."
        path="/about"
      />
      <PageHeader
        eyebrow="OUR STORY"
        heading="Food, Prepared With Intention"
        description="A little about how we approach every celebration we're part of."
        image="/images/about-story.svg"
      />

      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <SectionHeading eyebrow="HOW WE BEGAN" heading="Our Story" />
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
            Zaffran &amp; Co. began in the kitchen, not the boardroom — with a focus on getting the
            fundamentals right: good ingredients, patient technique, and food that tastes the way
            it should. Catering weddings followed naturally, because weddings are where food is
            asked to do the most: feed a crowd, represent a family, and mark an occasion that
            won't come around twice.
          </p>
          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
            That early focus on getting the food right, course after course, guest after guest,
            is still what shapes how we plan every event today.
          </p>
        </div>
        <ImageReveal src="/images/about-story.svg" alt="The team preparing a wedding spread" className="h-[320px] md:h-[460px]" />
      </section>

      <div className="py-2">
        <OrnamentDivider />
      </div>

      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <ImageReveal src="/images/about-philosophy.svg" alt="Dishes plated for service" className="order-2 h-[320px] md:order-1 md:h-[460px]" />
        <div className="order-1 md:order-2">
          <SectionHeading eyebrow="HOW WE THINK" heading="Our Philosophy" />
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
            We don't believe bigger menus make better weddings. A shorter list of dishes, made
            well and served warm, almost always leaves a stronger impression than an overcrowded
            buffet. Every menu we plan starts from the guest's experience backward — what will
            actually get eaten, enjoyed, and remembered.
          </p>
        </div>
      </section>

      <section className="bg-cream/60 py-20 md:py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHeading eyebrow="WHERE IT HAPPENS" heading="Our Kitchen" />
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/70">
              Every dish is prepared in a kitchen built around volume without losing the detail
              of home cooking — fresh spice grinding, slow-cooked gravies, and tandoors fired
              the traditional way. It's a working kitchen, not a showroom, and that's by design.
            </p>
          </div>
          <ImageReveal src="/images/about-kitchen.svg" alt="Inside the working kitchen" className="h-[280px] md:h-[380px]" />
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="HOW WE WORK" heading="Our Approach" align="center" className="mx-auto" />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border-t border-gold pt-6">
            <p className="font-display text-xl text-charcoal">Listening First</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              Every family's idea of a good wedding meal is different — we plan around yours, not
              a fixed template.
            </p>
          </div>
          <div className="border-t border-gold pt-6">
            <p className="font-display text-xl text-charcoal">Consistency at Scale</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              The same dish should taste the same whether we're serving fifty guests or five
              hundred.
            </p>
          </div>
          <div className="border-t border-gold pt-6">
            <p className="font-display text-xl text-charcoal">Being Present on the Day</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              Our team is on-site through the event, not just the kitchen — adjusting as the day
              actually unfolds.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-4 pb-20 md:pb-24">
        <SectionHeading eyebrow="QUALITY" heading="Why Families Choose Us" align="center" className="mx-auto" />
        <p className="mx-auto mt-5 max-w-2xl text-center text-[1.05rem] leading-relaxed text-charcoal/70">
          We stay closely involved with every booking, from the first tasting session to the
          final course served on the day — rather than handing an event off once it's confirmed.
          Ingredients are sourced with care, and menus are tested before they're ever served to
          guests.
        </p>
      </section>

      <QuoteCtaSection />
    </>
  );
}
