import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { seoConfig } from '../config/seoConfig';

export default function CustomerLoginPage() {
  return (
    <>
      <SEO
        seo={{
          ...seoConfig.contact,
          path: '/login/customer',
          title: `Customer Login | Melbourne Cleaning Group`,
          description:
            'Customer accounts are coming soon for Melbourne Cleaning Group.',
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Customer Login', path: '/login/customer' },
        ]}
      />
      <PageBanner
        title="Customer Login"
        description="Customer accounts are coming soon. You will be able to manage bookings, quotes, addresses and cleaning history."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Customer Login', path: '/login/customer' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Customer accounts are coming soon. You will be able to manage bookings, quotes,
              addresses and cleaning history.
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
