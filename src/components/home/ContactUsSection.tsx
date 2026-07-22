import { useMemo } from 'react';
import { businessConfig } from '../../config/businessConfig';
import type { QuoteFormState } from '../../types/quote';
import { calculateQuote } from '../../utils/calculateQuote';
import { buildQuoteWhatsAppUrl, canSendWhatsAppQuote } from '../../utils/buildWhatsAppQuote';
import { Icon } from '../ui/Icon';
import styles from './ContactUsSection.module.css';

interface ContactUsSectionProps {
  state: QuoteFormState;
}

export function ContactUsSection({ state }: ContactUsSectionProps) {
  const breakdown = useMemo(() => calculateQuote(state), [state]);
  const canSend = canSendWhatsAppQuote(breakdown);
  const whatsAppUrl = buildQuoteWhatsAppUrl(state, breakdown);

  return (
    <section
      id="contact-us"
      className={`section ${styles.section}`}
      aria-labelledby="contact-us-heading"
      data-journey-step="3"
    >
      <div className={styles.panel}>
        <span className={styles.label}>Step 4 · Contact us</span>
        <h2 id="contact-us-heading">Contact us</h2>
        <p>
          Send your summary and preferred schedule to Melbourne Cleaning Group. We will confirm
          your booking details as soon as we can.
        </p>

        <div className={styles.actions}>
          {canSend ? (
            <a
              href={whatsAppUrl}
              className={`btn btn--whatsapp ${styles.primaryAction}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              Send Summary on WhatsApp
            </a>
          ) : (
            <button
              type="button"
              className={`btn btn--whatsapp ${styles.primaryAction} ${styles.disabled}`}
              disabled
              title="Add cleaning items to your summary first"
            >
              <Icon name="whatsapp" size={18} />
              Send Summary on WhatsApp
            </button>
          )}

          <a href={businessConfig.phone.tel} className="btn btn--secondary">
            <Icon name="phone" size={18} />
            Call {businessConfig.phone.display}
          </a>

          <a href={businessConfig.email.mailto} className="btn btn--secondary">
            <Icon name="mail" size={18} />
            Email us
          </a>
        </div>

        {!canSend ? (
          <p className={styles.hint}>
            Add at least one cleaning item in step 2 before sending your summary.
          </p>
        ) : !state.quote.preferredDate || !state.quote.preferredTime ? (
          <p className={styles.hint}>
            Tip: pick a preferred date and start time in step 3 so we can check availability faster.
          </p>
        ) : null}
      </div>
    </section>
  );
}
