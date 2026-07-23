import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { seoConfig } from '../config/seoConfig';

export default function NotFoundPage() {
  return (
    <>
      <SEO seo={seoConfig.notFound} />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>404</h1>
          <h2>Page Not Found</h2>
          <p style={{ margin: '1rem 0 1.5rem', color: 'var(--color-text-secondary)' }}>
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn--secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
