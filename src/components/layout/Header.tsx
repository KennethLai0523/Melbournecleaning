import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { businessConfig } from '../../config/businessConfig';
import {
  mainNavigation,
  quoteCtaLabel,
  quoteCtaPath,
  topBarWhatsAppUrl,
} from '../../config/navigation';
import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icon';
import styles from './Header.module.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <span className={styles.coverage}>{businessConfig.serviceCoverageText}</span>
          <div className={styles.topBarContacts}>
            <a href={businessConfig.phone.tel} className={styles.topLink}>
              <Icon name="phone" size={14} />
              {businessConfig.phone.display}
            </a>
            <a
              href={businessConfig.whatsapp.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.topLink}
            >
              <Icon name="whatsapp" size={14} />
              Chat on WhatsApp
            </a>
            <span className={styles.hours}>
              <Icon name="clock" size={14} />
              {businessConfig.openingHours.display}
            </span>
            <a
              href={topBarWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--white btn--sm ${styles.topCta}`}
            >
              <Icon name="whatsapp" size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
        <div className={`container ${styles.navInner}`}>
          <Logo />

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>

          {menuOpen && (
            <button
              type="button"
              className={styles.menuBackdrop}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div id="main-menu" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
            <ul className={styles.navList}>
              {mainNavigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? styles.active : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={quoteCtaPath} className={`btn btn--primary ${styles.navCta}`}>
              {quoteCtaLabel}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
