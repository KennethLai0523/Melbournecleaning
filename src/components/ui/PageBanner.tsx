import { Link } from 'react-router-dom';
import styles from './PageBanner.module.css';

interface Breadcrumb {
  name: string;
  path: string;
}

interface PageBannerProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageBanner({ title, description, breadcrumbs }: PageBannerProps) {
  return (
    <section className={styles.banner} aria-labelledby="page-banner-title">
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              {breadcrumbs.map((item, index) => (
                <li key={item.path} className={styles.breadcrumbItem}>
                  {index > 0 && <span className={styles.separator} aria-hidden="true">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <Link to={item.path}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 id="page-banner-title">{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </section>
  );
}
