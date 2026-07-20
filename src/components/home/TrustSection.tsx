import { Icon } from '../ui/Icon';
import styles from './TrustSection.module.css';

const trustItems = [
  {
    icon: 'quote' as const,
    title: 'Clear estimate before enquiry',
    description: 'See an upfront item-by-item estimate before you contact us — no surprises when you enquire.',
  },
  {
    icon: 'flexible' as const,
    title: 'Flexible residential cleaning',
    description: 'One-time, recurring and custom cleaning plans tailored to your home.',
  },
  {
    icon: 'home' as const,
    title: 'Melbourne-wide residential service',
    description: 'From apartments and units to townhouses and family homes across Melbourne.',
  },
  {
    icon: 'communication' as const,
    title: 'Direct Melbourne support',
    description: 'Speak with our team by phone or WhatsApp for quotes and scheduling.',
  },
];

export function TrustSection() {
  return (
    <section
      className={`section section--grey ${styles.section}`}
      aria-labelledby="trust-heading"
      data-journey-step="2"
    >
      <div className="container">
        <div className={styles.header}>
          <h2 id="trust-heading">Why customers can trust us</h2>
        </div>
        <div className={styles.grid}>
          {trustItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <Icon name={item.icon} size={24} className={styles.icon} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
