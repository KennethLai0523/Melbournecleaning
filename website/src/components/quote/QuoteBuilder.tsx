import type { QuoteFormState } from '../../types/quote';
import { CleaningDetails } from '../quote/CleaningDetails';
import { PropertyDetails } from '../quote/PropertyDetails';
import styles from '../quote/QuoteBuilder.module.css';

interface QuoteBuilderProps {
  state: QuoteFormState;
  onChange: (state: QuoteFormState) => void;
}

export function QuoteBuilder({ state, onChange }: QuoteBuilderProps) {
  const updateProperty = (property: QuoteFormState['property']) => {
    onChange({ ...state, property });
  };

  const updateQuote = (partial: Partial<QuoteFormState['quote']>) => {
    onChange({ ...state, quote: { ...state.quote, ...partial } });
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

  return (
    <section
      id="quote-builder"
      className={`section ${styles.section}`}
      aria-labelledby="quote-builder-heading"
      data-journey-step="1"
    >
      <div className={styles.header}>
        <span className="section-label">Step 2 · Build summary</span>
        <h2 id="quote-builder-heading">Build your summary</h2>
        <p>
          Record your property details for our cleaning record, then choose which cleaning tasks
          to include. Your total is based only on the cleaning items you select.
        </p>
      </div>

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
    </section>
  );
}
