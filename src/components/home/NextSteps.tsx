import styles from './NextSteps.module.css';

const steps = [
  {
    number: 1,
    title: 'Send your estimate',
    description:
      'Share your built estimate via WhatsApp with our team. Include any notes about your property.',
  },
  {
    number: 2,
    title: 'We confirm the details',
    description:
      'We review your requirements and confirm what is included, timing and any adjustments to the estimate.',
  },
  {
    number: 3,
    title: 'Choose your appointment',
    description:
      'Pick a date and time that suits you. We offer flexible scheduling where availability allows.',
  },
  {
    number: 4,
    title: 'Cleaning service completed',
    description:
      'Our team completes the agreed cleaning scope, leaving your property fresh and clean.',
  },
];

export function NextSteps() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="next-steps-heading"
      data-journey-step="3"
    >
      <div className="container">
        <div className={styles.header}>
          <h2 id="next-steps-heading">What happens next?</h2>
          <p>A straightforward process from estimate to completed clean.</p>
        </div>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {step.number}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
