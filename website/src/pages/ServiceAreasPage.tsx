import { useMemo, useState } from 'react';
import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { CTASection } from '../sections/CTASection';
import { Icon } from '../components/ui/Icon';
import { ServiceAreasMap } from '../components/maps/ServiceAreasMap';
import {
  getServiceAreaPins,
  serviceAreas,
  serviceAreaDisclaimer,
} from '../data/serviceAreas';
import { buildSuburbCheckWhatsAppUrl } from '../utils/whatsapp';
import { seoConfig } from '../config/seoConfig';

export default function ServiceAreasPage() {
  const [suburb, setSuburb] = useState('');
  const whatsAppUrl = suburb.trim() ? buildSuburbCheckWhatsAppUrl(suburb.trim()) : undefined;
  const pins = useMemo(() => getServiceAreaPins(), []);

  return (
    <>
      <SEO
        seo={seoConfig.serviceAreas}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Area We Clean', path: '/service-areas' },
        ]}
      />
      <PageBanner
        title="Area We Clean"
        description="Melbourne Cleaning Group services Melbourne CBD, inner city and surrounding suburbs."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Area We Clean', path: '/service-areas' },
        ]}
      />
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{ padding: '1.5rem', maxWidth: '560px', margin: '0 auto 3rem' }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Check Your Suburb</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Enter your suburb to enquire about service availability via WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. South Yarra"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                aria-label="Your suburb"
                style={{ flex: '1 1 200px' }}
              />
              <a
                href={whatsAppUrl ?? '#'}
                className="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!whatsAppUrl}
                onClick={(e) => {
                  if (!whatsAppUrl) e.preventDefault();
                }}
                style={!whatsAppUrl ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
              >
                <Icon name="whatsapp" size={18} />
                Check via WhatsApp
              </a>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Areas on the map</h2>
          <ServiceAreasMap pins={pins} />

          <div className="grid-2">
            {serviceAreas.map((group) => (
              <article key={group.id} className="card" style={{ padding: '1.5rem' }}>
                <h2
                  style={{
                    fontSize: '1.125rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Icon name="mapPin" size={20} />
                  {group.name}
                </h2>
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '0.5rem',
                  }}
                >
                  {group.suburbs.map((sub) => (
                    <li
                      key={sub}
                      style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            {serviceAreaDisclaimer}
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
