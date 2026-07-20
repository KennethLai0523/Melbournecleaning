import { trustCards } from '../data/about';
import { Icon } from '../components/ui/Icon';

export function TrustSection() {
  return (
    <section className="section" aria-labelledby="trust-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Trust Us</span>
          <h2 id="trust-heading">Cleaning You Can Count On</h2>
          <p>Dependable service backed by clear communication and flexible cleaning options.</p>
        </div>
        <div className="grid-4">
          {trustCards.map((card) => (
            <article key={card.title} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                <Icon name={card.icon} size={28} />
              </div>
              <h3>{card.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginTop: '0.5rem' }}>
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
