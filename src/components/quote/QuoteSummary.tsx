import { businessConfig } from '../../config/businessConfig';
import { pricingDisclaimer, getPropertyTypeById } from '../../data/pricing';
import type { QuoteBreakdown, QuoteFormState } from '../../types/quote';
import {
  formatLineItemSummary,
  getFrequencyLabel,
  getLineItemLabel,
} from '../../utils/calculateQuote';
import { buildQuoteWhatsAppUrl, canSendWhatsAppQuote } from '../../utils/buildWhatsAppQuote';
import { formatCurrency } from '../../utils/formatCurrency';
import { Icon } from '../ui/Icon';
import styles from './QuoteSummary.module.css';

interface QuoteSummaryProps {
  state: QuoteFormState;
  breakdown: QuoteBreakdown;
  onReset: () => void;
  summaryId?: string;
}

export function QuoteSummary({ state, breakdown, onReset, summaryId = 'quote-summary' }: QuoteSummaryProps) {
  const propertyType = getPropertyTypeById(state.property.propertyType);
  const canSend = canSendWhatsAppQuote(breakdown);
  const whatsAppUrl = buildQuoteWhatsAppUrl(state, breakdown);

  return (
    <aside className={styles.summary} id={summaryId} aria-labelledby={`${summaryId}-heading`}>
      <h3 id={`${summaryId}-heading`} className={styles.heading}>
        Estimate Summary
      </h3>

      <div className={styles.recordSection}>
        <h4 className={styles.subheading}>Property information</h4>
        <p className={styles.recordLabel}>For our cleaning record</p>
        <dl className={styles.recordList}>
          <div className={styles.recordRow}>
            <dt>Property type</dt>
            <dd>{propertyType?.name ?? '—'}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Bedrooms</dt>
            <dd>{state.property.bedrooms}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Bathrooms</dt>
            <dd>{state.property.bathrooms}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Toilets</dt>
            <dd>{state.property.toilets}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Living rooms</dt>
            <dd>{state.property.livingRooms}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Kitchens</dt>
            <dd>{state.property.kitchens}</dd>
          </div>
          <div className={styles.recordRow}>
            <dt>Frequency</dt>
            <dd>{getFrequencyLabel(state.property.frequency)}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.estimateSection}>
        <h4 className={styles.subheading}>Cleaning estimate</h4>
        {breakdown.isEmpty ? (
          <p className={styles.emptyState}>Add cleaning items to build your estimate.</p>
        ) : (
          <dl className={styles.lines}>
            {breakdown.items.map((item) => (
              <div key={item.id} className={styles.linePair}>
                <dt>{getLineItemLabel(item)}</dt>
                <dd>{formatLineItemSummary(item, formatCurrency)}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className={styles.totalRow}>
          <span>Estimated total</span>
          <strong className={styles.total}>
            {breakdown.isEmpty ? '—' : formatCurrency(breakdown.total)}
          </strong>
        </div>
      </div>

      <p className={styles.disclaimer}>{pricingDisclaimer}</p>

      <div className={styles.actions}>
        {canSend ? (
          <a
            href={whatsAppUrl}
            className="btn btn--whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%' }}
          >
            <Icon name="whatsapp" size={18} />
            Send Estimate on WhatsApp
          </a>
        ) : (
          <button
            type="button"
            className={`btn btn--whatsapp ${styles.waDisabled}`}
            disabled
            title="Add at least one cleaning item to send your estimate"
            style={{ width: '100%' }}
          >
            <Icon name="whatsapp" size={18} />
            Send Estimate on WhatsApp
          </button>
        )}
        <a href={businessConfig.phone.tel} className="btn btn--secondary" style={{ width: '100%' }}>
          <Icon name="phone" size={18} />
          Call {businessConfig.phone.display}
        </a>
        <button type="button" className="btn btn--sm" onClick={onReset} style={{ width: '100%' }}>
          Reset Estimate
        </button>
      </div>
    </aside>
  );
}
