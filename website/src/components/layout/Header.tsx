import { useState, useEffect, useRef } from 'react';
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
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
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

  useEffect(() => {
    if (!accountOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accountOpen]);

  return (
    <div className={`${styles.stickyShell} ${scrolled ? styles.stickyShellScrolled : ''}`}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <span className={styles.coverage}>{businessConfig.serviceCoverageText}</span>
          <div className={styles.topBarContacts}>
            <span className={styles.hours}>
              <Icon name="clock" size={14} />
              {businessConfig.openingHours.display}
            </span>
            <a
              href={topBarWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--whatsapp btn--sm ${styles.topCta}`}
            >
              <Icon name="whatsapp" size={14} />
              WhatsApp Us
            </a>
            <a href={businessConfig.phone.tel} className={styles.topLink}>
              <Icon name="phone" size={14} />
              {businessConfig.phone.display}
            </a>
          </div>
        </div>
      </div>

      <header className={styles.header}>
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
              <div className={styles.navActions}>
                <a href={quoteCtaPath} className={`btn btn--primary ${styles.navCta}`}>
                  {quoteCtaLabel}
                </a>
                <div className={styles.accountWrap} ref={accountRef}>
                  <button
                    type="button"
                    className={styles.avatarButton}
                    aria-label="Open account menu"
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    onClick={() => setAccountOpen((open) => !open)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className={styles.avatarIcon}
                    >
                      <path
                        d="M12 12a4.25 4.25 0 1 0-4.25-4.25A4.25 4.25 0 0 0 12 12Zm0 2c-4.02 0-7 2.13-7 5v1h14v-1c0-2.87-2.98-5-7-5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  {accountOpen && (
                    <div className={styles.accountMenu} role="menu" aria-label="Account">
                      <p className={styles.accountTitle}>Account</p>
                      <Link to="/login/customer" role="menuitem" onClick={() => setAccountOpen(false)}>
                        Customer login
                      </Link>
                      <Link to="/login/cleaner" role="menuitem" onClick={() => setAccountOpen(false)}>
                        Cleaner login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
