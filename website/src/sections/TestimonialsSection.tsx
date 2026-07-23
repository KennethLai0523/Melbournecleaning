import { testimonials } from '../data/testimonials';
import { Icon } from '../components/ui/Icon';

export function TestimonialsSection() {
  const placeholders = testimonials.filter((t) => t.isPlaceholder);

  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
          <p>Customer feedback from Melbourne homes and businesses.</p>
        </div>

        <div className="dev-notice" role="note" style={{ maxWidth: '720px', margin: '0 auto 2rem' }}>
          <strong>Development notice:</strong> Testimonials shown below are placeholders only. Replace
          with verified customer reviews before publishing. Do not publish sample testimonials as genuine
          reviews.
        </div>

        <div className="grid-3">
          {placeholders.map((testimonial) => (
            <blockquote key={testimonial.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                <Icon name="star" size={20} />
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer>
                <cite style={{ fontStyle: 'normal', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Placeholder review — pending verification
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
