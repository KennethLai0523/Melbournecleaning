import { Helmet } from 'react-helmet-async';
import { businessConfig } from '../../config/businessConfig';
import { getCanonicalUrl } from '../../config/seoConfig';
import type { PageSEO } from '../../config/seoConfig';

interface SEOProps {
  seo: PageSEO;
  breadcrumbs?: { name: string; path: string }[];
  type?: 'website' | 'service';
  serviceName?: string;
}

export function SEO({ seo, breadcrumbs, type = 'website', serviceName }: SEOProps) {
  const canonical = getCanonicalUrl(seo.path);
  const ogImage = seo.ogImage ?? `${businessConfig.siteUrl}/images/og-image.jpg`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessConfig.name,
    description: seo.description,
    url: businessConfig.siteUrl,
    telephone: businessConfig.phone.raw,
    email: businessConfig.email.address,
    image: `${businessConfig.siteUrl}/images/icon.png`,
    logo: `${businessConfig.siteUrl}/images/icon.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessConfig.address.street,
      addressLocality: businessConfig.address.suburb,
      addressRegion: businessConfig.address.state,
      postalCode: businessConfig.address.postcode,
      addressCountry: 'AU',
    },
    areaServed: {
      '@type': 'City',
      name: 'Melbourne',
      containedInPlace: {
        '@type': 'State',
        name: 'Victoria',
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
  };

  const cleaningServiceSchema = serviceName
    ? {
        '@context': 'https://schema.org',
        '@type': 'CleaningService',
        name: serviceName,
        provider: {
          '@type': 'LocalBusiness',
          name: businessConfig.name,
          telephone: businessConfig.phone.raw,
        },
        areaServed: 'Melbourne, Victoria',
        description: seo.description,
      }
    : null;

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: getCanonicalUrl(item.path),
        })),
      }
    : null;

  const schemas = [localBusinessSchema, cleaningServiceSchema, breadcrumbSchema].filter(Boolean);

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={businessConfig.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
