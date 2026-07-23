import { SEO } from '../components/layout/SEO';
import { PageBanner } from '../components/ui/PageBanner';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CTASection } from '../sections/CTASection';
import { getPublicServices } from '../data/services';
import { seoConfig } from '../config/seoConfig';
import styles from './ServicesPage.module.css';
import comparison1 from '../../images/comparison1.jpeg';
import comparison2 from '../../images/comparison2.jpeg';
import comparison3 from '../../images/comparison3.jpeg';
import comparison4 from '../../images/comparison4.jpeg';

const cleaningEquipment = [
  'Mops and buckets',
  'Microfibre cloths and wipes',
  'Vacuum cleaners',
  'Brooms and dustpans',
  'Scrubbing brushes',
  'Sponges and scourers',
  'Glass and surface cleaners',
  'Disinfectants and detergents',
  'Gloves and protective gear',
  'Extension dusters',
];

const cleaningComparisons = [
  { image: comparison1, title: 'Kitchen cooktop' },
  { image: comparison2, title: 'Bathroom vanity' },
  { image: comparison3, title: 'Shower' },
  { image: comparison4, title: 'Toilet' },
];

export default function ServicesPage() {
  const publicServices = getPublicServices();

  return (
    <>
      <SEO
        seo={seoConfig.services}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <PageBanner
        title="Our Cleaning Services"
        description="Explore our residential cleaning services across Melbourne — from regular home cleaning to deep cleans, end of lease and specialist add-ons."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <section className={`section ${styles.equipmentSection}`} aria-labelledby="equipment-heading">
        <div className="container">
          <div className={styles.equipmentHeader}>
            <h2 id="equipment-heading">Cleaning equipment we have</h2>
            <p>We bring the tools needed for a thorough residential clean.</p>
          </div>
          <ul className={styles.equipmentList}>
            {cleaningEquipment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {publicServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section
        className={`section ${styles.comparisonSection}`}
        aria-labelledby="comparison-heading"
      >
        <div className="container">
          <div className={styles.comparisonHeader}>
            <p className={styles.comparisonEyebrow}>Real cleaning results</p>
            <h2 id="comparison-heading">Cleaning Comparison</h2>
            <p>See the difference a detailed clean can make across kitchens and bathrooms.</p>
          </div>
          <div className={styles.comparisonGrid}>
            {cleaningComparisons.map((comparison) => (
              <figure key={comparison.title} className={styles.comparisonCard}>
                <div className={styles.comparisonImageWrap}>
                  <img
                    src={comparison.image}
                    alt={`Before and after cleaning comparison for ${comparison.title.toLowerCase()}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.comparisonBadge}>Before &amp; after</span>
                </div>
                <figcaption>{comparison.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
