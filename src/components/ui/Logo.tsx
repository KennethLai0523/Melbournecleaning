import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link to="/" className={`${styles.logo} ${className}`} aria-label="Melbourne Cleaning — Home">
      <img
        src="/images/icon.png"
        alt="Melbourne Cleaning"
        className={styles.logoImage}
        width={220}
        height={52}
      />
    </Link>
  );
}
