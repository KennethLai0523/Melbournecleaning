import { Link } from 'react-router-dom';
import { getPublicServices } from '../data/services';
import { ServiceCard } from '../components/ui/ServiceCard';

export function ServicesOverview() {
  const featured = getPublicServices().slice(0, 6);

  return (
    <section className="section section--grey" aria-labelledby="services-overview-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Services</span>
          <h2 id="services-overview-heading">Professional Residential Cleaning</h2>
          <p>
            From regular home cleaning to deep cleans, end of lease and specialist add-ons, we offer
            residential cleaning solutions tailored to your home.
          </p>
        </div>
        <div className="grid-3">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/services" className="btn btn--primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
