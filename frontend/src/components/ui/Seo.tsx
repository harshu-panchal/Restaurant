import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../../hooks/useSiteSettings';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  structuredData?: Record<string, unknown>;
}

export default function Seo({ title, description, path = '', image, structuredData }: SeoProps) {
  const settings = useSiteSettings();
  const fullTitle = `${title} | ${settings.businessName}`;
  const url = `${window.location.origin}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
