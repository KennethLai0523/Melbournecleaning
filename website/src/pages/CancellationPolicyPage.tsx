import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { businessConfig } from '../config/businessConfig';
import { seoConfig } from '../config/seoConfig';

export default function CancellationPolicyPage() {
  return (
    <>
      <SEO seo={seoConfig.cancellationPolicy} />
      <PageBanner title="Cancellation Policy" />
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-notice" role="note">
            <strong>Legal review required:</strong> This is starter cancellation policy content only. It
            must be reviewed and approved by a qualified legal professional before launch.
          </div>

          <p>Last updated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 style={{ marginTop: '2rem' }}>1. Overview</h2>
          <p>
            We understand that plans can change. This Cancellation Policy outlines how to reschedule or
            cancel a booking with {businessConfig.name}.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>2. Rescheduling</h2>
          <p>
            If you need to reschedule your cleaning appointment, please contact us as soon as possible.
            We will do our best to accommodate a new date and time subject to availability.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>3. Cancellations</h2>
          <p>
            To cancel a booking, contact us by phone, WhatsApp or email. Cancellation terms, including any
            applicable fees, will be confirmed at the time of booking and may vary depending on the service
            type and notice period provided.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>4. No-Shows</h2>
          <p>
            If our team arrives at the scheduled time and is unable to access the property or the service
            cannot proceed, a fee may apply. Please ensure access arrangements are confirmed before your
            appointment.
          </p>

          <h2 style={{ marginTop: '1.5rem' }}>5. Contact Us</h2>
          <p>
            To reschedule or cancel, contact us at{' '}
            <a href={businessConfig.phone.tel}>{businessConfig.phone.display}</a> or{' '}
            <a href={`mailto:${businessConfig.email.address}`}>{businessConfig.email.address}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
