import styles from './JourneyStep.module.css';

interface JourneyStepProps {
  label: string;
  index: number;
  isActive: boolean;
  isComplete: boolean;
}

export function JourneyStep({ label, index, isActive, isComplete }: JourneyStepProps) {
  return (
    <li
      className={`${styles.step} ${isActive ? styles.active : ''} ${isComplete ? styles.complete : ''}`}
      aria-current={isActive ? 'step' : undefined}
    >
      <span className={styles.marker} aria-hidden="true">
        {isComplete ? '✓' : index + 1}
      </span>
      <span className={styles.label}>{label}</span>
    </li>
  );
}
