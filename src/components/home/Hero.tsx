import { Icon } from '../ui/Icon';
import styles from './Hero.module.css';

const trustItems = [
  'Residential cleaning across Melbourne',
  'Item-by-item estimated pricing',
  'Flexible scheduling',
  'Melbourne-wide service coverage',
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
              href="https://wa.me/61480636863?text=Hi%20Melbourne%20Cleaning%2C%20I%20would%20like%20to%20request%20a%20cleaning%20quote."
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
              <li key={item}>
                <Icon name="check" size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.imageWrap}>
          <img
            src="/images/hero-cleaning.jpg"
            alt="Professional residential cleaning in Melbourne"
            className={styles.image}
            width={580}
            height={420}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
