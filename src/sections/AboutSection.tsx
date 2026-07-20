import { Link } from 'react-router-dom';
import { aboutContent } from '../data/about';

export function AboutSection() {
  return (
    <section className="section section--grey" aria-labelledby="about-preview-heading">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-label">About Us</span>
            <h2 id="about-preview-heading">Melbourne Premier Cleaning</h2>
            <p>{aboutContent.introduction}</p>
            <p style={{ color: 'var(--color-text-secondary)' }}>{aboutContent.mission}</p>
            <Link to="/about" className="btn btn--primary" style={{ marginTop: '0.5rem' }}>
              Learn More About Us
            </Link>
          </div>
          <div>
            <img
              src="/images/about-team.jpg"
              alt="Melbourne Premier Cleaning team"
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
