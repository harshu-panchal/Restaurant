interface PageHeaderProps {
  eyebrow: string;
  heading: string;
  description?: string;
  image?: string;
}

export default function PageHeader({ eyebrow, heading, description, image }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[46vh] items-center overflow-hidden bg-charcoal pt-24 md:min-h-[52vh]">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/20" />
        </>
      )}
      <div className="container-page relative z-10 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">{eyebrow}</p>
        <h1 className="font-display mt-4 max-w-2xl text-balance text-4xl leading-tight text-ivory md:text-5xl">
          {heading}
        </h1>
        {description && <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base">{description}</p>}
      </div>
    </section>
  );
}
