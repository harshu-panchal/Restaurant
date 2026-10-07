import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for could not be found." path="/404" />
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">404</p>
        <h1 className="font-display mt-4 max-w-md text-balance text-3xl text-charcoal md:text-4xl">
          Looks like this celebration hasn&rsquo;t been planned yet.
        </h1>
        <p className="mt-4 max-w-sm text-sm text-charcoal/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center bg-maroon px-8 py-3.5 text-sm font-medium tracking-wide text-ivory hover:bg-maroon-dark">
          Back to Home
        </Link>
      </section>
    </>
  );
}
