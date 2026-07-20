import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to="/" className={`${styles.logo} ${className}`} aria-label="Melbourne Cleaning — Home">
      {!imgError ? (
        <img
          src="/images/icon.png"
          alt="Melbourne Cleaning"
          className={styles.logoImage}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.fallback} aria-hidden="true">
          Melbourne Cleaning
        </span>
      )}
    </Link>
  );
}
