import { howItWorks } from '../data/about';

export function HowItWorks() {
  return (
    <section className="section" aria-labelledby="how-it-works-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How It Works</span>
          <h2 id="how-it-works-heading">Simple Steps to a Cleaner Space</h2>
          <p>Getting started is easy — request a quote, confirm your requirements and schedule your clean.</p>
        </div>
        <ol
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            listStyle: 'none',
          }}
        >
          {howItWorks.map((step) => (
            <li
              key={step.step}
              className="card"
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
                aria-hidden="true"
              >
                {step.step}
              </span>
              <h3 style={{ fontSize: '1.0625rem', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
