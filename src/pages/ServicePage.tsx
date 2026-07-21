import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { ServiceCard } from '../components/ui/ServiceCard';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { CTASection } from '../sections/CTASection';
import { getServiceBySlug, getRelatedServices } from '../data/services';
import { seoConfig } from '../config/seoConfig';
import { businessConfig } from '../config/businessConfig';

const slugToSeoKey: Record<string, keyof typeof seoConfig> = {
  'residential-cleaning': 'residentialCleaning',
  'commercial-cleaning': 'commercialCleaning',
  'end-of-lease-cleaning': 'endOfLeaseCleaning',
  'deep-cleaning': 'deepCleaning',
  'office-cleaning': 'officeCleaning',
  'carpet-cleaning': 'carpetCleaning',
  'window-cleaning': 'windowCleaning',
  'airbnb-cleaning': 'airbnbCleaning',
  'move-in-move-out-cleaning': 'moveInMoveOutCleaning',
  'post-construction-cleaning': 'postConstructionCleaning',
  'strata-cleaning': 'strataCleaning',
};

interface ServicePageProps {
  slug?: string;
}

export default function ServicePage({ slug: slugProp }: ServicePageProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const slug = slugProp ?? routeSlug ?? '';
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Service Not Found</h1>
          <p style={{ margin: '1rem 0 1.5rem', color: 'var(--color-text-secondary)' }}>
            The cleaning service you are looking for could not be found.
          </p>
          <Link to="/services" className="btn btn--primary">
            View All Services
          </Link>
        </div>
      </section>
    );
  }

  const seoKey = slugToSeoKey[slug];
  const seo = seoKey
    ? seoConfig[seoKey]
    : {
        path: `/${slug}`,
        title: `${service.title} | ${businessConfig.name}`,
        description: service.shortDescription,
      };

  const relatedServices = getRelatedServices(service);
  const faqItems = service.faqs.map((faq, index) => ({
    id: `${service.id}-faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  }));

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortTitle, path: `/${service.slug}` },
  ];

  return (
    <>
      <SEO
        seo={seo}
        breadcrumbs={breadcrumbs}
        type="service"
        serviceName={service.title}
      />
      <PageBanner
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={breadcrumbs}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', marginBottom: '3rem' }}>
            <div>
              <img
                src={service.image}
                alt={service.title}
                style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', width: '100%' }}
                width={560}
                height={400}
              />
            </div>
            <div>
              <p>{service.description}</p>
              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <Link to="/request-a-quote" className="btn btn--primary">
                  Request a Quote
                </Link>
                <Link to="/contact" className="btn btn--secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '3rem' }}>
            <div>
              <h2>What&apos;s Included</h2>
              <ul className="list-check" style={{ marginTop: '1rem' }}>
                {service.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Optional Additions</h2>
              <ul className="list-check" style={{ marginTop: '1rem' }}>
                {service.optionalAdditions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2>Who This Service Is For</h2>
            <p style={{ marginTop: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {service.customerTypes.join(' · ')}
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2>Our Process</h2>
            <ol style={{ marginTop: '1rem', paddingLeft: '1.25rem', listStyle: 'decimal' }}>
              {service.process.map((step) => (
                <li key={step} style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {faqItems.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.25rem' }}>Frequently Asked Questions</h2>
              <FAQAccordion items={faqItems} />
            </div>
          )}

          {relatedServices.length > 0 && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Related Services</h2>
              <div className="grid-3">
                {relatedServices.map((related) => (
                  <ServiceCard key={related.id} service={related} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <CTASection
        title={`Book ${service.shortTitle}`}
        description={`Request a quote for ${service.title.toLowerCase()} across Melbourne.`}
      />
    </>
  );
}
