import { Link } from 'react-router-dom';
import { businessConfig } from '../config/businessConfig';
import { heroTrustItems } from '../data/about';
import { getDefaultWhatsAppUrl } from '../utils/whatsapp';
import { Icon } from '../components/ui/Icon';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className="section-label">{businessConfig.serviceCoverageText}</p>
          <h1 id="hero-heading">{businessConfig.tagline}</h1>
          <p className={styles.subtitle}>{businessConfig.heroSubtitle}</p>
          <div className="btn-group">
            <Link to="/request-a-quote" className="btn btn--primary">
              Get a Free Quote
            </Link>
            <a
              href={getDefaultWhatsAppUrl()}
              className="btn btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              Chat on WhatsApp
            </a>
          </div>
          <p className={styles.phoneContact}>
            <Icon name="phone" size={18} />
            <a href={businessConfig.phone.tel}>
              Call {businessConfig.phone.display}
            </a>
          </p>
          <ul className={styles.trustRow} aria-label="Key service highlights">
            {heroTrustItems.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.imageWrap}>
          <img
            src="/images/hero.jpeg?v=3"
            alt="Professional cleaners working in a Melbourne home"
            className={styles.image}
            width={600}
            height={450}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
