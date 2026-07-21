import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { CTASection } from '../sections/CTASection';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { HowItWorks } from '../sections/HowItWorks';
import { aboutContent } from '../data/about';
import { seoConfig } from '../config/seoConfig';

export default function AboutPage() {
  return (
    <>
      <SEO
        seo={seoConfig.about}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />
      <PageBanner
        title="About Melbourne Cleaning Group"
        description="Residential cleaning services with dependable communication across Melbourne."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', marginBottom: '3rem' }}>
            <div>
              <h2>Who We Are</h2>
              <p style={{ marginTop: '1rem' }}>{aboutContent.introduction}</p>
              <p style={{ color: 'var(--color-text-secondary)' }}>{aboutContent.mission}</p>
            </div>
            <div>
              <img
                src="/images/about-team.jpg"
                alt="Melbourne Cleaning Group"
                style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)' }}
                width={560}
                height={400}
                loading="lazy"
              />
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2>Our Service Approach</h2>
            <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
              {aboutContent.serviceApproach}
            </p>
          </div>

          <div className="grid-2" style={{ marginBottom: '3rem' }}>
            <div>
              <h2>Cleaning Standards</h2>
              <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                {aboutContent.cleaningStandards}
              </p>
            </div>
            <div>
              <h2>Communication</h2>
              <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                {aboutContent.communicationProcess}
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '3rem' }}>
            <div>
              <h2>Safety</h2>
              <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                {aboutContent.safetyInformation}
              </p>
            </div>
            <div>
              <h2>Service Coverage</h2>
              <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                {aboutContent.serviceCoverage}
              </p>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <HowItWorks />
      <CTASection />
    </>
  );
}
