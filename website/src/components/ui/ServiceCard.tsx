import { Link } from 'react-router-dom';
import type { Service } from '../../data/services';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <Link to={`/${service.slug}`} className={styles.imageLink}>
        <img
          src={service.image}
          alt={service.title}
          className={styles.image}
          loading="lazy"
          width={400}
          height={260}
        />
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/${service.slug}`}>{service.title}</Link>
        </h3>
        <p className={styles.description}>
          {compact ? service.shortDescription : service.shortDescription}
        </p>
        <Link to={`/${service.slug}`} className={styles.link}>
          Learn more
        </Link>
      </div>
    </article>
  );
}
