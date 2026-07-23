import { businessConfig } from '../../config/businessConfig';
import { quoteCtaPath } from '../../config/navigation';
import { getDefaultWhatsAppUrl } from '../../utils/whatsapp';
import { Icon } from '../ui/Icon';
import styles from './MobileContactBar.module.css';

export function MobileContactBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="Quick contact">
      <a href={businessConfig.phone.tel} className={styles.item}>
        <Icon name="phone" size={20} />
        <span>Call</span>
      </a>
      <a
        href={getDefaultWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.item} ${styles.whatsapp}`}
      >
        <Icon name="whatsapp" size={20} />
        <span>WhatsApp</span>
      </a>
      <a href={quoteCtaPath} className={`${styles.item} ${styles.quote}`}>
        Quote
      </a>
    </div>
  );
}
