import { Icon } from '../ui/Icon';
import { CleaningIcon, type CleaningIconName } from '../icons/CleaningIcon';
import { getDefaultWhatsAppUrl } from '../../utils/whatsapp';
import styles from './Hero.module.css';

const trustItems: { label: string; icon: CleaningIconName }[] = [
  { label: 'Residential cleaning across Melbourne', icon: 'home' },
  { label: 'Item-by-item estimated pricing', icon: 'pricing' },
  { label: '$0 booking fee', icon: 'booking-fee' },
  { label: 'Flexible scheduling', icon: 'calendar' },
  { label: 'Melbourne-wide service coverage', icon: 'coverage' },
];

interface HeroProps {
  onBuildQuote: () => void;
}

export function Hero({ onBuildQuote }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 id="hero-heading">Professional Cleaning, Clearly Quoted</h1>
          <p className={styles.subtitle}>
            Choose exactly what you need cleaned, see an item-by-item estimate and send your
            request directly to our Melbourne residential cleaning team.
          </p>
          <div className="btn-group">
            <button type="button" className="btn btn--primary" onClick={onBuildQuote}>
              Build Your Quote
            </button>
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
          <ul className={styles.trustStrip} aria-label="Key benefits">
            {trustItems.map((item) => (
              <li key={item.label}>
                <CleaningIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.imageWrap}>
          <img
            src="/images/hero.jpeg?v=3"
            alt="Professional residential cleaning in Melbourne"
            className={styles.image}
            width={200}
            height={180}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
