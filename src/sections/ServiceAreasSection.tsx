import { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceAreas, serviceAreaDisclaimer } from '../data/serviceAreas';
import { buildSuburbCheckWhatsAppUrl } from '../utils/whatsapp';
import { Icon } from '../components/ui/Icon';

export function ServiceAreasSection() {
  const [suburb, setSuburb] = useState('');

  const whatsAppUrl = suburb.trim()
    ? buildSuburbCheckWhatsAppUrl(suburb.trim())
    : undefined;

  return (
    <section className="section" aria-labelledby="service-areas-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Area We Clean</span>
          <h2 id="service-areas-heading">Cleaning Across Melbourne</h2>
          <p>We service Melbourne CBD, inner city and surrounding suburbs.</p>
        </div>

        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {serviceAreas.map((group) => (
            <article key={group.id} className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="mapPin" size={18} />
                {group.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {group.suburbs.slice(0, 5).join(', ')}
                {group.suburbs.length > 5 && ` +${group.suburbs.length - 5} more`}
              </p>
            </article>
          ))}
        </div>

        <div
          className="card"
          style={{
            padding: '1.5rem',
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
          }}
        >
          <h3 style={{ fontSize: '1.0625rem', marginBottom: '0.75rem' }}>Check Your Suburb</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Enter your suburb to enquire about service availability via WhatsApp.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Richmond"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              aria-label="Your suburb"
              style={{ flex: '1 1 200px' }}
            />
            <a
              href={whatsAppUrl ?? '#'}
              className={`btn btn--whatsapp ${!whatsAppUrl ? 'btn--sm' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!whatsAppUrl}
              onClick={(e) => {
                if (!whatsAppUrl) e.preventDefault();
              }}
              style={!whatsAppUrl ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
            >
              <Icon name="whatsapp" size={18} />
              Check Your Suburb on WhatsApp
            </a>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          {serviceAreaDisclaimer}
        </p>

        <div style={{ textAlign: 'center' }}>
          <Link to="/service-areas" className="btn btn--secondary">
            View Areas We Clean
          </Link>
        </div>
      </div>
    </section>
  );
}
