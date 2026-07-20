import { Link } from 'react-router-dom';
import { businessConfig } from '../config/businessConfig';
import { getDefaultWhatsAppUrl } from '../utils/whatsapp';
import { Icon } from '../components/ui/Icon';

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: 'red' | 'white';
}

export function CTASection({
  title = 'Ready for a Cleaner Space?',
  description = 'Request a free quote today. Contact us by phone, WhatsApp or our online form.',
  variant = 'red',
}: CTASectionProps) {
  const sectionClass = variant === 'red' ? 'section section--red' : 'section';

  return (
    <section className={sectionClass} aria-labelledby="cta-heading">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 id="cta-heading">{title}</h2>
        <p style={{ maxWidth: '560px', margin: '0.75rem auto 1.5rem' }}>{description}</p>
        <div className="btn-group" style={{ justifyContent: 'center' }}>
          <Link to="/request-a-quote" className={variant === 'red' ? 'btn btn--white' : 'btn btn--primary'}>
            Request a Free Quote
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
          <a
            href={businessConfig.phone.tel}
            className={variant === 'red' ? 'btn btn--outline-white' : 'btn btn--secondary'}
          >
            <Icon name="phone" size={18} />
            Call {businessConfig.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
