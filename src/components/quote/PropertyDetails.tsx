import type { PropertyDetails as PropertyDetailsType } from '../../types/quote';
import { CleaningIcon, type CleaningIconName } from '../icons/CleaningIcon';
import { FrequencyToggle } from './FrequencyToggle';
import { QuantitySelector } from './QuantitySelector';
import styles from './PropertyDetails.module.css';

interface PropertyDetailsProps {
  details: PropertyDetailsType;
  onChange: (details: PropertyDetailsType) => void;
}

interface FieldConfig {
  key: keyof PropertyDetailsType;
  label: string;
  icon: CleaningIconName;
  min?: number;
  max?: number;
}

const quantityFields: FieldConfig[] = [
  { key: 'bedrooms', label: 'Bedrooms', icon: 'bedroom', max: 20 },
  { key: 'bathrooms', label: 'Bathrooms', icon: 'bathroom', max: 20 },
  { key: 'toilets', label: 'Toilets', icon: 'toilet', max: 20 },
  { key: 'balconies', label: 'Balconies', icon: 'balcony', max: 20 },
  { key: 'garageSpaces', label: 'Garage spaces', icon: 'garage', max: 10 },
];

export function PropertyDetails({ details, onChange }: PropertyDetailsProps) {
  const update = (partial: Partial<PropertyDetailsType>) => {
    onChange({ ...details, ...partial });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Property details</h3>
        <FrequencyToggle
          value={details.frequency}
          onChange={(frequency) => update({ frequency })}
        />
      </div>

      <p className={styles.helper}>
        These details help us understand the property and do not change the instant estimate.
      </p>

      <div className={styles.grid}>
        {quantityFields.map((field) => (
          <div key={field.key} className="form-group">
            <label htmlFor={`pd-${field.key}`} className={styles.fieldLabel}>
              <CleaningIcon name={field.icon} size={18} />
              {field.label}
            </label>
            <QuantitySelector
              id={`pd-${field.key}`}
              value={details[field.key] as number}
              min={0}
              max={field.max ?? 20}
              onChange={(val) => update({ [field.key]: val } as Partial<PropertyDetailsType>)}
              label={field.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
