import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { DetailedQuoteForm } from '../components/forms/DetailedQuoteForm';
import { seoConfig } from '../config/seoConfig';

export default function RequestQuotePage() {
  return (
    <>
      <SEO
        seo={seoConfig.requestQuote}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Request a Quote', path: '/request-a-quote' },
        ]}
      />
      <PageBanner
        title="Request a Free Quote"
        description="Tell us about your property and cleaning requirements. Submit via WhatsApp or email."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Request a Quote', path: '/request-a-quote' },
        ]}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <DetailedQuoteForm />
        </div>
      </section>
    </>
  );
}
