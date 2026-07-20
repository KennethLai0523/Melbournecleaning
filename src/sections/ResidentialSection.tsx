import { Link } from 'react-router-dom';
import { getDefaultWhatsAppUrl } from '../utils/whatsapp';
import { Icon } from '../components/ui/Icon';

const residentialTasks = [
  'Dusting accessible surfaces',
  'Vacuuming carpets',
  'Mopping hard floors',
  'Kitchen surface cleaning',
  'Bathroom cleaning',
  'Bedroom cleaning',
  'Living-area cleaning',
  'Rubbish removal',
  'General tidying',
  'Custom cleaning requests',
];

export function ResidentialSection() {
  return (
    <section className="section" aria-labelledby="residential-heading">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-label">Residential Cleaning</span>
            <h2 id="residential-heading">A Cleaner, More Comfortable Home</h2>
            <p>
              Our residential cleaning covers the tasks that keep your home fresh and comfortable.
              Inclusions can vary depending on the selected service — let us know your priorities when
              requesting a quote.
            </p>
            <ul className="list-check" style={{ margin: '1.25rem 0' }}>
              {residentialTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
            <div className="btn-group">
              <Link to="/residential-cleaning" className="btn btn--primary">
                View Residential Cleaning
              </Link>
              <Link to="/request-a-quote" className="btn btn--secondary">
                Request a Quote
              </Link>
              <a
                href={getDefaultWhatsAppUrl()}
                className="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
          <div>
            <img
              src="/images/residential-cleaning.jpg"
              alt="Residential house cleaning in Melbourne"
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
