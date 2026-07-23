import { Link } from 'react-router-dom';
import { businessConfig } from '../../config/businessConfig';
import {
  footerResidentialLinks,
  footerPopularServices,
  footerLegalLinks,
  quoteCtaLabel,
  quoteCtaPath,
} from '../../config/navigation';
import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icon';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.intro}>
              {businessConfig.name} provides professional residential cleaning services across
              Melbourne with dependable communication and flexible scheduling.
            </p>
            <div className={styles.contactItems}>
              <a href={businessConfig.phone.tel} className={styles.contactLink}>
                <Icon name="phone" size={16} />
                {businessConfig.phone.display}
              </a>
              <a
                href={businessConfig.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp
              </a>
              <a href={businessConfig.email.mailto} className={styles.contactLink}>
                <Icon name="mail" size={16} />
                {businessConfig.email.address}
              </a>
              <span className={styles.contactLink}>
                <Icon name="mapPin" size={16} />
                {businessConfig.address.display}
              </span>
            </div>
            <p className={styles.hours}>
              <Icon name="clock" size={16} />
              {businessConfig.openingHours.weekdays}
              <br />
              {businessConfig.openingHours.saturday}
              <br />
              {businessConfig.openingHours.sunday}
            </p>
          </div>

          <div>
            <h3 className={styles.heading}>Residential Cleaning</h3>
            <ul className={styles.links}>
              {footerResidentialLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Popular Services</h3>
            <ul className={styles.links}>
              {footerPopularServices.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className={`${styles.heading} ${styles.headingSpaced}`}>Company</h3>
            <ul className={styles.links}>
              <li><Link to="/service-areas">Area We Clean</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href={quoteCtaPath}>{quoteCtaLabel}</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            {footerLegalLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </div>
          <p className={styles.copyright}>
            &copy; {year} {businessConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
