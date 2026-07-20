import { Link } from 'react-router-dom';
import { getDefaultWhatsAppUrl } from '../utils/whatsapp';
import { Icon } from '../components/ui/Icon';

const inclusions = [
  'Kitchen cleaning',
  'Bathroom cleaning',
  'Floors and surfaces',
  'Bedrooms and living areas',
  'Internal windows where selected',
  'Oven cleaning where selected',
  'Carpet cleaning where selected',
  'Property-specific cleaning requirements',
  'Flexible appointment scheduling',
];

export function EndOfLeaseSection() {
  return (
    <section className="section" aria-labelledby="end-of-lease-heading">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-label">End of Lease Cleaning</span>
            <h2 id="end-of-lease-heading">Preparing Your Property for Final Inspection</h2>
            <p>
              Moving out? We help prepare your property for the final inspection with comprehensive
              end of lease cleaning tailored to your property requirements.
            </p>
            <ul className="list-check" style={{ margin: '1.25rem 0' }}>
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              We help prepare the property for the final inspection. Results and bond outcomes remain
              subject to the property&apos;s condition, tenancy requirements and inspection.
            </p>
            <div className="btn-group">
              <Link to="/end-of-lease-cleaning" className="btn btn--primary">
                View End of Lease Cleaning
              </Link>
              <Link to="/request-a-quote" className="btn btn--secondary">
                Get a Quote
              </Link>
              <a
                href={getDefaultWhatsAppUrl()}
                className="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div>
            <img
              src="/images/end-of-lease-cleaning.jpg"
              alt="End of lease cleaning in Melbourne"
              style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)' }}
              width={560}
              height={400}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
