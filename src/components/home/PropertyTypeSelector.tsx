import { propertyTypes } from '../../data/pricing';
import { CleaningIcon } from '../icons/CleaningIcon';
import styles from './PropertyTypeSelector.module.css';

interface PropertyTypeSelectorProps {
  selectedId: string;
  onSelect: (propertyTypeId: string) => void;
}

export function PropertyTypeSelector({ selectedId, onSelect }: PropertyTypeSelectorProps) {
  return (
    <section
      id="journey-choose-service"
      className={`section section--grey ${styles.section}`}
      aria-labelledby="property-type-heading"
      data-journey-step="0"
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Step 1 · Property type</span>
          <h2 id="property-type-heading">What type of property do you have?</h2>
          <p>Select the residential property type that best matches your home.</p>
        </div>
        <div className={styles.grid} role="radiogroup" aria-label="Residential property type">
          {propertyTypes.map((type) => {
            const isSelected = selectedId === type.id;
            return (
              <button
                key={type.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.card} ${isSelected ? styles.selected : ''}`}
                onClick={() => onSelect(type.id)}
              >
                <span className={styles.iconWrap} aria-hidden="true">
                  <CleaningIcon name={type.icon} size={28} />
                </span>
                <span className={styles.name}>{type.name}</span>
                <span className={styles.description}>{type.description}</span>
                {isSelected && <span className={styles.badge}>Selected</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
