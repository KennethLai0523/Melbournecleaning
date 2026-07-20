export function BeforeAfterSection() {
  const pairs = [
    {
      id: 'example-1',
      before: '/images/before-cleaning-example.jpg',
      after: '/images/after-cleaning-example.jpg',
    },
  ];

  return (
    <section className="section section--grey" aria-labelledby="before-after-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Results</span>
          <h2 id="before-after-heading">Before &amp; After</h2>
          <p>Visual examples of cleaning results — replace with genuine company work before launch.</p>
        </div>
        {pairs.map((pair) => (
          <div key={pair.id} className="grid-2" style={{ marginBottom: '1.5rem' }}>
            <figure className="card" style={{ overflow: 'hidden', margin: 0 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={pair.before}
                  alt="Before cleaning example — replace with genuine company photo"
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'var(--color-charcoal)',
                    color: 'var(--color-white)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  Before
                </span>
              </div>
              <figcaption style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                before-cleaning-example.jpg
              </figcaption>
            </figure>
            <figure className="card" style={{ overflow: 'hidden', margin: 0 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={pair.after}
                  alt="After cleaning example — replace with genuine company photo"
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'var(--color-primary)',
                    color: 'var(--color-white)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  After
                </span>
              </div>
              <figcaption style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                after-cleaning-example.jpg
              </figcaption>
            </figure>
          </div>
        ))}
        <div className="dev-notice" role="note">
          <strong>Developer note:</strong> These placeholder images must be replaced with genuine
          company work before launch. Do not display misleading edited images.
        </div>
      </div>
    </section>
  );
}
