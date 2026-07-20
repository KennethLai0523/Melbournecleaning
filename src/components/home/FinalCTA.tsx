import { businessConfig } from '../../config/businessConfig';
import { getDefaultWhatsAppUrl } from '../../utils/whatsapp';
import { Icon } from '../ui/Icon';
import styles from './FinalCTA.module.css';

interface FinalCTAProps {
  onBuildQuote: () => void;
}

export function FinalCTA({ onBuildQuote }: FinalCTAProps) {
  return (
    <section
      className={`section section--red ${styles.section}`}
      aria-labelledby="final-cta-heading"
      data-journey-step="4"
    >
      <div className={`container ${styles.inner}`}>
        <h2 id="final-cta-heading">Ready for a cleaner space?</h2>
        <p>Build your estimate and send it to our Melbourne team in minutes.</p>
        <div className="btn-group" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn btn--white" onClick={onBuildQuote}>
            Build Your Quote
          </button>
          <a
            href={getDefaultWhatsAppUrl()}
            className="btn btn--outline-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} />
            WhatsApp Us
          </a>
          <a href={businessConfig.phone.tel} className="btn btn--outline-white">
            <Icon name="phone" size={18} />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
