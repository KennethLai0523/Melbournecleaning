import { whyChooseUs } from '../data/about';

export function WhyChooseUs() {
  const items = whyChooseUs.slice(0, 8);

  return (
    <section className="section section--grey" aria-labelledby="why-choose-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Choose Us</span>
          <h2 id="why-choose-heading">The Melbourne Premier Cleaning Difference</h2>
          <p>Reliable cleaning supported by clear communication and flexible service options.</p>
        </div>
        <div className="grid-4">
          {items.map((item) => (
            <article key={item.title} className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
