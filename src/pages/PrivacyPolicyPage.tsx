import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { businessConfig } from '../config/businessConfig';
import { seoConfig } from '../config/seoConfig';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO seo={seoConfig.privacyPolicy} />
      <PageBanner title="Privacy Policy" />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-notice" role="note">
            <strong>Legal review required:</strong> This is starter privacy policy content only. It must be
            reviewed and approved by a qualified legal professional before launch.
          </div>

          <p>Last updated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 style={{ marginTop: '2rem' }}>1. Introduction</h2>
          <p>
            {businessConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is
            committed to protecting your personal information. This Privacy Policy explains how we collect,
            use and disclose information when you use our website or contact us about our cleaning services.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-check" style={{ marginTop: '0.75rem' }}>
            <li>Name, phone number and email address</li>
            <li>Property address or suburb</li>
            <li>Service requirements and enquiry details</li>
            <li>Communications between you and our team</li>
          </ul>

          <h2 style={{ marginTop: '1.5rem' }}>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-check" style={{ marginTop: '0.75rem' }}>
            <li>Respond to enquiries and provide quotations</li>
            <li>Schedule and deliver cleaning services</li>
            <li>Communicate about your booking or service</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 style={{ marginTop: '1.5rem' }}>4. Disclosure of Information</h2>
          <p>
            We do not sell your personal information. We may disclose information to service providers who
            assist us in operating our business, or where required by law.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>5. Contact Us</h2>
          <p>
            For privacy-related enquiries, contact us at{' '}
            <a href={`mailto:${businessConfig.email.address}`}>{businessConfig.email.address}</a> or call{' '}
            <a href={businessConfig.phone.tel}>{businessConfig.phone.display}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
