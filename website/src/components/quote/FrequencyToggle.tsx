import type { ServiceFrequency } from '../../types/quote';
import { CleaningIcon } from '../icons/CleaningIcon';
import styles from './FrequencyToggle.module.css';

const FREQUENCIES: { value: ServiceFrequency; label: string }[] = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
];

interface FrequencyToggleProps {
  value: ServiceFrequency;
  onChange: (frequency: ServiceFrequency) => void;
}

export function FrequencyToggle({ value, onChange }: FrequencyToggleProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>
        <CleaningIcon name="calendar" size={16} />
        Frequency
      </span>
      <div className={styles.toggle} role="radiogroup" aria-label="Cleaning frequency">
        {FREQUENCIES.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            className={`${styles.option} ${value === opt.value ? styles.active : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
