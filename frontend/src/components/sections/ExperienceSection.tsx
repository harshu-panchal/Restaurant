import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  { num: '01', title: 'Understanding Your Celebration', text: 'We start with a conversation about your guests, your venue and the feel you want for the day.' },
  { num: '02', title: 'Designing the Menu', text: 'A menu is shaped around your preferences, regional favourites and the occasion itself.' },
  { num: '03', title: 'Preparing With Care', text: 'Every dish is prepared fresh, with attention to ingredients and traditional technique.' },
  { num: '04', title: 'Setting the Experience', text: 'Buffet styling, live counters and table settings are arranged to match your event.' },
  { num: '05', title: 'Serving Your Guests', text: 'Our service team focuses on warmth, timing and attentiveness throughout the event.' },
  { num: '06', title: 'Leaving a Lasting Impression', text: 'From the final dessert to a clean handover, we see the celebration through to its close.' },
];

export default function ExperienceSection() {
  return (
    <section className="bg-charcoal py-20 text-ivory md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="HOW WE WORK"
          heading="From First Welcome to the Last Sweet"
          tone="light"
        />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="border-t border-ivory/15 pt-6">
              <span className="font-display text-sm text-gold-light">{step.num}</span>
              <p className="font-display mt-3 text-xl text-ivory">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
