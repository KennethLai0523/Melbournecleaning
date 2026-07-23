import { Link } from 'react-router-dom';
import { businessConfig } from '../../config/businessConfig';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`${styles.logo} ${className}`}
      aria-label={`${businessConfig.name} — Home`}
    >
      <img
        src="/images/icon.png?v=3"
        alt={businessConfig.name}
        className={styles.logoImage}
        width={220}
        height={52}
      />
    </Link>
  );
}
