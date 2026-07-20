import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { ContactForm } from '../components/forms/ContactForm';
import { Icon } from '../components/ui/Icon';
import { businessConfig } from '../config/businessConfig';
import { getDefaultWhatsAppUrl } from '../utils/whatsapp';
import { seoConfig } from '../config/seoConfig';

export default function ContactPage() {
  return (
    <>
      <SEO
        seo={seoConfig.contact}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch by phone, WhatsApp, email or our contact form."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <h2>Get In Touch</h2>
              <p style={{ margin: '1rem 0 1.5rem', color: 'var(--color-text-secondary)' }}>
                We are here to help with quotes, scheduling and general enquiries. Reach out using the
                details below or send us a message.
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon name="phone" size={22} />
                  <div>
                    <strong>Phone</strong>
                    <br />
                    <a href={businessConfig.phone.tel}>{businessConfig.phone.display}</a>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon name="whatsapp" size={22} />
                  <div>
                    <strong>WhatsApp</strong>
                    <br />
                    <a href={getDefaultWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      Message us on WhatsApp
                    </a>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon name="mail" size={22} />
                  <div>
                    <strong>Email</strong>
                    <br />
                    <a href={`mailto:${businessConfig.email.address}`}>
                      {businessConfig.email.address}
                    </a>
                    {businessConfig.email.isTemporary && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                        Temporary email — verify before launch
                      </p>
                    )}
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon name="mapPin" size={22} />
                  <div>
                    <strong>Location</strong>
                    <br />
                    {businessConfig.address.city}, {businessConfig.address.state}
                    <br />
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      Melbourne, Victoria — exact office address to be added after verification.
                    </span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon name="clock" size={22} />
                  <div>
                    <strong>Opening Hours</strong>
                    <br />
                    {businessConfig.openingHours.weekdays}
                    <br />
                    {businessConfig.openingHours.saturday}
                    <br />
                    {businessConfig.openingHours.sunday}
                  </div>
                </li>
              </ul>

              <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                <a href={businessConfig.phone.tel} className="btn btn--primary">
                  <Icon name="phone" size={18} />
                  Call Now
                </a>
                <a href={`mailto:${businessConfig.email.address}`} className="btn btn--secondary">
                  <Icon name="mail" size={18} />
                  Email Us
                </a>
                <Link to="/request-a-quote" className="btn btn--secondary">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div>
              <h2>Send a Message</h2>
              <div style={{ marginTop: '1rem' }}>
                <ContactForm />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h2>Find Us</h2>
            <div
              className="dev-notice"
              role="note"
              style={{ marginTop: '1rem' }}
            >
              <strong>Map placeholder:</strong> Embed a Google Maps iframe here once a verified business
              address is available.
            </div>
            <div
              style={{
                marginTop: '1rem',
                background: 'var(--color-light-grey)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
              }}
              aria-label="Map placeholder"
            >
              Map will appear here
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
