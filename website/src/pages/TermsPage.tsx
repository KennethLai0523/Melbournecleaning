import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { businessConfig } from '../config/businessConfig';
import { seoConfig } from '../config/seoConfig';

export default function TermsPage() {
  return (
    <>
      <SEO seo={seoConfig.termsAndConditions} />
      <PageBanner title="Terms and Conditions" />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-notice" role="note">
            <strong>Legal review required:</strong> This is starter terms and conditions content only. It
            must be reviewed and approved by a qualified legal professional before launch.
          </div>

          <p>Last updated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 style={{ marginTop: '2rem' }}>1. Agreement</h2>
          <p>
            By engaging {businessConfig.name} for cleaning services or using our website, you agree to
            these Terms and Conditions. Please read them carefully before booking.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>2. Services</h2>
          <p>
            We provide residential cleaning services across Melbourne. The scope of each
            service is defined in the quotation and agreed cleaning checklist. Services may vary depending
            on property condition, access and specific requirements.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>3. Quotations and Payment</h2>
          <p>
            Quotations are based on the information provided at the time of enquiry. Final pricing may be
            adjusted if the scope of work differs from what was agreed. Payment terms will be confirmed at
            the time of booking.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>4. Client Responsibilities</h2>
          <p>
            Clients are responsible for providing safe access to the property, disclosing any hazards or
            special requirements, and securing valuables before the service commences.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>5. Limitation of Liability</h2>
          <p>
            To the extent permitted by law, our liability is limited to the value of the service provided.
            We are not responsible for pre-existing damage or outcomes beyond the agreed scope of cleaning.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>6. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href={`mailto:${businessConfig.email.address}`}>{businessConfig.email.address}</a> or call{' '}
            <a href={businessConfig.phone.tel}>{businessConfig.phone.display}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
