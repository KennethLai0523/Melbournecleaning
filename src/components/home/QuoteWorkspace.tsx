import { useMemo } from 'react';
import type { QuoteFormState } from '../../types/quote';
import { calculateQuote } from '../../utils/calculateQuote';
import { formatCurrency } from '../../utils/formatCurrency';
import { buildQuoteWhatsAppUrl, canSendWhatsAppQuote } from '../../utils/buildWhatsAppQuote';
import { QuoteSummary } from '../quote/QuoteSummary';
import { Icon } from '../ui/Icon';
import styles from './QuoteWorkspace.module.css';

interface QuoteWorkspaceProps {
  state: QuoteFormState;
  onChange: (state: QuoteFormState) => void;
  children: React.ReactNode;
}

export function QuoteWorkspace({ state, children }: QuoteWorkspaceProps) {
  const breakdown = useMemo(() => calculateQuote(state), [state]);
  const canSend = canSendWhatsAppQuote(breakdown);
  const whatsAppUrl = buildQuoteWhatsAppUrl(state, breakdown);

  const scrollToSummary = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('quote-summary')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className={styles.workspace}>
      <div className={styles.layout}>
        <div className={styles.main}>{children}</div>
        <div className={styles.sidebar}>
          <QuoteSummary state={state} breakdown={breakdown} />
        </div>
      </div>

      <div className={styles.mobileSticky}>
        <button type="button" className={styles.mobileTotal} onClick={scrollToSummary}>
          <span>Total</span>
          <strong>{breakdown.isEmpty ? '—' : formatCurrency(breakdown.total)}</strong>
        </button>
        {canSend ? (
          <a
            href={whatsAppUrl}
            className={`btn btn--whatsapp ${styles.mobileWa}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} />
            WhatsApp
          </a>
        ) : (
          <span className={`btn btn--whatsapp ${styles.mobileWa} ${styles.mobileWaDisabled}`}>
            WhatsApp
          </span>
        )}
      </div>
    </div>
  );
}
