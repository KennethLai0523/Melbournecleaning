import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CTASection } from '../sections/CTASection';
import { getPublicServices } from '../data/services';
import { seoConfig } from '../config/seoConfig';

export default function ServicesPage() {
  const publicServices = getPublicServices();

  return (
    <>
      <SEO
        seo={seoConfig.services}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <PageBanner
        title="Our Cleaning Services"
        description="Explore our residential cleaning services across Melbourne — from regular home cleaning to deep cleans, end of lease and specialist add-ons."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {publicServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
