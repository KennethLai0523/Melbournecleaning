import { useMemo } from 'react';
import type { QuoteFormState } from '../../types/quote';
import { calculateQuote, resetQuoteState } from '../../utils/calculateQuote';
import { formatCurrency } from '../../utils/formatCurrency';
import { buildQuoteWhatsAppUrl, canSendWhatsAppQuote } from '../../utils/buildWhatsAppQuote';
import { CleaningDetails } from './CleaningDetails';
import { PropertyDetails } from './PropertyDetails';
import { QuoteSummary } from './QuoteSummary';
import styles from './QuoteBuilder.module.css';

interface QuoteBuilderProps {
  state: QuoteFormState;
  onChange: (state: QuoteFormState) => void;
}

export function QuoteBuilder({ state, onChange }: QuoteBuilderProps) {
  const breakdown = useMemo(() => calculateQuote(state), [state]);

  const updateProperty = (property: QuoteFormState['property']) => {
    onChange({ ...state, property });
  };

  const updateQuote = (partial: Partial<QuoteFormState['quote']>) => {
    onChange({ ...state, quote: { ...state.quote, ...partial } });
  };

  const handleReset = () => {
    onChange(resetQuoteState(state));
  };

  const setItemQuantity = (itemId: string, qty: number) => {
    const items = { ...state.quote.items };
    if (qty <= 0) {
      delete items[itemId];
    } else {
      items[itemId] = qty;
    }
    updateQuote({ items });
  };

  const scrollToSummary = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('quote-summary')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const whatsAppUrl = buildQuoteWhatsAppUrl(state, breakdown);
  const canSend = canSendWhatsAppQuote(breakdown);

  return (
    <section
      id="quote-builder"
      className={`section ${styles.section}`}
      aria-labelledby="quote-builder-heading"
      data-journey-step="1"
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Step 2 · Build estimate</span>
          <h2 id="quote-builder-heading">Build your estimate</h2>
          <p>
            Record your property details, then select each cleaning task and quantity to build
            your item-by-item estimate.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.tablePanel}>
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Property information</h3>
              <PropertyDetails details={state.property} onChange={updateProperty} />
            </div>

            <div className={styles.sectionBlock}>
              <CleaningDetails items={state.quote.items} onItemChange={setItemQuantity} />

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="qb-notes" className="form-label">Additional notes (optional)</label>
                <textarea
                  id="qb-notes"
                  className="form-textarea"
                  rows={3}
                  placeholder="Access instructions, specific areas to focus on, etc."
                  value={state.quote.notes}
                  onChange={(e) => updateQuote({ notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          <QuoteSummary state={state} breakdown={breakdown} onReset={handleReset} />
        </div>
      </div>

      <div className={styles.mobileSticky}>
        <button type="button" className={styles.mobileTotal} onClick={scrollToSummary}>
          <span>Estimated total</span>
          <strong>{breakdown.isEmpty ? '—' : formatCurrency(breakdown.total)}</strong>
        </button>
        {canSend ? (
          <a
            href={whatsAppUrl}
            className={`btn btn--whatsapp ${styles.mobileWa}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        ) : (
          <span className={`btn btn--whatsapp ${styles.mobileWa} ${styles.mobileWaDisabled}`}>
            WhatsApp
          </span>
        )}
      </div>
    </section>
  );
}
