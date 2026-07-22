import type { ReactNode } from 'react';
import { Icon } from '../ui/Icon';
import { CleaningIcon, type CleaningIconName } from '../icons/CleaningIcon';
import { getDefaultWhatsAppUrl } from '../../utils/whatsapp';
import hero1 from '../../assets/hero1.jpeg';
import hero2 from '../../assets/hero2.jpeg';
import styles from './Hero.module.css';

const trustItems: { label: ReactNode; icon: CleaningIconName; key: string }[] = [
  { key: 'residential', label: 'Residential cleaning across Melbourne', icon: 'home' },
  { key: 'pricing', label: 'Item-by-item pricing', icon: 'pricing' },
  {
    key: 'booking-fee',
    label: (
      <>
        $0 booking fee <span className={styles.feeNote}>*Cleaning from as low as $80</span>
      </>
    ),
    icon: 'booking-fee',
  },
  { key: 'schedule', label: 'Flexible scheduling', icon: 'calendar' },
  { key: 'coverage', label: 'Melbourne-wide service coverage', icon: 'coverage' },
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

          <ul className={styles.trustStrip} aria-label="Key benefits">
            {trustItems.map((item) => (
              <li key={item.key}>
                <CleaningIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctaRow}>
            <button type="button" className={`btn btn--primary ${styles.ctaBtn}`} onClick={onBuildQuote}>
              Build Your Quote
            </button>
            <a
              href={getDefaultWhatsAppUrl()}
              className={`btn btn--whatsapp ${styles.ctaBtn}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className={styles.imagePair}>
          <figure className={styles.imageWrap}>
            <img
              src={hero1}
              alt="Professional cleaner working in a Melbourne kitchen"
              className={styles.image}
              width={280}
              height={360}
              fetchPriority="high"
            />
          </figure>
          <figure className={styles.imageWrap}>
            <img
              src={hero2}
              alt="Residential cleaning service in Melbourne"
              className={styles.image}
              width={280}
              height={360}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
