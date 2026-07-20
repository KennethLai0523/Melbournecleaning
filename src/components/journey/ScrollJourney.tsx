import { useEffect, useState } from 'react';
import styles from './ScrollJourney.module.css';
import { JourneyStep } from './JourneyStep';

const JOURNEY_STEPS = [
  { id: 0, label: 'Choose property type' },
  { id: 1, label: 'Build your estimate' },
  { id: 2, label: 'Confirm your requirements' },
  { id: 3, label: 'Schedule the clean' },
  { id: 4, label: 'Service completed' },
];

interface ScrollJourneyProps {
  children: React.ReactNode;
}

export function ScrollJourney({ children }: ScrollJourneyProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-journey-step]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number(e.target.getAttribute('data-journey-step') ?? 0));

        if (visible.length > 0) {
          setActiveStep(Math.max(...visible));
        }
      },
      { threshold: 0.25, rootMargin: '-10% 0px -35% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const progressPercent = Math.max(15, (activeStep / (JOURNEY_STEPS.length - 1)) * 100);

  return (
    <div
      className={styles.wrapper}
      style={{ '--journey-progress': `${progressPercent}%` } as React.CSSProperties}
    >
      <nav className={styles.timeline} aria-label="Quote journey progress">
        <div className={styles.lineTrack} aria-hidden="true">
          <div className={styles.lineFill} style={{ height: `${progressPercent}%` }} />
        </div>
        <ol className={styles.steps}>
          {JOURNEY_STEPS.map((step) => (
            <JourneyStep
              key={step.id}
              label={step.label}
              index={step.id}
              isActive={activeStep === step.id}
              isComplete={activeStep > step.id}
            />
          ))}
        </ol>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
