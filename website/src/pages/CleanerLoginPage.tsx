import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { seoConfig } from '../config/seoConfig';

export default function CleanerLoginPage() {
  return (
    <>
      <SEO
        seo={{
          ...seoConfig.contact,
          path: '/login/cleaner',
          title: `Cleaner Login | Melbourne Cleaning Group`,
          description:
            'Cleaner accounts are coming soon for Melbourne Cleaning Group.',
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cleaner Login', path: '/login/cleaner' },
        ]}
      />
      <PageBanner
        title="Cleaner Login"
        description="Cleaner accounts are coming soon. Approved cleaners will be able to manage jobs, availability and assigned bookings."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cleaner Login', path: '/login/cleaner' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Cleaner accounts are coming soon. Approved cleaners will be able to manage jobs,
              availability and assigned bookings.
            </p>
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
